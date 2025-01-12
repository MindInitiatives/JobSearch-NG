import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appModalHost]',
  standalone: true
})
export class ModalHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
