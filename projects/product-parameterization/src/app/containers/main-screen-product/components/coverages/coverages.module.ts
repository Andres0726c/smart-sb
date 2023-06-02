import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoveragesComponent } from './coverages.component';
import { Route, RouterModule } from '@angular/router';
import { CoverageTreeModule } from 'projects/product-parameterization/src/app/shared/coverage-tree/coverage-tree.module';
import { TabViewModule } from 'primeng/tabview';
import { WaitingTimeModule } from './waiting-time/waiting-time.module';
import { DeductiblesModule } from './deductibles/deductibles.module';
import { NoDataScreenModule } from 'projects/product-parameterization/src/app/shared/no-data-screen/no-data-screen.module';
import { ClausesSharedModule } from 'projects/product-parameterization/src/app/shared/clauses-shared/clauses-shared.module';
import { BusinessRulesModule } from './business-rules/business-rules.module';
import { RatesModule } from './rates/rates.module';
import { DataFieldsManagementModule } from 'projects/product-parameterization/src/app/shared/data-fields-management/data-fields-management.module';

const routes: Route[] = [
  {
    path     : '',
    component: CoveragesComponent
  }
]

@NgModule({
  declarations: [
    CoveragesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoverageTreeModule,
    TabViewModule,
    WaitingTimeModule,
    DeductiblesModule,
    NoDataScreenModule,
    ClausesSharedModule,
    BusinessRulesModule,
    RatesModule,
    DataFieldsManagementModule
  ],
  exports: [
    CoveragesComponent
  ]
})
export class CoveragesModule { }
