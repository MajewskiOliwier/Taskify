import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-delete-task-confirmation',
  imports: [CommonModule],
  templateUrl: './delete-task-confirmation.html',
  styleUrl: './delete-task-confirmation.css',
  standalone: true,
})
export class DeleteTaskConfirmation {
  @Input() taskId!: string;
  @Input() taskTitle!: string;

  @Output() close = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  loading = false;

  constructor(private http: HttpClient) {}

  confirmDelete(): void {
    this.loading = true;

    this.http.delete(
      `${environment.apiUrl}/task/${this.taskId}`,
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.deleted.emit();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}