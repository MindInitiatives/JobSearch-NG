import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Job } from '../interfaces/job';
interface ApiResponse {
  data: Job[],
  parameters: any,
  request_id: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  // Signals for reactive state
  data: WritableSignal<Job[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  error: WritableSignal<HttpErrorResponse | null> = signal(null);

  private readonly baseUrl = 'https://jsearch.p.rapidapi.com';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-key': '7a2933e5e3msh609f03dcfbf8fd1p14ff83jsn40401d29b810', // Replace with your API key
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  });

  constructor(private http: HttpClient) {}

  fetch(endpoint: string, query: { [param: string]: string | number | boolean | readonly (string | number | boolean)[] }): void {
    const url = `${this.baseUrl}/${endpoint}`;
    const params = new HttpParams({ fromObject: query });

    // Update loading state
    this.isLoading.set(true);

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
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          // Reset loading state
          this.isLoading.set(false);
        },
      });
  }
}