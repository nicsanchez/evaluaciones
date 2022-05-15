import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private rol:String = '';

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  login(data:any){
    return this.http.post(environment.apiURL+'/login',data);
  }

  logout(data:any){
    this.http.post(environment.apiURL+'/logout',data).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.toastrService.success('Se ha cerrado sesión exitosamente.','Exito');
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        }else{
          this.toastrService.error('No fue posible cerrarse sesión.','Error');
        }
      }, () => {
        this.toastrService.error('Ha ocurrido un error en el servidor al tratar de cerrar sesión.','Error');
      }
    );
  }

  getPermissions(data:any){
    return this.http.post(environment.apiURL+'/roles/getPermissions',data);
  }

  setGlobalRol(globalRol:String){
    this.rol = globalRol;
  }

  getGlobalRol(){
    return this.rol;
  }

}
