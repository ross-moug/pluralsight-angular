import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'collapisble-well',
  templateUrl: './collapisble-well.component.html'
})
export class CollapisbleWellComponent {
  visible: boolean = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
