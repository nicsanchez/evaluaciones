import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  user = {
    name: '',
    lastname: '',
    mail: '',
    document: '',
    username: '',
    password: '',
  };
  form: FormGroup;
  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getMyInformation();
  }

  buildForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$'),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Zñ ÑáéíóúÁÉÍÓÚ]*$'),
        ],
      ],
      mail: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.email],
      ],
      document: [
        '',
        [
          Validators.required,
          Validators.min(100000),
          Validators.max(999999999999999),
        ],
      ],
      username: ['', [Validators.required]],
      password: [''],
    });
  }

  getMyInformation() {
    let data = {
      token: localStorage.getItem('token'),
    };
    this.userService.getUser(data).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.updateForm(response.data[0]);
        } else {
          this.toastrService.error(
            'No fue posible obtenerse la información personal.',
            'Error'
          );
        }
      },
      () => {
        this.toastrService.error(
          'Ocurrio un error al obtenerse la información personal.',
          'Error'
        );
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.dialog
        .open(ConfirmComponent, {
          width: '300px',
          disableClose: true,
          data: {
            message: `Estas a punto de actualizar tu información personal.`,
          },
        })
        .afterClosed()
        .subscribe((option: Boolean) => {
          if (option) {
            this.updatePersonalData();
          } else {
            this.loading = false;
          }
        });
    }
  }

  /* Método usado para actualizar la información personal del usuario en sesión*/
  updatePersonalData() {
    let data = {
      token: localStorage.getItem('token'),
      data: {
        username: this.form.controls['username'].value,
        name: this.form.controls['name'].value,
        lastname: this.form.controls['lastname'].value,
        email: this.form.controls['mail'].value,
        password: this.form.controls['password'].value,
        document: this.form.controls['document'].value,
      },
    };
    this.userService.updatePersonalData(data).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.status == 200) {
          this.getMyInformation();
          this.toastrService.success(
            'Se ha actualizado su información personal exitosamente',
            'Exito'
          );
        } else {
          this.toastrService.error(
            'No fue posible actualizarse su información personal',
            'Error'
          );
        }
      },
      (error) => {
        this.loading = false;
        if (error.status == 422) {
          let errors = '<ul>';
          if (
            error.error.errors['data.username'] !== null &&
            error.error.errors['data.username'] !== undefined
          ) {
            errors +=
              '<li>El campo usuario ya está registrado en base de datos.</li>';
          }

          if (
            error.error.errors['data.email'] !== null &&
            error.error.errors['data.email'] !== undefined
          ) {
            errors +=
              '<li>El campo correo electrónico ya está registrado en base de datos.</li>';
          }

          if (
            error.error.errors['data.document'] !== null &&
            error.error.errors['data.document'] !== undefined
          ) {
            errors +=
              '<li>El campo documento ya está registrado en base de datos.</li>';
          }
          errors += '</ul>';
          this.toastrService.error(errors, 'Listado de Errores', {
            closeButton: true,
            enableHtml: true,
          });
        } else {
          this.toastrService.error(
            'Ocurrió un error al actualizarse su información personal',
            'Error'
          );
        }
      }
    );
  }

  updateForm(data: any) {
    this.form.controls['name'].setValue(data.name);
    this.form.controls['lastname'].setValue(data.lastname);
    this.form.controls['username'].setValue(data.username);
    this.form.controls['mail'].setValue(data.email);
    this.form.controls['document'].setValue(data.document);
    this.form.controls['password'].setValue('');
  }
}
