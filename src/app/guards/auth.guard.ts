import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private toastrService: ToastrService) {}

  canActivateChild() {
    let token = localStorage.getItem('token');
    if (token === null || token === undefined) {
      this.toastrService.error(
        'Debes iniciar sesión en el aplicativo para ingresar a la ruta especificada.',
        'Error'
      );
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
