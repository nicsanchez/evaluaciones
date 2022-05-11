import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private toastrService: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let data = {
      token : localStorage.getItem('token')
    }
    this.loginService.getPermissions(data).subscribe(
      (response:any) => {
        if(response.status = 200){
          this.loginService.setGlobalRol(response.data['0']['key']);
        }else{
          this.logout();
          this.toastrService.success('No fue posible obtenerse los permisos del usuario en el aplicativo.','Error');
        }
      },
      () => {
        this.logout();
        this.toastrService.success('Ocurrió un error al obtenerse los permisos del usuario en el aplicativo.','Error');
      }
    );
  }

  logout(){
    let data = {
      token: localStorage.getItem('token'),
    }
    this.loginService.logout(data).subscribe(
      (data:any) => {
        if(data.status == 200){
          this.toastrService.success('Se ha cerrado sesión exitosamente.','Exito');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['login']);
        }else{
          this.toastrService.error('No fue posible cerrarse sesión.','Error');
        }
      }, () => {
        this.toastrService.error('Ha ocurrido un error en el servidor al tratar de cerrar sesión.','Error');
      }
    );
  }

  goToMyProfile(){
    this.router.navigate(['my-profile']);
  }

}
