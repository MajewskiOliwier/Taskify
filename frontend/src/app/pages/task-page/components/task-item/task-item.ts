import { Component } from '@angular/core';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
  standalone: true
})
export class TaskItem {
  isExpaned: boolean = true;
}
