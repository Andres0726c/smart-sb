import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEditProductComponent } from './modal-edit-product.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    ModalEditProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    NgxCurrencyModule,
  ],
  exports: [
    ModalEditProductComponent
  ]
})
export class ModalEditProductModule { }
