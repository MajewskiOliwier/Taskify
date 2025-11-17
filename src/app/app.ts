import { Component, signal } from '@angular/core';
import { Welcome } from './welcome/welcome';
import { Login } from "./login/login";


@Component({
  selector: 'app-root',
  imports: [
    Welcome],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
}
