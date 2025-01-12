import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../interfaces/job';
import { Utils } from '../../utils/utils';
import moment from 'moment';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent {
  @Input() data!: Job;
  
  checkImageURL(url: string) {
    return Utils.checkImageURL(url)
  }

  formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A'
    return moment(dateString).format('MMMM D, YYYY H mm a');
  };
}
