import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeductiblesComponent } from './deductibles.component';
import { NoDataScreenModule } from '../../../../../shared/no-data-screen/no-data-screen.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalSearchModule } from '../../../../../shared/modal-search/modal-search.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModalDeleteModule } from 'libs/commons-lib/src/lib/components/modal-delete/modal-delete.module';

@NgModule({
  declarations: [DeductiblesComponent],
  exports: [DeductiblesComponent],
  imports: [
    CommonModule,
    NoDataScreenModule,
    ReactiveFormsModule,
    FormsModule,
    DynamicDialogModule,
    ModalSearchModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ModalDeleteModule,
  ],
})
export class DeductiblesModule {}
