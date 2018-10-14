import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'up-vote',
  templateUrl: './up-vote.component.html',
  styleUrls: ['./up-vote.component.css']
})
export class UpVoteComponent {
  @Input()
  set voted(val){
    this.iconColour = val ? 'red' : 'white'
  };
  @Input()
  count: number;
  @Output() vote: EventEmitter<void> = new EventEmitter<void>();

  iconColour: string;

  constructor() { }

  onClick(): void {
    this.vote.emit();
  }
}
