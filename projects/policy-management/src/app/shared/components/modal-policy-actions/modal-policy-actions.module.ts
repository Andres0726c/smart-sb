import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPolicyActionsComponent } from './modal-policy-actions.component';
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DividerModule } from "primeng/divider";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [ModalPolicyActionsComponent],
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
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    ConfirmDialogModule
  ]
})
export class ModalPolicyActionsModule {}
