import { Directive, Inject, OnInit, ElementRef } from '@angular/core';
import { JQUERY_TOKEN } from '../services';

@Directive({
  selector: '[modalTrigger]'
})
export class ModalTriggerDirective implements OnInit {
  private nativeElement: HTMLElement;

  constructor(
    @Inject(JQUERY_TOKEN) private jQuery,
    elementRef: ElementRef) {
      this.nativeElement = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.nativeElement.addEventListener('click', e => this.jQuery('#simple-modal').modal({}));
  }
}
