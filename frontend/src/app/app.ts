import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/layout/header/header";
import { Footer } from "./shared/layout/footer/footer";

// import { WelcomePage } from './pages/welcome-page/welcome-page';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend_taskify');
}
