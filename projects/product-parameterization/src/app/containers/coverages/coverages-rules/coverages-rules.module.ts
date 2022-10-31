import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoveragesRulesComponent } from './coverages-rules.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularMaterialModule } from '../../../material.module';

@NgModule({
  declarations: [CoveragesRulesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    CoveragesRulesComponent
  ]
})
export class CoveragesRulesModule { }
