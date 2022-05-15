import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponentComponent } from './users-component/users-component.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateEditUsersComponent } from './modals/create-edit-users/create-edit-users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [UsersComponentComponent, CreateEditUsersComponent],
  imports: [
    RouterModule.forChild(UsersRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ComponentsModule,
    MatSelectModule,
  ],
  exports: [UsersComponentComponent],
})
export class UsersModule {}
