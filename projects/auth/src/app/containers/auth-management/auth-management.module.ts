import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthManagementComponent } from './auth-management.component';
import { AuthManagementRoutingModule } from './auth-management-routing.module';
import { HeaderModule } from 'commons-lib';
import { SidenavModule } from 'commons-lib';

@NgModule({
  declarations: [
    AuthManagementComponent
  ],
  imports: [
    CommonModule,
    AuthManagementRoutingModule,
    HeaderModule,
    SidenavModule
  ]
})
export class AuthManagementModule { }
