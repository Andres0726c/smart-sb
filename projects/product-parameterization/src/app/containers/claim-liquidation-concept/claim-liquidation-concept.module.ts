import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimLiquidationConceptComponent } from './claim-liquidation-concept.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';

const routes: Route[] = [
  {
      path     : '',
      component: ClaimLiquidationConceptComponent
  }
]

@NgModule({
  declarations: [
    ClaimLiquidationConceptComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule
  ]
})
export class ClaimLiquidationConceptModule { }
