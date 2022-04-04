import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginRoutes } from "./users.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';  

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}