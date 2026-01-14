import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-section',
  imports: [],
  templateUrl: './login-section.html',
  styleUrl: './login-section.css',
})
export class LoginSection {
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
          console.log('Login ok with id:'+ res.userId, res);
          
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: err => console.error('Login error', err)
      });
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
