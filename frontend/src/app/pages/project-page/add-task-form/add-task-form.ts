import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-form.html',
  styleUrl: './add-task-form.css',
  standalone: true,
})
export class AddTaskForm {
  @Input() projectID!: string;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  title = '';
  description = '';
  loading = false;

  constructor(private http: HttpClient) {}

  submit(): void {
    if (!this.title.trim()) return;

    this.loading = true;

    this.http.post(
      `${environment.apiUrl}/task/project/${this.projectID}`,
      { title: this.title, description: this.description },
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