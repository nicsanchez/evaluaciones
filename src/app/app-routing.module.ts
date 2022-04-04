import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UsersLayoutComponent } from './layouts/users-layout/users-layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: UsersLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path:'',
        loadChildren: () => import('./pages/users/users.module').then(x => x.UsersModule)
      },
      {
        path:'',
        loadChildren: () => import('./pages/evaluations/evaluation.module').then(x => x.EvaluationsModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/my-profile/my-profile.module').then(x => x.MyProfileModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/login/users.module').then(x => x.LoginModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
