import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
      em {
          float: right;
          color: #E05C65;
          padding-left: 10px;
      }

      .error input {
          background-color: #E3C3C5;
      }

      .error ::-webkit-input-placeholder {
          color: #999;
      }

      .error ::-moz-placeholder {
          color: #999;
      }

      .error :-moz-placeholder {
          color: #999;
      }

      .error :-ms-input-placeholder {
          color: #999;
      }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel(): void {
    this.router.navigate(['events']);
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events']);
    }
  }

  validateFirstName(): boolean {
    return this.firstName.invalid || this.firstName.touched;
  }

  validateLastName(): boolean {
    return this.lastName.invalid || this.lastName.touched;
  }
}