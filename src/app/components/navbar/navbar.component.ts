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

  constructor(private loginService: LoginServiceService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
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
