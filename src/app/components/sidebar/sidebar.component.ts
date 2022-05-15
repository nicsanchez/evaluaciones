import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private toastrService: ToastrService,
  ) { }

  public isExpanded = false;
  
  public ROUTES_ADMIN = [
    { path: '/users', title: 'Usuarios', icon: 'people'},
    { path: '/evaluations', title: 'Evaluaciones', icon: 'summarize'},
    { path: '/logs', title: 'Seguimiento', icon: 'visibility'},
  ];
  
  public ROUTES_USER = [
    { path: '/evaluations', title: 'Evaluaciones', icon: 'summarize'},
  ];

  public menuItems:any = this.ROUTES_USER;
  
  ngOnInit(): void {
    this.getPermissions();
  }

  ngAfterViewInit(){
    this.getPermissions();
  }

  getPermissions(){
    let data = {
      token : localStorage.getItem('token')
    }
    this.loginService.getPermissions(data).subscribe(
      (response:any) => {
        if(response.status = 200){
          this.loginService.setGlobalRol(response.data['0']['key']);
          if(response.data['0']['key'] == 'ADMIN'){
            this.menuItems = this.ROUTES_ADMIN;
          }else{
            this.menuItems = this.ROUTES_USER;
          }
        }else{
          this.toastrService.success('No fue posible obtenerse los permisos del usuario en el aplicativo.','Error');
          this.loginService.logout(data);
        }
      },
      () => {
        this.toastrService.success('Ocurrió un error al obtenerse los permisos del usuario en el aplicativo.','Error');
        this.loginService.logout(data);
      }
    );
  }
}
