import { Component, OnInit } from '@angular/core';
import { LogoutButton } from "../../components/logout-button/logout-button";
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router  } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [LogoutButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone : true
})
export class Header implements OnInit {

  isLogged = false;
  private routerSub!: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.checkAuthentication(); 
  
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthentication();
      });
  }

  checkAuthentication() {
    const url = `${environment.apiUrl}/api/auth/verify`;
    this.http.get(url, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          if (res.authenticated) {
            this.isLogged = true;
          }
        },
        error: (err) => {
          this.isLogged = false;
          console.log('No valid token, staying on welcome page');
        }
    });
  }
}
