import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoveragesRatesComponent } from './coverages-rates.component';
import { SharedModule } from '../../../shared/shared.module';
import { AngularMaterialModule } from '../../../material.module';

@NgModule({
  declarations: [CoveragesRatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    CoveragesRatesComponent
  ]
})
export class CoveragesRatesModule { }
