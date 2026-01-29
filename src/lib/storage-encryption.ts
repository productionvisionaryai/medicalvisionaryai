/**
 * Encrypted localStorage wrapper for sensitive medical data
 */
import { medicalEncryptor } from './encryption';
import { EncryptedData } from '../types/encrypted-data';

export class EncryptedStorage {
    private encryptionKey: CryptoKey | null = null;
    private readonly DEFAULT_SALT = 'helena-medical-vault-v1';

    /**
     * Set the encryption key using a passphrase
     */
    async initialize(passphrase: string): Promise<void> {
        const encoder = new TextEncoder();
        const salt = encoder.encode(this.DEFAULT_SALT);
        this.encryptionKey = await medicalEncryptor.deriveKeyFromPassphrase(passphrase, salt);
    }

    /**
     * Set an item in encrypted storage
     */
    async setItem(key: string, value: unknown): Promise<void> {
        if (!this.encryptionKey) {
            throw new Error('Storage not initialized. Please call initialize(passphrase) first.');
        }

        try {
            const encryptedData = await medicalEncryptor.encrypt(value, this.encryptionKey);
            localStorage.setItem(this.getStorageKey(key), JSON.stringify(encryptedData));
        } catch (error) {
            console.error(`Failed to set encrypted item ${key}:`, error);
            throw new Error(`Encryption failed for ${key}`);
        }
    }

    /**
     * Get an item from encrypted storage
     */
    async getItem<T>(key: string): Promise<T | null> {
        if (!this.encryptionKey) {
            throw new Error('Storage not initialized. Please call initialize(passphrase) first.');
        }

        const rawData = localStorage.getItem(this.getStorageKey(key));
        if (!rawData) return null;

        try {
            const encryptedData: EncryptedData = JSON.parse(rawData);
            return await medicalEncryptor.decrypt(encryptedData, this.encryptionKey) as T;
        } catch (error) {
            console.error(`Failed to get encrypted item ${key}:`, error);
            // If decryption fails, the key might be wrong or data corrupted
            return null;
        }
    }

    /**
     * Remove an item from encrypted storage
     */
    removeItem(key: string): void {
        localStorage.removeItem(this.getStorageKey(key));
    }

    /**
     * Check if storage is initialized
     */
    isInitialized(): boolean {
        return this.encryptionKey !== null;
    }

    private getStorageKey(key: string): string {
        return `enc_${key}`;
    }
}

// Singleton instance for the application
export const encryptedStorage = new EncryptedStorage();
