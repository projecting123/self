import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from "@angular/material/snack-bar"
import { AuthService } from '../../services/auth.service';
import { icon } from '../../animation/icon';
import { componentAnimation } from '../../animation/component';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormService } from '../../services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginResponse } from '../../../interfaces/auth';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, NgClass, MatIcon, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  animations: [icon, componentAnimation],

})

export class FormComponent {
  formService = inject(FormService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  constructor(private authService: AuthService) {
    if (this.activatedRoute.snapshot.url[0].path == 'signup') {
      this.formService.formType.set('signup')
    }
    else {
      this.formService.formType.set('login')
    }
  }

  onFormSubmit() {
    if (this.formService.formType() == 'signup') {
      const res = this.authService.signup({ name: this.formService.formData().get('name')?.value, email: this.formService.formData().get('email')?.value, password: this.formService.formData().get('password')?.value })
      res.subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Sent) {
          this.openSnackbar('Creating Account...')
        }
        else if (event.type === HttpEventType.Response) {
          this.openSnackbar(event.body.message)
        }
      })
    }
    else if (this.formService.formType() == 'login') {
      this.authService.login({ email: this.formService.formData().get('email')?.value, password: this.formService.formData().get('password')?.value }).subscribe((data: LoginResponse) => {
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
