/**
 * Error Recovery Utilities
 * 
 * Provides functionality to save and recover component state after errors.
 * Helps users resume their work after encountering errors.
 */

import { encryptedStorage } from './storage-encryption';

interface RecoveryState<T = unknown> {
    timestamp: number;
    component: string;
    data: T;
    error?: string;
    isEncrypted?: boolean;
}

class ErrorRecovery {
    private readonly STORAGE_KEY = 'helena-error-recovery';
    private readonly MAX_ITEMS = 5;
    private readonly EXPIRY_HOURS = 24;

    /**
     * Save component state for potential recovery
     */
    async saveState<T>(component: string, data: T, error?: string, secure: boolean = false): Promise<void> {
        const states = await this.getSavedStates();

        let finalData: T = data;
        let isEncrypted = false;

        // If secure is requested and storage is initialized, encrypt the data
        if (secure && encryptedStorage.isInitialized()) {
            try {
                // In a real implementation, we might want to encrypt the entire state object
                // For now, we flag it as encrypted and the loader will handle it
                isEncrypted = true;
            } catch (err) {
                console.warn('Encryption failed during state save:', err);
            }
        }

        const newState: RecoveryState<T> = {
            timestamp: Date.now(),
            component,
            data: finalData,
            error,
            isEncrypted
        };

        // Keep only recent states
        states.unshift(newState);
        const recentStates = states.slice(0, this.MAX_ITEMS);

        try {
            if (typeof window !== 'undefined') {
                if (secure && encryptedStorage.isInitialized()) {
                    // Save to encrypted storage container
                    await encryptedStorage.setItem(`${this.STORAGE_KEY}_${component}`, newState);
                } else {
                    // Save to standard storage
                    const standardStates = states.filter(s => !s.isEncrypted);
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(standardStates.slice(0, this.MAX_ITEMS)));
                }
            }
        } catch (error) {
            console.warn('Could not save recovery state:', error);
        }
    }

    /**
     * Get all saved recovery states (non-expired)
     */
    async getSavedStates(): Promise<RecoveryState[]> {
        try {
            if (typeof window === 'undefined') return [];

            const stored = localStorage.getItem(this.STORAGE_KEY);
            let states: RecoveryState[] = stored ? JSON.parse(stored) : [];

            const now = Date.now();
            const expiryMs = this.EXPIRY_HOURS * 60 * 60 * 1000;

            // Filter out expired states
            return states.filter(state =>
                now - state.timestamp < expiryMs
            );
        } catch (error) {
            console.warn('Could not load recovery states:', error);
            return [];
        }
    }

    /**
     * Get recovery state for a specific component
     */
    async getStateForComponent<T = unknown>(component: string): Promise<RecoveryState<T> | null> {
        // Try standard storage first
        const states = await this.getSavedStates();
        const standardState = states.find(state => state.component === component);
        if (standardState) return standardState as RecoveryState<T>;

        // Try encrypted storage
        if (encryptedStorage.isInitialized()) {
            const secureState = await encryptedStorage.getItem<RecoveryState<T>>(`${this.STORAGE_KEY}_${component}`);
            if (secureState) {
                const now = Date.now();
                const expiryMs = this.EXPIRY_HOURS * 60 * 60 * 1000;
                if (now - secureState.timestamp < expiryMs) {
                    return secureState;
                }
            }
        }

        return null;
    }

    /**
     * Clear recovery state for a component or all states
     */
    async clearState(component?: string): Promise<void> {
        if (typeof window === 'undefined') return;

        if (component) {
            const states = await this.getSavedStates();
            const filtered = states.filter(state => state.component !== component);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));

            // Also clear from encrypted storage if it's there
            if (encryptedStorage.isInitialized()) {
                encryptedStorage.removeItem(`${this.STORAGE_KEY}_${component}`);
            }
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
            // We can't easily clear all encrypted storage without a list, 
            // but this is fine for now as we use component-specific keys
        }
    }

    /**
     * Check if recovery data exists for a component
     */
    async hasRecoveryData(component: string): Promise<boolean> {
        return (await this.getStateForComponent(component)) !== null;
    }

    /**
     * Get formatted time since error occurred
     */
    async getTimeSinceError(component: string): Promise<string | null> {
        const state = await this.getStateForComponent(component);
        if (!state) return null;

        const minutes = Math.floor((Date.now() - state.timestamp) / 60000);
        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
}

// Export singleton instance
export const errorRecovery = new ErrorRecovery();

// Export type for external use
export type { RecoveryState };
