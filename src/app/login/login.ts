import { Component } from '@angular/core';
import {Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  @Output() changeView = new EventEmitter<string>();

  switchToForgot() {
    this.changeView.emit('forgot');
  }
}
