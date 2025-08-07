import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Authentication/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Check for remembered username
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      this.loginForm.patchValue({
        username: rememberedUsername,
        rememberMe: true
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, password, rememberMe } = this.loginForm.value;

    // Handle remember me functionality
    if (rememberMe) {
      localStorage.setItem('rememberedUsername', username);
    } else {
      localStorage.removeItem('rememberedUsername');
    }

    this.authService.signIn({username:this.loginForm.value.username, password:this.loginForm.value.password}).subscribe({
      next: () => {
        console.log('Logged in!')
        if(this.authService.getUserRole()==="ADMIN")
          this.router.navigate(['/']);
        else
          this.router.navigate(['/transfer']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        // Display error message to user
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
          this.isLoading=false
        } else if (err.status === 0) {
          this.errorMessage = 'Network error - please check your connection';
        } else {
          this.errorMessage = 'Login failed - please try again later';
        }
      }
    })

  }
}
