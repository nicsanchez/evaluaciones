import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.css']
})
export class CreateEditUsersComponent implements OnInit {
  title:any;
  form: FormGroup;
  editing: boolean;

  constructor(
    private dialogRef: MatDialogRef<CreateEditUsersComponent>,
    private fb: FormBuilder,
    private userService: UsersService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.editing = this.data.editing;
    this.buildForm();
  }

  /* Método para construir el formulario reactivo*/
  buildForm(){
    this.form = this.fb.group({
      name: [ this.editing ? this.data.user.name : '', [Validators.required,Validators.maxLength(50), Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$')]],
      lastname: [this.editing ? this.data.user.lastname : '',  [Validators.required,Validators.maxLength(50), Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$')]],
      mail: [this.editing ? this.data.user.email : '',  [Validators.required,Validators.maxLength(50), Validators.email]],
      document: [this.editing ? this.data.user.document : '', [Validators.required,Validators.min(100000),Validators.max(999999999999999)]],
      username: [this.editing ? this.data.user.username : '', [Validators.required]],
      password: ['', this.editing ? [] : [Validators.required]],
    });
  }

  /* Metodo usado para enviar el formulario */
  onSubmit(){
    if (this.form.valid) {
      if(this.editing){
        this.updateUser();
      }else{
        this.createNewUser();
      }

    }
  }

  /* Método usado para crear los usuarios */
  createNewUser(){
    let data = {
      username: this.form.controls['username'].value,
      name: this.form.controls['name'].value,
      lastname: this.form.controls['lastname'].value,
      mail: this.form.controls['mail'].value,
      password: this.form.controls['password'].value,
      document: this.form.controls['document'].value,
      token: localStorage.getItem('token'),
    }

    this.userService.createUser(data).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.toastrService.success('Se ha creado el usuario exitosamente','Exito');
          this.dialogRef.close('ok');
        }else{
          this.toastrService.error('No fue posible crearse el usuario','Error');
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
          this.toastrService.error('Ocurrió un error al crearse el usuario','Error');
        }
      }
    )
  }

  /* Método usado para actualizar los usuarios */
  updateUser(){
    let data = {
      token: localStorage.getItem('token'),
      data: {
        id: this.data.user.id,
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
          this.toastrService.success('Se ha creado el usuario exitosamente','Exito');
          this.dialogRef.close('ok');
        }else{
          this.toastrService.error('No fue posible crearse el usuario','Error');
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
          this.toastrService.error('Ocurrió un error al crearse el usuario','Error');
        }
      }
    )
  }
}
