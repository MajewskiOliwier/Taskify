import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list-item',
  imports: [],
  templateUrl: './team-list-item.html',
  styleUrl: './team-list-item.css',
  standalone: true
})
export class ProjectListItem {
  @Input() project!: {
      id_project: string;
      name: string;
      plan_type?: string;
  }

  @Input() userID!: string;

  constructor(private router: Router) {}

  openTeam(): void {
    this.router.navigate([
      '/project',
      this.userID,
      this.project.id_project
    ]);
  }
}