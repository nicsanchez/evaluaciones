import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { EvaluationsService } from 'src/app/services/evaluations.service';
import { DownloadComponent } from '../modals/download/download.component';
import { UploadComponent } from '../modals/upload/upload.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'document', 'filename', 'created_at','actions'];
  public dataSource = [];
  public itemsPerPage = 5;
  public page = 0;
  public total = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public form: FormGroup;
  public loading = false;

  constructor(private dialog: MatDialog, private evaluationsService: EvaluationsService, private toastrService:ToastrService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.getEvaluations();
  }

  buildForm(){
    this.form = this.fb.group({
      search: ['',[Validators.min(100000),Validators.max(999999999999999),Validators.pattern('[0-9]+')]],
    });
  }

  uploadEvaluations(){
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.page = 0;
        this.total = 0;
        this.getEvaluations();
      }
    });
  }

  downloadMultipleEvaluations(){
    this.dialog.open(DownloadComponent, {
      width: '500px',
      disableClose: true
    });
  }

  getEvaluations(){
    if(this.form.valid){
      let data = {
        token: localStorage.getItem('token'),
        itemsPerPage: this.itemsPerPage,
        search: this.form.value.search
      }
      this.loading = true;
      this.evaluationsService.getEvaluations(data,this.page).subscribe(
        (response:any) => {
          this.loading = false;
          if(response.status == 200){
            this.dataSource = response.data.data;
            this.total = response.data.total;
            if(this.total == 0){
              this.toastrService.warning('No se encontraron evaluaciones.','Advertencia');
            }
          }else{
            this.toastrService.error('No fue posible obtenerse las evaluaciones cargadas en el servidor','Error');
          }
        },
        () => {
          this.loading = false;
          this.toastrService.error('Ocurrió un error al obtenerse las evaluaciones cargadas en el servidor','Error');
        }
      );
    }
  }

  changePage(event:any){
    this.page = event.pageIndex+1;
    this.itemsPerPage = event.pageSize;
    this.getEvaluations();
  }

  download(name:any,filename:any){
    let data = {
      token: localStorage.getItem('token'),
      filename,
    }
    this.evaluationsService.downloadFileByFilename(data).subscribe(
      (response:any) => {
        if(response.status == 200){
          var a = document.createElement("a");
          a.href = "data:application/pdf;base64," + response.data;
          a.download = name+'.pdf';
          a.click();
        }else{
          this.toastrService.error('No fue posible descargarse la evaluacion cargada en el servidor','Error');
        }
      },
      () => {
        this.toastrService.error('Ocurrió un error al descargarse la evaluacion cargada en el servidor','Error');
      }
    );
  }
}
