import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { ClausesComponent } from './clauses.component';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../modal-search-small/modal-search-small.module';

@NgModule({
  declarations: [ClausesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule
  ],
  exports: [
    ClausesComponent
  ]
})
export class ClausesModule { }
