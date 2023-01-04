import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSessionRestartComponent } from './modal-session-restart.component';
import { SharedModule } from '../shared.module';
import { AngularMaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    ModalSessionRestartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    ModalSessionRestartComponent
  ]
})
export class ModalSessionRestartModule { }
