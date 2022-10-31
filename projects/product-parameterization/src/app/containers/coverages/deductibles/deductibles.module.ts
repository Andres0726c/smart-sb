import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeductiblesComponent } from './deductibles.component';
import { AngularMaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [DeductiblesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports:[DeductiblesComponent]
})
export class DeductiblesModule { }
