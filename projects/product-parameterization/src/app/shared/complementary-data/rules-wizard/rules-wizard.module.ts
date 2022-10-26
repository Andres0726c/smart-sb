import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesWizardComponent } from "./rules-wizard";
import { SharedModule } from '../../shared.module';
import { AngularMaterialModule } from '../../../material.module';



@NgModule({
  declarations: [
    RulesWizardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    RulesWizardComponent
  ]
})
export class RulesWizardModule { }
