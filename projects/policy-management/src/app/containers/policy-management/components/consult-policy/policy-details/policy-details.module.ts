import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDetailsComponent } from './policy-details.component';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    PolicyDetailsComponent
  ],
  imports: [
    CommonModule,
    DividerModule,
    InputNumberModule,
    InputTextModule
  ],
  exports: []
})
export class PolicyDetailsModule { }
