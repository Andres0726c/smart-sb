import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialPlanComponentWizard } from './commercial-plan-wizard.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularMaterialModule } from '../../../material.module';

@NgModule({
  declarations: [
    CommercialPlanComponentWizard
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    CommercialPlanComponentWizard
  ]
})
export class CommercialPlanWizardModule { }
