import { PolicyManagementRoutingModule } from './policy-management.routing';
import { ConsultPolicyModule } from './components/consult-policy/consult-policy.module';
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
