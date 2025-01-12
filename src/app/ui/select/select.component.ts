import { CommonModule } from '@angular/common';
import { effect, signal, WritableSignal } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() defaultValue: string = '';
  @Input() options: any[] = [];
  @Input() displayField?: keyof any;
  @Output() onChange = new EventEmitter<any>();
  isOpen = signal(false); // Signal to track dropdown state
  selected: WritableSignal<any> = signal(null);

  constructor() {
    // Automatically close dropdown when clicking outside
    effect(() => {
      if (this.isOpen()) {
        const closeDropdown = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (!target.closest('.relative')) {
            this.isOpen.set(false);
          }
        };

        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
      }
      return () => {};
    });
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: string) {
    console.log(`Selected: ${option}`);
    this.isOpen.set(false);
    this.selected.set(option);
  }
}
