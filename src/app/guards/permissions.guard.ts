import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  canActivateChild() {
    let rol = this.loginService.getGlobalRol();
    if (rol === 'ADMIN') {
      return true;
    } else {
      this.router.navigate(['/evaluations']);
      return false;
    }
  }
}
