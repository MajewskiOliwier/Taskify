import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  //imports: [],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register { 
  constructor(private router: Router) {}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}

//OLD

// @Component({
//   selector: 'app-register-section',
//   imports: [],
//   templateUrl: './register-section.html',
//   styleUrl: './register-section.css',
// })
// export class RegisterSection {
//   //  @Output() changeView = new EventEmitter<string>();

//   // goToLogin() {
//   //   this.changeView.emit('login');
//   // }
// }