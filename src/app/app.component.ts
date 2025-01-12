import { Component, effect, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FetchService } from './services/fetch.service';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { Job } from './interfaces/job';
import { ModalService } from './services/modal.service';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SpinnerComponent, JobCardComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'JobSearch-NG';
  data = this.fetchService.data;
  isLoading = this.fetchService.isLoading;
  error = this.fetchService.error;

  constructor(
    private modalService: ModalService,
    private fetchService: FetchService
  ) {
    // Automatically refetch data whenever needed
    effect(() => {
      if (this.error()) {
        console.warn('An error occurred:', this.error()?.message);
      }
    });
  }

  ngOnInit(): void {
    const endpoint = 'search';
    const query = {
      query: 'Angular developer',
      num_pages: 1,
    };
    this.fetchService.fetch(endpoint, query);
  }

  selectJob = (job: Job) => {
    this.modalService.open(JobDetailsComponent, { data: job });
  };
}
