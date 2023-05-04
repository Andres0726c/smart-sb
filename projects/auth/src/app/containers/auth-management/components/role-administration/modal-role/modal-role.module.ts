import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ModalRoleComponent } from './modal-role.component';

@NgModule({
  declarations: [
    ModalRoleComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ]
})
export class ModalRoleModule { }
