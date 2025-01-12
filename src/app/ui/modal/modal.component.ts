import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ModalHostDirective } from '../../directives/modal-host.directive';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalHostDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() close!: () => void; // Function to close the modal
  @ViewChild(ModalHostDirective, { static: true }) modalHost!: ModalHostDirective;

  closeModal() {
    this.close();
  }

  loadContent(component: any, inputs: Record<string, any> = {}) {
    const viewContainerRef = this.modalHost.viewContainerRef;
    viewContainerRef.clear(); // Clear any existing content
    const componentRef = viewContainerRef.createComponent(component);
    // Pass inputs to the dynamically loaded component
    Object.keys(inputs).forEach((key) => {
      (componentRef.instance as any)[key] = inputs[key];
    });
    // Trigger change detection
    const cdr = componentRef.injector.get(ChangeDetectorRef);
    cdr.detectChanges();
  }
}
