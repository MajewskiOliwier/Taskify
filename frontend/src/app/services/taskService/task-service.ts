import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

export interface TaskDto {
  id: number;
  title: string;
  description: string;
}

@Injectable({providedIn: 'root'})
export class TaskService {
    constructor(private http: HttpClient) {}

    getTasks(): Observable<TaskDto[]> {
      return this.http.get<TaskDto[]>("/api/tasks"); //1 is userID placeholder
    }

    // addTask(task: Omit<TaskDto, 'id'>): Observable<TaskDto> {
    //   return this.http.post<TaskDto>(this.baseTaskUrl, task);
    // }
}
