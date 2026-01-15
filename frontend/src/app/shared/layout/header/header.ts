import { Component } from '@angular/core';
import { LogoutButton } from "../../components/logout-button/logout-button";

@Component({
  selector: 'app-header',
  imports: [LogoutButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone : true
})
export class Header {
  
}
