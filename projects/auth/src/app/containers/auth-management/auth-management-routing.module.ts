import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthManagementComponent } from './auth-management.component';

const routes: Routes = [
  {
    path: '',
    component: AuthManagementComponent,
    /*children: [
      {
        path: 'login',
        loadChildren: () =>
          import(
            '../../components/login/login.module'
          ).then((m) => m.LoginModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import(
            '../../components/login/login.module'
          ).then((m) => m.LoginModule)
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthManagementRoutingModule { }
