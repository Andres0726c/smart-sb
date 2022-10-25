import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSearchSmallComponent } from './modal-search-small.component';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    ModalSearchSmallComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule
  ],
  exports: [
    ModalSearchSmallComponent
  ]
})
export class ModalSearchSmallModule { }
