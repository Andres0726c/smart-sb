import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClausesSharedComponent } from './clauses-shared.component';
import { NoDataScreenModule } from '../no-data-screen/no-data-screen.module';
import { TableModule } from 'primeng/table';
import { ModalSearchModule } from '../modal-search/modal-search.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [ ClausesSharedComponent],
  imports: [
    CommonModule,
    NoDataScreenModule,
    TableModule,
    ModalSearchModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ScrollPanelModule,
    CardModule
  ],
  exports: [ ClausesSharedComponent ]
})
export class ClausesSharedModule { }
