import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { ErrorsComponent } from './errors/errors.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
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
    private evaluationsService: EvaluationsService,
    private dialogRef: MatDialogRef<DownloadComponent>
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
      this.evaluationsService
        .downloadFilesByBulkFile(this.formDataAttachment)
        .subscribe(
          (response: any) => {
            this.loading = false;
            if (response.status == 200) {
              if (
                response.evaluations != null &&
                response.evaluations != undefined &&
                response.evaluations.length != 0
              ) {
                this.toastrService.success(
                  'Se han descargado las evaluaciones exitosamente',
                  'Exito'
                );
                var a = document.createElement('a');
                a.href = 'data:text/plain;base64,' + response.evaluations;
                a.download = 'Evaluaciones.zip';
                a.click();
              }
              if (
                response.errors != null &&
                response.errors != undefined &&
                response.errors.length != 0
              ) {
                this.dialog.open(ErrorsComponent, {
                  width: '500px',
                  disableClose: true,
                  data: {
                    errors: response.errors,
                  },
                });
              }
              this.dialogRef.close();
            } else {
              this.toastrService.error(
                'No fue posible descargarse las evaluaciones',
                'Error'
              );
            }
          },
          () => {
            this.loading = false;
            this.toastrService.error(
              'Ocurrió un error al descargarse las evaluaciones',
              'Error'
            );
          }
        );
    }
  }
}
