import {
  Component
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding0left: 10px }
  `
  ]
})
export class LoginComponent {
  userName: string;
  password: string;
  mouseoverLogin: boolean;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  public login(value: any) {
    this.authService.loginUser(value.userName, value.password);
    this.router.navigate(['events']);
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
