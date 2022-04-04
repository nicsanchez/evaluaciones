import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EvaluationRoutes} from "./evaluation.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { UploadComponent } from './modals/upload/upload.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";

@NgModule({
  declarations: [EvaluationComponent, UploadComponent],
  imports: [
    RouterModule.forChild(EvaluationRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    NgxMatFileInputModule
  ],
  exports: [EvaluationComponent]
})
export class EvaluationsModule {}