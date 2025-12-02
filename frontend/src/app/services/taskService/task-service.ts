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
  
    private apiUrl = 'http://localhost:3000/task';

    getUserAsssignedTasks(): Observable<TaskDto[]> {
        return this.http.get<TaskDto[]>(`${this.apiUrl}/9f19a285-ce0b-11f0-a7ff-0a4c0216a5eb`);
    }

    getProjectTasks(): Observable<TaskDto[]> {
        return this.http.get<TaskDto[]>(`${this.apiUrl}/9f19a285-ce0b-11f0-a7ff-0a4c0216a5eb`);
    }
    
    // addTask(task: Omit<TaskDto, 'id'>): Observable<TaskDto> {
    //   return this.http.post<TaskDto>(this.baseTaskUrl, task);
    // }
}
