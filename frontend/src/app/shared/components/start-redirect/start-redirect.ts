import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-redirect',
  imports: [],
  templateUrl: './start-redirect.html',
  styleUrl: './start-redirect.css',
})
export class StartRedirect {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // const isLoggedIn = !!localStorage.getItem('token');  // update when we have token after login

    // if (isLoggedIn) {
      // this.router.navigate(['/home']);
    // } else {
      this.router.navigate(['/welcome']);
    // }
  }
}
