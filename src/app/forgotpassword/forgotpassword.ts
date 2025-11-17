import { Component } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {


  email: string = '';
  message: string = '';
  OnEmailChange(value:string){
    this.email= value;
  }
  submit() {
    if (!this.email || !this.email.includes('@')) {
      this.message = 'Enter a correct email address.';
      return;
    }

    this.message = 'A reset email has been sent to' + this.email;
  }

}
