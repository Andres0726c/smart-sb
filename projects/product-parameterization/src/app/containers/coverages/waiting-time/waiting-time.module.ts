import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingTimeComponent } from './waiting-time.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../material.module';

@NgModule({
  declarations: [
    WaitingTimeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [ WaitingTimeComponent]
})
export class WaitingTimeModule { }
