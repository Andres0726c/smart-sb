import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAdministrationComponent } from './role-administration.component';
import { Route, RouterModule } from '@angular/router';

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
    CommonModule
  ]
})
export class RoleAdministrationModule { }
