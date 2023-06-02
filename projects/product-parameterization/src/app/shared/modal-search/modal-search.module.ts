import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSearchComponent } from './modal-search.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedModule } from '../shared.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  declarations: [ModalSearchComponent],
  imports: [
    CommonModule,
    InputTextModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule
  ],
  exports: [ModalSearchComponent],
})
export class ModalSearchModule {}
