import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { Job } from '../interfaces/job';

interface JobDB extends DBSchema {
  jobs: {
    key: string;
    value: Job;
  };
}

@Injectable({
  providedIn: 'root',
})
export class JobDatabaseService {
  private dbPromise = openDB<JobDB>('job-database', 1, {
    upgrade(db) {
      db.createObjectStore('jobs', { keyPath: 'job_id' });
    },
  });

  async addJob(job: Job) {
    const db = await this.dbPromise;
    await db.put('jobs', job);
  }

  async getJobs() {
    const db = await this.dbPromise;
    return db.getAll('jobs');
  }
}
