import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';
//import { Forgotpassword } from '../forgotpassword/forgotpassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email?: string, password?: string) {
    this.email = email ?? this.email;
    this.password = password ?? this.password;

    const url = 'http://localhost:3000/api/auth/login';
    this.http.post(url, { email: this.email, password: this.password }, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          console.log('Login ok', res);
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: err => console.error('Login error', err)
      });
  }

  logout() {
    const url = 'http://localhost:3000/api/auth/logout';
    this.http.post(url, {}, { withCredentials: true })
      .subscribe(() => console.log('Logged out'));
  }

  // @Output() changeView = new EventEmitter<string>();

  // goToRegister() {
  //   this.changeView.emit('register');
  // }

  // goToForgot() {
  //   this.changeView.emit('forgot');
  // }

  // switchToForgot() {
  //   this.changeView.emit('forgot');
  // }
}
