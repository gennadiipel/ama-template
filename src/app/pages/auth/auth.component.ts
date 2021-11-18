import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthForm } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  isFormSent: boolean = false

  authFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  auth(): void {
    if (this.authFormGroup.invalid) {
      return
    }

    const authForm: AuthForm = {...this.authFormGroup.value}
    
    this.isFormSent = true
    this._authService.login(authForm)
    .subscribe(() => {
      this._router.navigate(['/'])
    })
    .add(() => {
      this.isFormSent = false
    })
  }

}
