import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  getUserName(){
    return this.authService.currentUser().email.split("@", 1)[0];
  }

  userIsLooged(){
    return this.authService.currentUser();
  }

  logOut() {
    this.authService.logout();
      // .then(() => {
      //   this.router.navigate(['/home'])
      // })//this.registerInfo = 'ACCOUNT logout, PLZ LOGIN IN!')
      // .catch(err => console.log(err.message));
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

}
