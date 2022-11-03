import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataScreenComponent } from './no-data-screen.component';
import { AngularMaterialModule } from '../../material.module';



@NgModule({
  declarations: [NoDataScreenComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    NoDataScreenComponent
  ]
})
export class NoDataScreenModule { }
