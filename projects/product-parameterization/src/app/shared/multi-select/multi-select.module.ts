import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../modal-search-small/modal-search-small.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    MultiSelectComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    NgxCurrencyModule,
    ModalSearchSmallModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MultiSelectComponent
  ]
})
export class MultiSelectModule { }


