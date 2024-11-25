import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CustomValidator } from '../../validator';
import { LoginResponse } from '../../../interfaces/auth';
import { icon } from '../../animation/icon';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { componentAnimation } from '../../animation/component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, MatIcon, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [icon, componentAnimation]
})
export class LoginComponent {
  snackbar: MatSnackBar = inject(MatSnackBar)
  router: Router = inject(Router)
  authService: AuthService = inject(AuthService)
  constructor(private authHttp: AuthService) {

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidator.validatePassword])
  })

  onFocus(event: any) {
    event.target?.nextElementSibling.classList.remove("defaultOrUnfilledLabel")
    event.target?.nextElementSibling.classList.add("filledOrFocusedLabel")
  }

  onBlur(event: any) {
    if (event.target.value.length == 0) {
      event.target?.nextElementSibling.classList.add("defaultOrUnfilledLabel")
      event.target?.nextElementSibling.classList.remove("filledOrFocusedLabel")
    }
  }

  onFormSubmit() {
    this.authHttp.login({ email: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value }).subscribe((data: LoginResponse) => {
      if (data.statusCode == 401 || data.statusCode == 500) {
        this.openSnackbar(data.message)
      }
      else {
        this.authService.setUserInfo(data.userInfo)
        this.authService.setisAuthorized(true)
        this.router.navigate(['/dashboard'])
      }
    })
  }

  isShownPassword(passwordEl: HTMLInputElement) {
    passwordEl.type = passwordEl.type == "password" ? "text" : "password"
  }

  openSnackbar(message: string) {
    this.snackbar.open(message, 'Ok', { duration: 2000 })
  }
}
