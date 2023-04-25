import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthManagementComponent } from './auth-management.component';
import { AuthManagementRoutingModule } from './auth-management-routing.module';



@NgModule({
  declarations: [
    AuthManagementComponent
  ],
  imports: [
    CommonModule,
    AuthManagementRoutingModule
  ]
})
export class AuthManagementModule { }
