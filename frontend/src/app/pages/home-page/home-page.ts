import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TeamListItem } from './team-list-item/team-list-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [TeamListItem],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true,
})
export class HomePage implements OnInit {
  teams: any[] = [];
  isLoading = true;
  userID!: string;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userID = this.route.snapshot.paramMap.get('userID')!;
    this.loadTeams();
  }

  loadTeams(): void {
    const url = `http://localhost:3000/boards/${this.userID}`;
    
    this.http.get<any[]>(url, { withCredentials: true }
    ).subscribe({
      next: (data) => {
        this.teams = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load teams', err);
        this.isLoading = false;
      }
    });
  }
}
