import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

export interface BoardDto {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}
  
    private apiUrl = `${environment.apiUrl}/boards`;

    getUserAsssignedTasks(): Observable<BoardDto[]> {
        return this.http.get<BoardDto[]>(`${this.apiUrl}/9f19a285-ce0b-11f0-a7ff-0a4c0216a5eb`);
    }

    getProjectTasks(): Observable<BoardDto[]> {
        return this.http.get<BoardDto[]>(`${this.apiUrl}/9f19a285-ce0b-11f0-a7ff-0a4c0216a5eb/project/1/assigned`);
    }
}
