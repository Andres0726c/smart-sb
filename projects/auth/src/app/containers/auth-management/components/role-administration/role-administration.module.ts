import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAdministrationComponent } from './role-administration.component';
import { Route, RouterModule } from '@angular/router';
import { NoDataScreenModule } from '../../../../shared/no-data-screen/no-data-screen.module';
import { TableModule } from 'primeng/table';

const routes: Route[] = [
  {
    path: '',
    component: RoleAdministrationComponent
  }
];

@NgModule({
  declarations: [
    RoleAdministrationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NoDataScreenModule,
    TableModule
  ]
})
export class RoleAdministrationModule { }
