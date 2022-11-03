import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { AngularMaterialModule } from '../../../material.module';
import { ModalSearchSmallModule } from '../../../shared/modal-search-small/modal-search-small.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule
  ]
})
export class ModalAutomaticReservationModule { }
