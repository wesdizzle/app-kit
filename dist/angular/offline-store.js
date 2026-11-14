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
export function getScopedStorageKey(keyPrefix, userId) {
    if (typeof userId === 'number' && Number.isFinite(userId) && userId > 0) {
        return `${keyPrefix}:${userId}`;
    }
    return `${keyPrefix}:anon`;
}
export class KitOfflineStore {
    constructor(config) {
        this.dbPromise = null;
        this.dbName = config.dbName;
        this.storeName = config.storeName;
        this.keyPrefix = config.keyPrefix;
        this.dbVersion = config.dbVersion ?? 1;
        if (config.requestPersistenceOnInit !== false) {
            void this.requestPersistentStorage();
        }
    }
    /**
     * Request persistent storage from the browser.
     * Signals to the browser's storage engine (WebKit ITP & Chromium)
     * that data should NOT be evicted during disk pressure or inactivity.
     */
    async requestPersistentStorage() {
        if (typeof navigator !== 'undefined' &&
            navigator.storage &&
            navigator.storage.persist) {
            try {
                return await navigator.storage.persist();
            }
            catch (err) {
                console.warn('StorageManager persist request error:', err);
            }
        }
        return false;
    }
    getDb() {
        if (this.dbPromise) {
            return this.dbPromise;
        }
        if (typeof window === 'undefined' || !('indexedDB' in window)) {
            this.dbPromise = Promise.resolve(null);
            return this.dbPromise;
        }
        const dbName = this.dbName;
        const dbVersion = this.dbVersion;
        const storeName = this.storeName;
        this.dbPromise = new Promise((resolve) => {
            try {
                const request = window.indexedDB.open(dbName, dbVersion);
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.createObjectStore(storeName);
                    }
                };
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    console.warn('Failed to open IndexedDB:', event);
                    resolve(null);
                };
            }
            catch (err) {
                console.warn('IndexedDB initialization failed:', err);
                resolve(null);
            }
        });
        return this.dbPromise;
    }
    getStorageKey(userId) {
        return getScopedStorageKey(this.keyPrefix, userId);
    }
    async getStoredState(userId) {
        const db = await this.getDb();
        if (!db)
            return null;
        const key = this.getStorageKey(userId);
        const storeName = this.storeName;
        return new Promise((resolve) => {
            try {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const req = store.get(key);
                req.onsuccess = () => {
                    resolve(req.result || null);
                };
                req.onerror = () => {
                    resolve(null);
                };
            }
            catch {
                resolve(null);
            }
        });
    }
    async saveStateLocally(state, updatedAt, pendingSync = false, userId) {
        const db = await this.getDb();
        if (!db)
            return;
        const key = this.getStorageKey(userId);
        const storeName = this.storeName;
        return new Promise((resolve) => {
            try {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const record = { state, updatedAt, pendingSync };
                store.put(record, key);
                tx.oncomplete = () => resolve();
                tx.onerror = () => resolve();
            }
            catch {
                resolve();
            }
        });
    }
    async markSynced(updatedAt, userId) {
        const current = await this.getStoredState(userId);
        if (current) {
            await this.saveStateLocally(current.state, updatedAt, false, userId);
        }
    }
}
