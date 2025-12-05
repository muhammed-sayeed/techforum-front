import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-user-layout',
  imports: [CommonModule,RouterModule],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css'
})
export class UserLayout {
constructor(
  private router: Router,
  public auth: UserService
) {}

logout() {
    this.auth.logout();
  }

}
