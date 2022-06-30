import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { UploadErrorsComponent } from './errors/errors.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  form: FormGroup;
  public loading: boolean = false;
  public formDataAttachment = new FormData();
  acceptFiles = ['.zip', 'application/x-zip-compressed'];
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private evaluationsService: EvaluationsService,
    private dialogRef: MatDialogRef<UploadComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /* Método para validar la extensión y tamaño maximo del archivo adjunto*/
  onChangeFileInput() {
    let file = null;
    this.formDataAttachment = new FormData();
    const element = this.form.controls['file'].value;
    if (!this.acceptFiles.includes(element.type)) {
      this.toastrService.error(
        'El archivo adjunto no está permitido, solo se admiten archivos con formato .zip',
        'Error'
      );
    } else {
      file = element;
      this.formDataAttachment.append(element.name, element);
    }
    this.form.controls['file'].setValue(file);
  }

  /* Método para construir el formulario reactivo*/
  buildForm() {
    this.form = this.fb.group({
      file: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.dialog
        .open(ConfirmComponent, {
          width: '300px',
          disableClose: true,
          data: {
            message: `Estas a punto de reemplazar las evaluaciones almacenadas en el sistema por las estas que cargando actualmente en el archivo comprimido.`,
          },
        })
        .afterClosed()
        .subscribe((option: Boolean) => {
          if (option) {
            this.updateEvaluations();
          } else {
            this.loading = false;
          }
        });
    }
  }

  updateEvaluations() {
    this.evaluationsService.saveAttachments(this.formDataAttachment).subscribe(
      (response: any) => {
        this.loading = false;
        if (response.status == 200) {
          this.toastrService.success(
            'Se han cargado las evaluaciones exitosamente',
            'Exito'
          );
          this.dialogRef.close('ok');
        } else {
          if (
            response.errors != null &&
            response.errors != undefined &&
            response.errors.length != 0
          ) {
            this.dialog.open(UploadErrorsComponent, {
              width: '500px',
              disableClose: true,
              data: {
                errors: response.errors,
              },
            });
          } else {
            this.toastrService.error(
              'No fue posible cargarse las evaluaciones',
              'Error'
            );
          }
        }
      },
      () => {
        this.loading = false;
        this.toastrService.error(
          'Ocurrió un error al cargarse las evaluaciones',
          'Error'
        );
      }
    );
  }
}
