import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoveragesComponent } from './coverages.component';
import { Route, RouterModule } from '@angular/router';
import { CoveragesRulesModule } from './coverages-rules/coverages-rules.module';
import { CoveragesRatesModule } from './coverages-rates/coverages-rates.module';
import { DeductiblesModule } from './deductibles/deductibles.module';
import { WaitingTimeModule } from './waiting-time/waiting-time.module';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';
import { ClausesModule } from '../../shared/clauses/clauses.module';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { CoverageMenuModule } from '../../shared/coverage-menu/coverage-menu.module';

const routes: Route[] = [
  {
      path     : '',
      component: CoveragesComponent
  }
]

@NgModule({
  declarations: [CoveragesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule,
    ClausesModule,
    ComplementaryDataModule,
    CoveragesRulesModule,
    CoveragesRatesModule,
    DeductiblesModule,
    CoverageMenuModule,
    WaitingTimeModule
  ],
  exports: [
    CoveragesComponent
  ]
})
export class CoveragesModule { }
