import { Component, Input } from '@angular/core';
import { TaskDto } from '../../../../services/taskService/task-service';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
  standalone: true
})
export class TaskItem {
  isExpaned: boolean = true;
  @Input() task!: TaskDto;
}
