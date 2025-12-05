import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

loginForm!: FormGroup;

constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router
){}

ngOnInit(){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
}

onSubmit() {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.value;
    console.log("Form Data:", data);

    this.UserService.login(data).subscribe({
      next: (res) => {
        const user = res.response;

        localStorage.setItem('token', user.token);
        localStorage.setItem('refresh_token', user.refreshtoken)
        
        localStorage.setItem('user', JSON.stringify(user));

        this.UserService.isAuthenticated.set(true);

        if (user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/home']);
        }
      },
      error: (err) => {
        const msg = err.message || "Login failed";
      }
    });
  }
}
