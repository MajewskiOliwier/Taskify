import { Component, OnInit } from '@angular/core';
import { Login } from "../login/login";
import { Register } from '../register/register';
import { Forgotpassword } from '../forgotpassword/forgotpassword';



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
     
  }

  // currentView: string = 'login';


  // setView(view: string) {
  // this.currentView = view;
// }


}