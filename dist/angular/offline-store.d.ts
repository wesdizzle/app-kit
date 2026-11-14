/**
 * GENERIC USER-SCOPED INDEXEDDB OFFLINE STORE (@wesdizzle/app-kit/angular)
 *
 * Provides resilient client-side persistence in IndexedDB with:
 * - User-scoped keys (`${keyPrefix}:${userId}` or `${keyPrefix}:anon`) to prevent
 *   cross-account cache bleed when switching accounts on shared devices.
 * - Persistent storage permission requests (`navigator.storage.persist()`) to protect
 *   against browser eviction under disk pressure or WebKit ITP.
 * - Pending-sync tracking (`pendingSync`, `updatedAt`) for offline-first optimistic writes.
 */
export interface KitStoredRecord<T> {
    state: T;
    updatedAt: number;
    pendingSync: boolean;
}
export interface KitOfflineStoreConfig {
    dbName: string;
    storeName: string;
    keyPrefix: string;
    dbVersion?: number;
    requestPersistenceOnInit?: boolean;
}
export declare function getScopedStorageKey(keyPrefix: string, userId?: number | null): string;
export declare class KitOfflineStore<T> {
    private readonly dbName;
    private readonly storeName;
    private readonly keyPrefix;
    private readonly dbVersion;
    private dbPromise;
    constructor(config: KitOfflineStoreConfig);
    /**
     * Request persistent storage from the browser.
     * Signals to the browser's storage engine (WebKit ITP & Chromium)
     * that data should NOT be evicted during disk pressure or inactivity.
     */
    requestPersistentStorage(): Promise<boolean>;
    private getDb;
    getStorageKey(userId?: number | null): string;
    getStoredState(userId?: number | null): Promise<KitStoredRecord<T> | null>;
    saveStateLocally(state: T, updatedAt: number, pendingSync?: boolean, userId?: number | null): Promise<void>;
    markSynced(updatedAt: number, userId?: number | null): Promise<void>;
}
