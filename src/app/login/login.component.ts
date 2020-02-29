import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
    password: ''
  }

  registerInfo = '';
  badLogin: boolean = false;


  modelForm: FormGroup;

  email: FormControl;
  password: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){

    this.modelForm = new FormGroup({
      email: this.email = new FormControl('', [Validators.required, Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")]),
      password: this.password = new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  login() {
    this.credentials.email = this.email.value,
    this.credentials.password = this.password.value,
    this.modelForm.reset();
    this.authService.login(this.credentials.email, this.credentials.password)
    .then(
      () => {
        this.badLogin = false;
        this.authService.logUser();
        this.router.navigate(['/courses']);
      })
    .catch(
      () => {
        this.badLogin = true;
      });
  }

}
