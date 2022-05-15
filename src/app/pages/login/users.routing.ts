import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
];
