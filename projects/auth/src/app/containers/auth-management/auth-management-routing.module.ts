import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthManagementComponent } from './auth-management.component';

const routes: Routes = [
  {
    path: '',
    component: AuthManagementComponent,
    children: [
      {
        path: 'administrar-roles',
        loadChildren: () =>
          import(
            './components/role-administration/role-administration.module'
          ).then((m) => m.RoleAdministrationModule)
      },
      /*{
        path: 'admin',
        loadChildren: () =>
          import(
            '../../components/login/login.module'
          ).then((m) => m.LoginModule)
      },*/
      {
        path: '**',
        redirectTo: 'administrar-roles',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthManagementRoutingModule { }
