import { Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile.component';

export const MyProfileRoutes: Routes = [
  {
    path: 'my-profile',
    children: [
      {
        path: '',
        component: MyProfileComponent,
      },
    ],
  },
];
