import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'up-vote',
  templateUrl: './up-vote.component.html',
  styleUrls: ['./up-vote.component.css']
})
export class UpVoteComponent {
  @Input()
  voted: boolean;
  @Input()
  count: number;
  @Output() vote: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onClick(): void {
    this.vote.emit();
  }
}
