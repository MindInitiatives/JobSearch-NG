importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-jobs') {
    event.waitUntil(syncJobs());
  }
});

async function syncJobs() {
  try {
    // Fetch jobs from the API
    const response = await fetchJobs();
    const jobs = await response.json();

    // Save jobs to IndexedDB
    await saveJobsToIndexedDB(jobs);

    console.log('Jobs synced in background:', jobs);
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Function to save jobs to IndexedDB
async function saveJobsToIndexedDB(jobs) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('JobDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object store if it doesn't already exist
      if (!db.objectStoreNames.contains('jobs')) {
        db.createObjectStore('jobs', { keyPath: 'job_id' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('jobs', 'readwrite');
      const store = transaction.objectStore('jobs');

      // Save jobs one by one
      jobs.forEach((job) => {
        store.put(job); // `put` adds or updates the record
      });

      transaction.oncomplete = () => {
        console.log('Jobs saved to IndexedDB successfully');
        resolve();
      };

      transaction.onerror = (err) => {
        console.error('Error saving jobs to IndexedDB:', err);
        reject(err);
      };
    };

    request.onerror = (err) => {
      console.error('Error opening IndexedDB:', err);
      reject(err);
    };
  });
}

function fetchJobs() {
  return fetch('https://jsearch.p.rapidapi.com/search', {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '7a2933e5e3msh609f03dcfbf8fd1p14ff83jsn40401d29b810',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    },
    params:{
      query: 'Angular developer',
      num_pages: 1,
    }
  });
}
