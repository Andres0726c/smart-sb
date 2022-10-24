import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*import { ToastMessageModule } from './toast-message/toast-message.module';
import { ModalConfirmDeleteModule } from './modal-confirm-delete/modal-confirm-delete.module';
import { ModalAlertModule } from './modal-alert/modal-alert.module';
import { NoDataScreenModule } from './no-data-screen/no-data-screen.module';*/

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /*ToastMessageModule,
    ModalConfirmDeleteModule,
    ModalAlertModule,
    NoDataScreenModule*/
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    /*ToastMessageModule,
    ModalConfirmDeleteModule,
    ModalAlertModule,
    NoDataScreenModule*/
  ]
})
export class SharedModule { }
