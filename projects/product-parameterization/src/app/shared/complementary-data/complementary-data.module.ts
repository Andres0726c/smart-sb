import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplementaryDataComponent } from './complementary-data.component';
import { SharedModule } from '../shared.module';
import { RulesWizardModule } from "./rules-wizard/rules-wizard.module";
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../modal-search-small/modal-search-small.module';

@NgModule({
  declarations: [
    ComplementaryDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule,
    RulesWizardModule
  ],
  exports: [
    ComplementaryDataComponent
  ]
})
export class ComplementaryDataModule { }
