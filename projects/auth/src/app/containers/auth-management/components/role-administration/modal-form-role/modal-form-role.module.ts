import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormRoleComponent } from './modal-form-role.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ModalFormRoleComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ]
})
export class ModalFormRoleModule { }
