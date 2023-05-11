import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataScreenComponent } from './no-data-screen.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    NoDataScreenComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    NoDataScreenComponent
  ]
})
export class NoDataScreenModule { }
