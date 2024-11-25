import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { CustomValidator } from '../../validator';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from "@angular/material/snack-bar"
import { AuthService } from '../../services/auth.service';
import { icon } from '../../animation/icon';
import { componentAnimation } from '../../animation/component';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    imports: [ReactiveFormsModule, NgClass, MatIcon, NgIf],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
    animations: [icon, componentAnimation],
    
})

export class SignupComponent {
  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword, CustomValidator.mustMatch2])
  }, { validators: CustomValidator.mustMatch })

  constructor(private authHttp: AuthService) {
  }

  onFormSubmit() {
    const res = this.authHttp.signup({ name: this.signupForm.value.name, email: this.signupForm.value.email, password: this.signupForm.value.password })
    res.subscribe((event: HttpEvent<any>) => {
      if(event.type === HttpEventType.Sent){
        this.openSnackbar('Creating Account...')
      }
      else if(event.type === HttpEventType.Response){
        this.openSnackbar(event.body.message)
      }
    })
  }

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

  isShownPassword(pass: HTMLInputElement) {
    pass.type = pass.type == "password" ? "text" : "password"
  }

  snackbar = inject(MatSnackBar)
  openSnackbar(message: string) {
    this.snackbar.open(message, "Ok", { duration: 2000 })
  }
}