import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isAdmin()) return true;
    this.router.navigate(['/courses']);
    return false;
  }
  
}
