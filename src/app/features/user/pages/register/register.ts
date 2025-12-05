import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/) 
          // must contain 1 letter + 1 number
        ]
      ]
    });
  }

  // convenience getters
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

 onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.userservice.register(this.registerForm.value).subscribe({
    next: (res) => {

      if (res.success) {
        localStorage.setItem('token', res.userdata.token);
        localStorage.setItem('refresh_token', res.userdata.refreshtoken);

        // Optionally store username/email if needed
        // localStorage.setItem('username', res.userdata.username);
        // localStorage.setItem('user_email', res.userdata.email);

        // Redirect
        this.router.navigate(['/user/home']);
      }

    },
    error: (err) => {
      console.error("Registration failed:", err);
      alert("Error creating account.");
    }
  });
}

}
