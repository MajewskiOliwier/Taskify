import { Component, OnInit } from '@angular/core';

// Current changes:
// import { Welcome } from '../../welcome/welcome';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-welcome-page',
//   imports: [Welcome],

import { Forgotpassword } from '../../shared/components/forgotpassword/forgotpassword';
import { LoginSection } from "./components/login-section/login-section";
import { RegisterSection } from './components/register-section/register-section';

@Component({
  selector: 'app-welcome-page',
  imports: [LoginSection, RegisterSection],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.css',
})

export class WelcomePage implements OnInit {
  title! : string;
  description!: string;
  imageUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.title = "WELCOME ON TASKIFY";
    this.description = "Let's Manage your project's Tasks simply"
  }

  checkAuthentication() {
    const url = 'http://localhost:3000/api/auth/verify';
    this.http.get(url, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          if (res.authenticated) {
          
          console.log(
            'User with ID: already authenticated, redirecting...'
          );          
          console.log(res);  
          
          this.router.navigate(['/home/'+res.userId]);
          }
        },
        error: (err) => {
          console.log('No valid token, staying on welcome page');
        }
      });
  }
}