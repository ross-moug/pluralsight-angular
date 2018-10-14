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
  @Input()
  closeOnBodyClick: boolean;
  @ViewChild('modalContainer')
  private containerElement: ElementRef;

  constructor(
    @Inject(JQUERY_TOKEN) private jQuery: any
  ) { }

  closeModal(): void {
    if (this.closeOnBodyClick) {
      this.jQuery(this.containerElement.nativeElement).modal('hide');
    }
  }
}
