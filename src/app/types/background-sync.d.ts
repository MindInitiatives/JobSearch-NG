interface BackgroundSyncManager {
  register(tag: string): Promise<void>;
}

interface ServiceWorkerRegistration {
  sync?: BackgroundSyncManager;
}
