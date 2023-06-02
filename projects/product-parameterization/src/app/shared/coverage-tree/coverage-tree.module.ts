import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageTreeComponent } from './coverage-tree.component';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ModalDeleteModule } from 'commons-lib';

@NgModule({
  declarations: [
    CoverageTreeComponent
  ],
  imports: [
    CommonModule, 
    TreeModule, 
    ButtonModule, 
    ModalDeleteModule,
    BadgeModule
  ],
  exports: [
    CoverageTreeComponent
  ],
})
export class CoverageTreeModule {}
