import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list-item',
  imports: [],
  templateUrl: './team-list-item.html',
  styleUrl: './team-list-item.css',
  standalone: true
})
export class TeamListItem {
  @Input() team!: {
      id_board: string;
      name: string;
      description?: string;
  }

  constructor(private router: Router) {}

  openTeam(): void {
    this.router.navigate(['/boards', this.team.id_board]);
  }
}
