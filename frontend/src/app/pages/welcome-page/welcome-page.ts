import { Component, OnInit } from '@angular/core';

// Current changes:
// import { Welcome } from '../../welcome/welcome';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-welcome-page',
//   imports: [Welcome],

import { Forgotpassword } from '../../shared/components/forgotpassword/forgotpassword';
import { RegisterSection } from "./components/register-section/register-section";
import { LoginSection } from "./components/login-section/login-section";

@Component({
  selector: 'app-welcome-page',
  imports: [LoginSection, RegisterSection],
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

    // old?
    // title! : string;
    // description!: string;
    // imageUrl!: string;
  
    // ngOnInit(): void{
    //   this.title = "WELCOME ON TASKIFY";
    //   this.description = "Let's Manage your project's Tasks simply"
      
    // }
  }
}