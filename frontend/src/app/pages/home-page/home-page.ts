import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectListItem } from './team-list-item/team-list-item';
import { ActivatedRoute } from '@angular/router';
import { AddProjectForm } from "./add-project-form/add-project-form";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  imports: [ProjectListItem, AddProjectForm],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: true,
})

export class HomePage implements OnInit {
  projects: any[] = [];
  isLoading = true;
  userID!: string;
  showAddProject = false;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userID = this.route.snapshot.paramMap.get('userID')!;
    this.loadTeams();
  }

  loadTeams(): void {
    const url = `${environment.apiUrl}/project/${this.userID}`;
    
    this.http.get<any[]>(url, { withCredentials: true }
    ).subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load projects', err);
        this.isLoading = false;
      }
    });
  }

  openAddProject(): void {
    this.showAddProject = true;
  }

  closeAddProject(): void {
    this.showAddProject = false;
  }

  onProjectCreated(): void {
    this.showAddProject = false;
    this.loadTeams(); 
  }
}
