import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Job } from '../interfaces/job';
import { JobDatabaseService } from './job-database.service';

interface ApiResponse {
  data: Job[];
  parameters: any;
  request_id: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  // Signals for reactive state
  data: WritableSignal<Job[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<HttpErrorResponse | null> = signal(null);

  private readonly baseUrl = 'https://jsearch.p.rapidapi.com';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-key': 'YOUR_API_KEY', // Replace with your API key
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  });

  constructor(private http: HttpClient, private jobDb: JobDatabaseService) {}

  fetch(
    endpoint: string,
    query: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }
  ): void {
    const url = `${this.baseUrl}/${endpoint}`;
    const params = new HttpParams({ fromObject: query });

    // Update loading state
    this.isLoading.set(true);

    if (!navigator.onLine) {
      // Offline: Fetch from IndexedDB
      this.jobDb.getJobs().then((cachedJobs) => {
        this.data.set(cachedJobs);
        this.error.set(null); // Clear any previous error
        console.log('Fetched jobs from IndexedDB:', cachedJobs);
        this.isLoading.set(false); // Reset loading state
      });
    } else {
      // Online: Fetch from API
      this.http
        .get<ApiResponse>(url, { headers: this.headers, params })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            // Update error signal
            this.error.set(error);
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (response) => {
            // Update data and clear error
            this.data.set(response.data);
            this.error.set(null);

            // Save jobs to IndexedDB for offline access
            response.data.forEach((job) => {
              this.jobDb.addJob(job);
            });

            console.log('Fetched jobs from API and cached in IndexedDB:', response.data);
          },
          error: (error) => {
            console.error('API request failed:', error);
          },
          complete: () => {
            // Reset loading state
            this.isLoading.set(false);
          },
        });
    }
  }
}
