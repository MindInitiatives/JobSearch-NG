import { Injectable, Injector, ApplicationRef, ComponentRef, createComponent } from '@angular/core';
import { ModalComponent } from '../ui/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef!: ComponentRef<ModalComponent>;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  open(component: any, inputs: Record<string, any> = {}) {
    // Create the modal component
    this.modalRef = createComponent(ModalComponent, {
      environmentInjector: this.appRef.injector,
    });

    // Attach it to the application root
    document.body.appendChild(this.modalRef.location.nativeElement);

    // Provide a close function
    this.modalRef.instance.close = () => this.close();

    // Dynamically load the content
    this.modalRef.instance.loadContent(component, inputs);
  }

  close() {
    if (this.modalRef) {
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
    }
  }
}
