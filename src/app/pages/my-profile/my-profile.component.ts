import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  user = {
    name:'',
    lastname:'',
    mail:'',
    document:'',
    username:'',
    password:'',
  };
  id: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastrService: ToastrService,private userService: UsersService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('user');
    this.buildForm();
    this.getMyInformation();
  }

  buildForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(50), Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$')]],
      lastname: ['',  [Validators.required,Validators.maxLength(50), Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$')]],
      mail: ['',  [Validators.required,Validators.maxLength(50), Validators.email]],
      document: ['', [Validators.required,Validators.min(100000),Validators.max(999999999999999)]],
      username: ['', [Validators.required]],
      password: ['']
    });
  }

  getMyInformation(){
    let data = {
      id: this.id,
      token: localStorage.getItem('token')
    }
    this.userService.getUser(data).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.updateForm(response.data[0]);
        }else{
          this.toastrService.error('No fue posible obtenerse la información personal.','Error');
        }
      }, () =>{
        this.toastrService.error('Ocurrio un error al obtenerse la información personal.','Error');
      }
    );
  }

  /* Método usado para actualizar la información personal del usuario en sesión*/
  updatePersonalData(){
    if(this.form.valid){
      let data = {
        token: localStorage.getItem('token'),
        data: {
          id: this.id,
          username: this.form.controls['username'].value,
          name: this.form.controls['name'].value,
          lastname: this.form.controls['lastname'].value,
          email: this.form.controls['mail'].value,
          password: this.form.controls['password'].value,
          document: this.form.controls['document'].value,
        }
      }
      this.userService.updateUser(data).subscribe(
        (response:any) => {
          if(response.status == 200){
            this.getMyInformation();
            this.toastrService.success('Se ha actualizado su información personal exitosamente','Exito');
          }else{
            this.toastrService.error('No fue posible actualizarse su información personal','Error');
          }
        },
        (error) => {
          if(error.status == 422){
            if(error.error.errors.username !== null && error.error.errors.username !== undefined){
              this.toastrService.error('El campo usuario ya está registrado en base de datos.','Error');
            }
  
            if(error.error.errors.mail !== null && error.error.errors.mail !== undefined){
              this.toastrService.error('El campo correo electrónico ya está registrado en base de datos.','Error');
            }
  
            if(error.error.errors.document !== null && error.error.errors.document !== undefined){
              this.toastrService.error('El campo documento ya está registrado en base de datos.','Error');
            }
          }else{
            this.toastrService.error('Ocurrió un error al actualizarse su información personal','Error');
          }
        }
      )
    } 
  }

  updateForm(data:any){
    this.form.controls['name'].setValue(data.name);
    this.form.controls['lastname'].setValue(data.lastname);
    this.form.controls['username'].setValue(data.username);
    this.form.controls['mail'].setValue(data.email);
    this.form.controls['document'].setValue(data.document);
    this.form.controls['password'].setValue('');
  }
}
