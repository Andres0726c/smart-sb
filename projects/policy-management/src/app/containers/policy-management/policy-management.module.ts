import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyManagementComponent } from './policy-management.component';
import { PolicyManagementRoutingModule } from './policy-management-routing.module';



@NgModule({
  declarations: [
    PolicyManagementComponent
  ],
  imports: [
    PolicyManagementRoutingModule,
    CommonModule
  ],
})
export class PolicyManagementModule { }
