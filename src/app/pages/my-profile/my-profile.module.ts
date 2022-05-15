import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { MyProfileRoutes } from './my-profile.routing';
import { MatCardModule } from '@angular/material/card';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    RouterModule.forChild(MyProfileRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    ComponentsModule,
  ],
  exports: [MyProfileComponent],
})
export class MyProfileModule {}
