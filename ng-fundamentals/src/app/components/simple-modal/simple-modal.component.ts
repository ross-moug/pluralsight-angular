import { Component, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { JQUERY_TOKEN } from '../../services';

@Component({
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent {
  @Input()
  title: string;
  @Input()
  elementId: string;
  @ViewChild('modalContainer')
  private containerElement: ElementRef;

  constructor(
    @Inject(JQUERY_TOKEN) private jQuery: Object
  ) { }

  closeModal(): void {
    this.jQuery(this.containerElement.nativeElement).modal('hide');
  }
}
