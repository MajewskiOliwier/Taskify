import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddTaskForm } from "./add-task-form/add-task-form";
import { EditTaskForm } from "./edit-task-form/edit-task-form";
import { DeleteTaskConfirmation } from "./delete-task-confirmation/delete-task-confirmation";

@Component({
  selector: 'app-team-page',
  imports: [CommonModule, AddTaskForm, EditTaskForm, DeleteTaskConfirmation],
  templateUrl: './project-page.html',
  styleUrl: './project-page.css',
})
export class ProjectPage implements OnInit {
  isLoading = true;
  showAddTask = false;
  showEditTask = false;
  showTaskDeleteConfirmation = false;
  selectedTask: any | null = null;
  taskToDelete: any | null = null;  

  Object = Object;
  projectID!: string;
  userID!: string;

  columns: Record<string, any[]> = {};
  columnOrder: { id: string; title: string , description: string}[] = [];

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
        this.columns[col.id_COLONNE] = [];
        this.columnOrder.push({
          id: col.id_COLONNE,
          title: col.title,
          description: col.description
        });
      }

      this.http.get<any[]>(
        `http://localhost:3000/task/project/${this.projectID}`,
        { withCredentials: true }
      ).subscribe(tasks => {

        for (const task of tasks) {
          if (this.columns[task.id_COLONNE]) {
            this.columns[task.id_COLONNE]?.push(task);
          }
        }

        this.isLoading = false;
      });
    });
  }

  moveTask(task: any, targetColumnID: string): void {
    this.http.put(
      `http://localhost:3000/task/${task.id_task}/project/${this.projectID}/move`,
      { targetColumnID },
      { withCredentials: true }
    ).subscribe(() => {
      this.loadColumnsAndTasks();
    });
  }

  onTaskCreated(): void {
    this.showAddTask = false;
    this.loadColumnsAndTasks();
  }

  openEditTask(task: any): void {
    this.selectedTask = task;
    this.showEditTask = true;
  }

  closeEditTask(): void {
    this.selectedTask = null;
    this.showEditTask = false;
  }
 
  onTaskUpdated(): void {
    this.closeEditTask();
    this.loadColumnsAndTasks();
  }

  openDeleteTask(task: any): void {
    this.taskToDelete = task;
    this.showTaskDeleteConfirmation = true;
  }

  closeDeleteTask(): void {
    this.taskToDelete = null;
    this.showTaskDeleteConfirmation = false;
  }

  onTaskDeleted(): void {
    this.closeDeleteTask();
    this.loadColumnsAndTasks();
  }
}