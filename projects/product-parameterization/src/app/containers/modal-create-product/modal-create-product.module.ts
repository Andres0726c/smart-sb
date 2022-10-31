import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCreateProductComponent } from './modal-create-product.component';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ModalCreateProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    ModalCreateProductComponent
  ]
})
export class ModalCreateProductModule { }
