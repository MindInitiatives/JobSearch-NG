import { Component } from '@angular/core';
import { SelectComponent } from '../../ui/select/select.component';
interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  jobTypeOptions: Option[] = [
    { id: 1, name: 'Full-time' },
    { id: 2, name: 'Part-time' },
    { id: 3, name: 'Contractor' },
  ];
  
  jobLocationOptions: Option[] = [
    { id: 1, name: 'Remote' },
    { id: 2, name: 'On site' },
    { id: 3, name: 'Hybrid' },
  ];

  handleSelection($event: any) {
    console.log($event);
    
  }
}
