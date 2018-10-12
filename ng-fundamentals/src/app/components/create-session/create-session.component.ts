import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Session } from '../../models';
import { restrictedWords } from '../../validators';

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  @Output()
  saveNewSession: EventEmitter<Session> = new EventEmitter<Session>();
  @Output()
  cancelAddSession: EventEmitter<void> = new EventEmitter<void>();
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;
  newSessionForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(value: any) {
    const session: Session = {
      id: undefined,
      name: value.name,
      duration: +value.duration,
      level: value.level,
      presenter: value.presenter,
      abstract: value.abstract,
      voters: []
    };

    this.saveNewSession.emit(session);
  }

  cancel(): void {
    this.cancelAddSession.emit();
  }
}
