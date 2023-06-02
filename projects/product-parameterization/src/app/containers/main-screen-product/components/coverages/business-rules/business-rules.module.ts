import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRulesComponent } from './business-rules.component';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BusinessRulesComponent
  ],
  imports: [
    CommonModule,
    ChipsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BusinessRulesComponent
  ]
})
export class BusinessRulesModule { }
