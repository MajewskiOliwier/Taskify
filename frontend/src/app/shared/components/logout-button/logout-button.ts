import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
  standalone: true
})
export class LogoutButton {

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  // logout() {
  //   const url = 'http://localhost:3000/api/auth/logout';
  //   this.http.post(url, {}, { withCredentials: true })
  //     .subscribe(next: () => {
  //         this.router.navigate(['/welcome']);
  //       },
  //       error: err => {
  //         console.error('Logout failed', err);
  //       }
  //     };
      
    
  // }
  logout(): void {
    const url = `${environment.apiUrl}/api/auth/logout`;

    this.http.post(url, {}, { withCredentials: true })
      .subscribe({
        next: () => this.router.navigate(['/welcome']),
        error: err => console.error('Logout failed', err)
      });
  }
}
