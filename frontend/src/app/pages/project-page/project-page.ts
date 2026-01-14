import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutButton } from "../../shared/components/logout-button/logout-button";
import { AddTaskForm } from "./add-task-form/add-task-form";

@Component({
  selector: 'app-team-page',
  imports: [CommonModule, LogoutButton, AddTaskForm],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
})
export class ProjectPage implements OnInit {
  isLoading = true;
  showAddTask = false;

  Object = Object;
  projectID!: string;
  userID!: string;

  columns: Record<string, any[]> = {};
  columnOrder: string[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectID = this.route.snapshot.paramMap.get('projectID')!;
    this.userID = this.route.snapshot.paramMap.get('userID')!;
    this.loadColumnsAndTasks();
  }

  loadColumnsAndTasks(): void {
    this.isLoading = true;

    this.http.get<any[]>(
      `http://localhost:3000/project/${this.projectID}/columns`,
      { withCredentials: true }
    ).subscribe(columns => {

      this.columns = {};
      this.columnOrder = [];

      for (const col of columns) {
        this.columns[col.title] = [];
        this.columnOrder.push(col.title);
      }

      this.http.get<any[]>(
        `http://localhost:3000/task/project/${this.projectID}`,
        { withCredentials: true }
      ).subscribe(tasks => {

        for (const task of tasks) {
          if (this.columns[task.column_name]) {
            this.columns[task.column_name].push(task);
          }
        }

        this.isLoading = false;
      });
    });
  }

  onTaskCreated(): void {
    this.showAddTask = false;
    this.loadColumnsAndTasks();
  }
}
