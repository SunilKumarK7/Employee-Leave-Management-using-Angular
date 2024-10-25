import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  loggedUserData: any;

  router = inject(Router);
  constructor() {
    const localData = localStorage.getItem('leaveUser');
    if (localData) {
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLoggoff() {
    localStorage.removeItem('leaveUser');
    this.router.navigateByUrl('login');
  }
}
