/**
 * Standard interface for encrypted data payloads in Helena AI
 */
export interface EncryptedData {
    iv: string; // Initialization vector (Base64)
    ciphertext: string; // Encrypted data (Base64)
    timestamp: number; // When encrypted
    version: string; // Encryption scheme version
    fingerprint?: string; // Optional integrity fingerprint (SHA-256)
}

export interface EncryptionConfig {
    algorithm: 'AES-GCM';
    keyLength: 256;
    version: string;
}
