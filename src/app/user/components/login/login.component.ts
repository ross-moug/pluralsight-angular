import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public login(value: any) {
    console.log(value);
    this.router.navigate(['events']);
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
