import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthManagementComponent } from './auth-management.component';
import { AuthManagementRoutingModule } from './auth-management-routing.module';
import { HeaderModule } from 'commons-lib';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AuthManagementComponent
  ],
  imports: [
    CommonModule,
    AuthManagementRoutingModule,
    HeaderModule,
    PanelMenuModule,
    ButtonModule
  ]
})
export class AuthManagementModule { }
