import { Component } from '@angular/core';
import { SortButton } from "./components/sort-button/sort-button";
import { TaskItem } from "./components/task-item/task-item";
import { Header } from "../../shared/layout/header/header";
import { Footer } from "../../shared/layout/footer/footer";

@Component({
  selector: 'app-task-page',
  imports: [SortButton, TaskItem, Header, Footer],
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',
})
export class TaskPage {

}
