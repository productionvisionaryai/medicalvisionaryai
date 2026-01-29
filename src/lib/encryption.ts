/**
 * Client-side encryption utilities for sensitive medical data
 * Uses Web Crypto API for browser-native encryption
 */
import { EncryptedData } from '../types/encrypted-data';

export class MedicalDataEncryptor {
    private readonly algorithm = 'AES-GCM';
    private readonly keyLength = 256;
    private readonly version = '1.0';

    /**
     * Generate a new random encryption key
     */
    async generateKey(): Promise<CryptoKey> {
        return crypto.subtle.generateKey(
            {
                name: this.algorithm,
                length: this.keyLength,
            },
            true, // extractable
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Derive a key from a passphrase (for user-specific encryption)
     */
    async deriveKeyFromPassphrase(
        passphrase: string,
        salt: Uint8Array
    ): Promise<CryptoKey> {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(passphrase),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt.buffer as ArrayBuffer,
                iterations: 100000,
                hash: 'SHA-256',
            },
            keyMaterial,
            {
                name: this.algorithm,
                length: this.keyLength,
            },
            false, // not extractable
            ['encrypt', 'decrypt']
        );
    }

    /**
     * Encrypt sensitive medical data
     */
    async encrypt(
        data: unknown,
        key: CryptoKey
    ): Promise<EncryptedData> {
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encoder = new TextEncoder();
        const dataString = JSON.stringify(data);
        const dataBuffer = encoder.encode(dataString);

        const ciphertext = await crypto.subtle.encrypt(
            {
                name: this.algorithm,
                iv: iv.buffer as unknown as ArrayBuffer,
            },
            key,
            dataBuffer.buffer as unknown as ArrayBuffer
        );

        // Generate fingerprint for integrity
        const fingerprint = await this.generateDataFingerprint(data);

        return {
            iv: this.arrayBufferToBase64(iv.buffer as ArrayBuffer),
            ciphertext: this.arrayBufferToBase64(ciphertext as ArrayBuffer),
            timestamp: Date.now(),
            version: this.version,
            fingerprint,
        };
    }

    /**
     * Decrypt sensitive medical data
     */
    async decrypt(
        encryptedData: EncryptedData,
        key: CryptoKey
    ): Promise<unknown> {
        const iv = this.base64ToArrayBuffer(encryptedData.iv);
        const ciphertext = this.base64ToArrayBuffer(encryptedData.ciphertext);

        try {
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: this.algorithm,
                    iv: iv as BufferSource,
                },
                key,
                ciphertext as BufferSource
            );

            const decoder = new TextDecoder();
            const decryptedString = decoder.decode(decryptedBuffer);
            const data = JSON.parse(decryptedString);

            // Verify integrity if fingerprint exists
            if (encryptedData.fingerprint) {
                const isValid = await this.verifyDataIntegrity(data, encryptedData.fingerprint);
                if (!isValid) {
                    throw new Error('Data integrity check failed: Fingerprint mismatch');
                }
            }

            return data;
        } catch (error) {
            console.error('Decryption failed:', error);
            throw new Error('Failed to decrypt data. Key might be invalid or data corrupted.');
        }
    }

    /**
     * Generate a fingerprint for data integrity verification
     */
    async generateDataFingerprint(data: unknown): Promise<string> {
        const encoder = new TextEncoder();
        const dataString = JSON.stringify(data);
        const hashBuffer = await crypto.subtle.digest(
            'SHA-256',
            encoder.encode(dataString).buffer as ArrayBuffer
        );
        return this.arrayBufferToBase64(hashBuffer as ArrayBuffer);
    }

    /**
     * Verify data integrity by comparing fingerprints
     */
    async verifyDataIntegrity(
        data: unknown,
        expectedFingerprint: string
    ): Promise<boolean> {
        const actualFingerprint = await this.generateDataFingerprint(data);
        return actualFingerprint === expectedFingerprint;
    }

    private arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    private base64ToArrayBuffer(base64: string): ArrayBuffer {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }
}

// Singleton instance
export const medicalEncryptor = new MedicalDataEncryptor();
