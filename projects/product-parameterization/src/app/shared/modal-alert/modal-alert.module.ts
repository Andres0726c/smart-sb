import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAlertComponent } from './modal-alert.component';
import { AngularMaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    ModalAlertComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ModalAlertComponent
  ]
})
export class ModalAlertModule { }
