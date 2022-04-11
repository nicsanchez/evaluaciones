import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  public formDataAttachment = new FormData();
  acceptFiles = ['.pdf','application/pdf'];
  constructor(private fb: FormBuilder,private toastrService: ToastrService, private evaluationsService:EvaluationsService, private dialogRef: MatDialogRef<UploadComponent>) { }

  ngOnInit(): void {
    this.buildForm();
  }

  /* Método para validar la extensión y tamaño maximo del archivo adjunto*/
  onChangeFileInput(){
    let files:any[] = [];
    let errors = '<ul>';
    let hasErrors = false;
    this.formDataAttachment = new FormData();
    this.form.controls['file'].value.forEach((element:any) => {
      if(!this.acceptFiles.includes(element.type)){
        hasErrors = true;
        errors += '<li>'+element.name+'</li>';
      }else{
        files.push(element);
        this.formDataAttachment.append(element.name,element);
      }
    });
    errors += '</ul>';
    if (hasErrors) {
      this.toastrService.error('Los siguientes archivos no son permitios, solo se admiten archivos con formato .pdf:'+errors,'Error',{ closeButton: true, enableHtml: true })
    }
    this.form.controls['file'].setValue(files);
  }

  /* Método para construir el formulario reactivo*/
  buildForm(){
    this.form = this.fb.group({
      file: ['', [Validators.required]],
    });
  }

  onSubmit(){
    if(this.form.valid){
      this.evaluationsService.saveAttachments(this.formDataAttachment).subscribe(
        (response:any) => {
          if(response.status == 200){
            this.toastrService.success('Se han cargado las evaluaciones exitosamente','Exito');
            this.dialogRef.close('ok');
          }else{
            if(response.errors != null && response.errors != undefined && response.errors.length != 0){
              let errors = '<ul>';
              response.errors.forEach((element:any) => {
                errors += '<li>'+element+'</li>';
              });
              errors += '</ul>';
              this.toastrService.error('Los siguientes archivos no son permitios, no cumplen con la sintaxis en el nombre del archivo (Nombre Docente-Cedula.pdf):'+errors,'Error',{ closeButton: true, enableHtml: true })
            }else{
              this.toastrService.error('No fue posible cargarse las evaluaciones','Error');
            }
          }
        },
        () => {
          this.toastrService.error('Ocurrió un error al cargarse las evaluaciones','Error');
        }
      );
    }
  }

}
