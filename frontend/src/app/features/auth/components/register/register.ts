import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGISTER_IMPORTS } from '@src/app/features/auth/components/register/register.imports';
import { Auth } from '@src/app/features/auth/services/auth';
import { ErrorResponse, RegisterResponse } from '@src/app/features/auth/types/auth';
import { sameAs } from '@src/app/features/auth/validators/sameAs-validator';

@Component({
  imports: REGISTER_IMPORTS,
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(Auth);
  private router = inject(Router);

  public form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+]).+$')],
      nonNullable: true,
    }),
    password_confirmation: new FormControl('', {
      validators: [Validators.required,sameAs('password')],
      nonNullable: true,
    }),
  });

  public showPassword: boolean = false;

  public toggleVisibility() {
    this.showPassword=!this.showPassword;
  }

  public error: string = '';

  public showError(control: AbstractControl, error: string): boolean {
    return control.touched && control.hasError(error);
  }
  public register() {
    if (!this.form.valid) {
      return;
    }

    this.auth.register(this.form.getRawValue()).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error),
    });
  }

  public handleSuccess(response: RegisterResponse) {
    this.router.navigateByUrl('/');
  }

  public handleError(response: ErrorResponse) {
    this.error = response.error.message;
  }
}
