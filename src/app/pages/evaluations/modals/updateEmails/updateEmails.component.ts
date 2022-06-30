import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmailsService } from 'src/app/services/emails.service';
import { EmailsErrorsComponent } from './errors/errors.component';

@Component({
  selector: 'app-update-emails',
  templateUrl: './updateEmails.component.html',
  styleUrls: ['./updateEmails.component.css'],
})
export class UpdateEmailsComponent implements OnInit {
  public loading: boolean = false;
  form: FormGroup;
  public formDataAttachment = new FormData();
  acceptFiles = [
    '.xls',
    '.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
  constructor(
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private emailsService: EmailsService,
    private dialogRef: MatDialogRef<UpdateEmailsComponent>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
    });
  }

  /* Método para validar la extensión y tamaño maximo del archivo adjunto*/
  onChangeFileInput() {
    this.formDataAttachment = new FormData();
    if (!this.acceptFiles.includes(this.form.controls['file'].value.type)) {
      this.form.controls['file'].setValue(null);
      this.toastrService.error(
        'El archivo adjunto no es permitido, solo se admiten archivos con formato .xls, xlsx'
      );
    } else {
      this.formDataAttachment.append('file', this.form.controls['file'].value);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.emailsService
        .storeEmailsByBulkFile(this.formDataAttachment)
        .subscribe(
          (response: any) => {
            this.loading = false;
            if (response.status == 200) {
              if (
                response.errors != null &&
                response.errors != undefined &&
                response.errors.length != 0
              ) {
                this.dialog.open(EmailsErrorsComponent, {
                  width: '500px',
                  disableClose: true,
                  data: {
                    errors: response.errors,
                  },
                });
                this.toastrService.warning(
                  'Se han cargado algunos de los correos electrónicos exitosamente.',
                  'Advertencia'
                );
              } else {
                this.toastrService.success(
                  'Se han cargado los correos electrónicos exitosamente.',
                  'Exito'
                );
              }
              this.dialogRef.close('ok');
            } else {
              this.toastrService.error(
                'No fue posible cargarse los correos electrónicos.',
                'Error'
              );
            }
          },
          () => {
            this.loading = false;
            this.toastrService.error(
              'Ocurrió un error al cargarse los correos electrónicos.',
              'Error'
            );
          }
        );
    }
  }
}
