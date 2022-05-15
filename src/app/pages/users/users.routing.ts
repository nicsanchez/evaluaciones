import { Routes } from '@angular/router';
import { UsersComponentComponent } from './users-component/users-component.component';

export const UsersRoutes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersComponentComponent,
      },
    ],
  },
];
