import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  flag: boolean = true;
  public loading = false;

  constructor(private fb: FormBuilder, 
    private loginService: LoginServiceService,
    private toastrService: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /* Metodo para iniciar sesión mediante el servicio Login Service */
  login() {
    if (this.form.valid) {
      let data = {
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      };
      this.loading = true;
      this.loginService.login(data).subscribe(
        (success:any) => {
          this.loading = false;
          localStorage.setItem('token',success.token);
          this.getPermissions(success.token)
        },
        (error) => {
          this.loading = false;
          if(error.status == 400){
            this.toastrService.error('Usuario y/o contraseña invalidos','Error');
          }else if(error.status == 404){
            this.toastrService.error('Usuario ingresado no existe en el aplicativo','Error');
          }else{
            this.toastrService.error('No fue posible iniciarse sesión.','Error');
          }
        }
      );
    };
  }

  getPermissions(token:any){
    let data = {
      token : token
    }
    this.loginService.getPermissions(data).subscribe(
      (response:any) => {
        if(response.status = 200){
          this.loginService.setGlobalRol(response.data['0']['key']);
          this.router.navigate(['evaluations']);
          this.toastrService.success('Ha iniciado sesión exitosamente.','Exito');
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
