import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialPlanComponent } from './commercial-plan.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularMaterialModule } from '../../../material.module';

@NgModule({
  declarations: [CommercialPlanComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports:[CommercialPlanComponent]
})
export class CommercialPlanModule { }