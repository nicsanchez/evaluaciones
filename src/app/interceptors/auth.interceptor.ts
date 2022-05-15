import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response: any) => {
        if (response.body !== undefined && response.body !== null) {
          if (response.body.status === 900) {
            this.toastrService.error(
              'La sesión es inválida, ingrese al aplicativo nuevamente.',
              'Error'
            );
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          } else if (response.body.status === 901) {
            this.toastrService.error(
              'La sesión ha expirado, ingrese al aplicativo nuevamente.',
              'Error'
            );
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          } else if (response.body.status === 902) {
            this.toastrService.error(
              'Debes iniciar sesión en el aplicativo para ingresar a la ruta especificada.',
              'Error'
            );
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.router.navigate(['login']);
          }
        }
      })
    );
  }
}
