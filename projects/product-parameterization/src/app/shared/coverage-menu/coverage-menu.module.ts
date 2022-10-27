import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageMenuComponent } from './coverage-menu.component';
import { SharedModule } from '../shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../modal-search-small/modal-search-small.module';

@NgModule({
  declarations: [
    CoverageMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule
  ],
  exports: [
    CoverageMenuComponent
  ]
})
export class CoverageMenuModule { }
