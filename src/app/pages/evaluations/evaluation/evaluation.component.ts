import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../modals/upload/upload.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  uploadEvaluations(){
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '500px',
      disableClose: true
  });

  dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        console.log('ok');
      }
    });
  }
}
