import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatesComponent } from './rates.component';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RatesComponent
  ],
  imports: [
    CommonModule,
    ChipsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RatesComponent
  ]
})
export class RatesModule { }
