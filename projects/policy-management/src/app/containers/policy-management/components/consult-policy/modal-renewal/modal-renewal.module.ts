import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ModalRenewalComponent } from './modal-renewal.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext'

@NgModule({
  declarations: [ModalRenewalComponent],
  imports: [
    CommonModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule
  ],
})
export class ModalRenewalModule {}
