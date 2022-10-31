
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimReservationConceptComponent } from './claim-reservation-concept.component';
import { Route, RouterModule } from '@angular/router';
import { ModalAutomaticReservationComponent } from './modal-automatic-reservation/modal-automatic-reservation.component';
import { CoverageMenuModule } from '../../shared/coverage-menu/coverage-menu.module';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';
import { MultiSelectModule } from '../../shared/multi-select/multi-select.module';

const routes: Route[] = [
  {
      path     : '',
      component: ClaimReservationConceptComponent
  }
]

@NgModule({
  declarations: [
    ClaimReservationConceptComponent,
    ModalAutomaticReservationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule,
    MultiSelectModule,
    CoverageMenuModule
  ]
})
export class ClaimReservationConceptModule { }
