import { Component, EventEmitter, Output, OnInit ,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-project-form.html',
  styleUrl: './add-project-form.css',
})

export class AddProjectForm{
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  @Input() userID!: string;

  projectName = '';
  planType = '';
  loading = false;

  constructor(
    private http: HttpClient) {}

  submit(): void {
    if (!this.projectName.trim()) 
      return;

    this.loading = true;

    const url = `${environment.apiUrl}/project/${this.userID}`;

    this.http.post(
      url,
      { 
        name: this.projectName, 
        plan_type: this.planType
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.created.emit();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}