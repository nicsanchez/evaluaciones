import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmailsService } from 'src/app/services/emails.service';
import { MassiveEmailsErrorsComponent } from './errors/errors.component';

@Component({
  selector: 'app-send-massive-emails',
  templateUrl: './sendMassiveEmails.component.html',
  styleUrls: ['./sendMassiveEmails.component.css'],
})
export class sendMassiveEmailsComponent implements OnInit {
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
    private dialogRef: MatDialogRef<sendMassiveEmailsComponent>
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
        .sendEvaluationsMailsToMultipleUsers(this.formDataAttachment)
        .subscribe(
          (response: any) => {
            this.loading = false;
            if (response.status == 200) {
              if (
                response.errors != null &&
                response.errors != undefined &&
                response.errors.length != 0
              ) {
                this.dialog.open(MassiveEmailsErrorsComponent, {
                  width: '500px',
                  disableClose: true,
                  data: {
                    errors: response.errors,
                  },
                });
                if (response.sendMails) {
                  this.toastrService.warning(
                    'Se han enviado algunas evaluaciones via correo electrónico exitosamente.',
                    'Advertencia'
                  );
                } else {
                  this.toastrService.error(
                    'No se envió ninguna evaluación asociada a las cédulas ingresadas.',
                    'Error'
                  );
                }
              } else {
                if (response.sendMails) {
                  this.toastrService.success(
                    'Se han enviado las evaluaciones via correo electrónico exitosamente.',
                    'Exito'
                  );
                } else {
                  this.toastrService.error(
                    'El documento ingresado no contiene ninguna cédula.',
                    'Error'
                  );
                }
              }
              this.dialogRef.close('ok');
            } else {
              this.toastrService.error(
                'No fue posible enviarse las evaluaciones via correo electrónico.',
                'Error'
              );
            }
          },
          () => {
            this.loading = false;
            this.toastrService.error(
              'Ocurrió un error al enviarse las evaluaciones via correo electrónico.',
              'Error'
            );
          }
        );
    }
  }
}
