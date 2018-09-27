import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  userName: string;
  password: string;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  public login(value: any) {
    this.authService.loginUser(value.username, value.password);
    this.router.navigate(['events']);
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
