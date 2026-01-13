import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-section',
  imports: [],
  templateUrl: './register-section.html',
  styleUrls: ['./register-section.css'],
})
export class RegisterSection { 
  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}