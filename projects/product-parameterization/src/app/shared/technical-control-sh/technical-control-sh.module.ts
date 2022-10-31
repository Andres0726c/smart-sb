import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalControlShComponent } from './technical-control-sh.component';
import { SharedModule } from '../shared.module';
import { ToastMessageModule } from '../toast-message/toast-message.module';
import { ModalConfirmDeleteModule } from '../modal-confirm-delete/modal-confirm-delete.module';
import { ModalSearchSmallModule } from '../modal-search-small/modal-search-small.module';
import { AngularMaterialModule } from '../../material.module';
import { MultiSelectModule } from '../multi-select/multi-select.module';

@NgModule({
  declarations: [
    TechnicalControlShComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule,
    ToastMessageModule,
    ModalConfirmDeleteModule,
    MultiSelectModule
  ],
  exports: [
    TechnicalControlShComponent
  ]
})
export class TechnicalControlShModule { }
