import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_IMPORTS } from '@src/app/features/auth/components/login/login.imports';
import { Auth } from '@src/app/features/auth/services/auth';
import { ErrorResponse, LoginResponse } from '@src/app/features/auth/types/auth';

@Component({
  imports: LOGIN_IMPORTS,
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  public form = new FormGroup({
    username: new FormControl('',{validators:[Validators.required,Validators.minLength(3)],nonNullable:true}),
    password: new FormControl('',{validators:[Validators.required,Validators.minLength(8)],nonNullable:true})
  });

  public error = signal('');

  public showError(control:AbstractControl,error:string):boolean {
    return control.touched&&control.hasError(error)
  }
  public login() {

    if(!this.form.valid) {
      return;
    }

    this.auth.login(this.form.getRawValue()).subscribe({
      next:(response)=>this.handleSuccess(response),
      error:(error)=>this.handleError(error)
    });
  }

  public handleSuccess(response:LoginResponse) {
    this.router.navigateByUrl('/');
  }

  public handleError(response:ErrorResponse) {
    this.error.set(response.error.message);
  }

}
