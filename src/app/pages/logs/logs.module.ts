import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogsRoutes } from './logs.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatTableModule } from '@angular/material/table';
import { LogsComponent } from './logs/logs.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    RouterModule.forChild(LogsRoutes),
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
    NgxMatFileInputModule,
    MatTableModule,
    ComponentsModule,
  ],
  exports: [],
})
export class LogsModule {}
