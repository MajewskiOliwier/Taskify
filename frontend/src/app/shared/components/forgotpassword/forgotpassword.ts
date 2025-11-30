import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  imports: [],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {

   @Output() changeView = new EventEmitter<string>();

  backToLogin() {
    this.changeView.emit('login');
  }
}
