import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmDeleteComponent } from './modal-confirm-delete.component';
import { AngularMaterialModule } from '../../material.module';

@NgModule({
  declarations: [ModalConfirmDeleteComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    ModalConfirmDeleteComponent
  ]
})
export class ModalConfirmDeleteModule { }
