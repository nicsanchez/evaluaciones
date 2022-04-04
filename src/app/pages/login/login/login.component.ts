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
      this.loginService.login(data).subscribe(
        (success:any) => {
          localStorage.setItem('token',success.token);
          this.getUserInformation(success.token);
        },
        (error) => {
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

  getUserInformation(token:any){
    let data = {
      token:token
    }
    this.loginService.getUserInformation(data).subscribe(
      (data:any) => {
        localStorage.setItem('user',data.id);
        this.router.navigate(['users']);
        this.toastrService.success('Ha iniciado sesión exitosamente.','Exito');
      },
      () => {
        this.toastrService.error('No fue posible obtenerse los datos del usuario en sesión.','Error');
      }
    );
  }
}
