import { Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';

export const LogsRoutes: Routes = [
  {
    path: 'logs',
    children: [
      {
        path: '',
        component: LogsComponent,
      },
    ],
  },
];
