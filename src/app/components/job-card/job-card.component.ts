import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Job } from '../../interfaces/job';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent {
  @Input() job!: Job;
  @Output() jobSelected = new EventEmitter<Job>();

  checkImageURL(url: string) {
    return Utils.checkImageURL(url)
  }
}
