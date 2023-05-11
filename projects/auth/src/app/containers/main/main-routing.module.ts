import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard, LoginGuard } from 'commons-lib';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import(
            '../../components/login/login.module'
          ).then((m) => m.LoginModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import(
            '../auth-management/auth-management.module'
          ).then((m) => m.AuthManagementModule),
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
