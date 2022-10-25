import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAlertModule } from './modal-alert/modal-alert.module';
/*import { ToastMessageModule } from './toast-message/toast-message.module';
import { ModalConfirmDeleteModule } from './modal-confirm-delete/modal-confirm-delete.module';
import { NoDataScreenModule } from './no-data-screen/no-data-screen.module';*/

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalAlertModule,
    /*ToastMessageModule,
    ModalConfirmDeleteModule,
    NoDataScreenModule*/
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ModalAlertModule,
    /*ToastMessageModule,
    ModalConfirmDeleteModule,
    NoDataScreenModule*/
  ]
})
export class SharedModule { }
