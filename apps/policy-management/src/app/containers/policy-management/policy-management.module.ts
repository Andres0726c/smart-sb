import { PolicyManagementRoutingModule } from './policy-management.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyManagementComponent } from './policy-management.component';



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
