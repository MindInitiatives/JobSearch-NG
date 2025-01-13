import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundSyncService {
  // Extend the ServiceWorkerRegistration type to include 'sync'
  private getServiceWorkerSync(swRegistration: ServiceWorkerRegistration): BackgroundSyncManager | undefined {
    return (swRegistration as any).sync as BackgroundSyncManager | undefined;
  }

  registerBackgroundSync = (tag: string) => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then((swRegistration) => {
        const syncManager = this.getServiceWorkerSync(swRegistration);

        if (syncManager) {
          syncManager.register(tag).then(() => {
            console.log(`Background sync registered for ${tag}.`);
          }).catch((err) => {
            console.error('Background sync registration failed:', err);
          });
        } else {
          console.warn('Background Sync API is not supported in this browser.');
        }
      });
    } else {
      console.warn('Service Worker or SyncManager is not supported in this browser.');
    }
  };
}
