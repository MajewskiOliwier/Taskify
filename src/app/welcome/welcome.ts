import { Component, OnInit } from '@angular/core';
import { Login } from "../login/login";
import { Register } from '../register/register';


@Component({
  selector: 'app-welcome',
  imports: [Login, Register],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome implements OnInit{
  title! : string;
  description!: string;
  imageUrl!: string;
 

  ngOnInit(): void{
    this.title = "WELCOME ON TASKIFY";
    this.description = "Let's Manage your project's Tasks simply"
    this.imageUrl = "https://tse4.mm.bing.net/th/id/OIP.9l9nhSQvfBsuum103EQVuQHaEK?cb=ucfimg2ucfimg=1&w=1920&h=1079&rs=1&pid=ImgDetMain&o=7&rm=3"
   
  }

  currentView: string = 'login';


  setView(view: string) {
  this.currentView = view;
}

}
