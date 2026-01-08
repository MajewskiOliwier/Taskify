import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  //imports: [],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register { 
  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}