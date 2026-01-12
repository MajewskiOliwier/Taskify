import { Component, OnInit } from '@angular/core';
import { Welcome } from '../../welcome/welcome';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  imports: [Welcome],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css',
})
export class WelcomePage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const url = 'http://localhost:3306/api/auth/verify';
    this.http.get(url, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          if (res.authenticated) {
            console.log('User already authenticated, redirecting...');
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log('No valid token, staying on welcome page');
        }
      });
  }

}
