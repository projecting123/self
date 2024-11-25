import { computed, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validator';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
  formType = signal<'signup' | 'login'>('signup')
  formData = computed<FormGroup>(() => this.formType() == 'signup' ? this.signupForm : this.loginForm)
  signupForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword]),
    confirm_password: new FormControl("", [Validators.required, Validators.minLength(6), CustomValidator.validatePassword, CustomValidator.mustMatch2])
  }, { validators: CustomValidator.mustMatch })

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidator.validateEmail]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), CustomValidator.validatePassword])
  })

}
