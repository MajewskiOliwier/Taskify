import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-form.html',
  styleUrl: './edit-task-form.css',
})
export class EditTaskForm {
  @Input() task!: any;

  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  title = '';
  description = '';
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.title = this.task.title;
    this.description = this.task.description;
  }

  submit(): void {
    this.loading = true;

    this.http.put(
      `http://localhost:3000/task/${this.task.id_task}`,
      {
        title: this.title,
        description: this.description
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.updated.emit();
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}