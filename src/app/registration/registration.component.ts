import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }

  registerInfo = '';

  modelForm: FormGroup;

  email: FormControl;
  password: FormControl;
  password2: FormControl;

  emailExists: boolean = false;
  isPasswordConfirmed = true;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.modelForm = new FormGroup({
      email: this.email = new FormControl('', [Validators.required, Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")]),
      password: this.password = new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: this.password2 = new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  boothPasswordsGood(){
    return this.password.value === this.password2.value;
  }

  register() {
    if(!this.boothPasswordsGood()){
      this.isPasswordConfirmed = false;
    }
    else{
      this.isPasswordConfirmed = true;
      this.credentials.email = this.email.value,
      this.credentials.password = this.password.value,
      this.modelForm.reset();
      this.authService.register(this.credentials.email, this.credentials.password);
        // .then(() => {
        //   this.registerInfo = 'Sign up successful';
        //   this.emailExists = false
        // })//this.registerInfo = 'ACCOUNT CREATED, PLZ LOGIN IN!')
        // .catch(err => {
        //   this.registerInfo = 'Sign up fatal';
        //   this.emailExists = true;
        // });//console.log(err.message));
    }
  }

}
