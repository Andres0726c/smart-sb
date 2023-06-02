import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingTimeComponent } from './waiting-time.component';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WaitingTimeComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    WaitingTimeComponent
  ]
})
export class WaitingTimeModule { }
