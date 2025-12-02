import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortButton } from "./components/sort-button/sort-button";
import { TaskItem } from "./components/task-item/task-item";
import { Header } from "../../shared/layout/header/header";
import { Footer } from "../../shared/layout/footer/footer";
import { TaskService, TaskDto } from '../../services/taskService/task-service';


@Component({
  selector: 'app-task-page',
  imports: [CommonModule, SortButton, TaskItem, Header, Footer],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
  standalone: true
})
export class TaskPage implements OnInit{
  tasks: TaskDto[] = [];
  loading = false;
  error?: string;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.loadTasks();

  }

  loadTasks(): void {
    this.loading = true;

    this.taskService.getProjectTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load tasks.';
        this.loading = false;
      }
    })
  }
}
