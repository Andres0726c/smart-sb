import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskTypesComponent } from './risk-types.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NoDataScreenModule } from '../../shared/no-data-screen/no-data-screen.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { CommercialPlanModule } from './commercial-plan/commercial-plan.module';
import { CommercialPlanWizardModule } from './commercial-plan-wizard/commercial-plan-wizard.module';
import { AngularMaterialModule } from '../../material.module';

const routes: Route[] = [
  {
      path     : '',
      component: RiskTypesComponent
  }
]

@NgModule({
  declarations: [
    RiskTypesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NoDataScreenModule,
    ModalSearchSmallModule,
    AngularMaterialModule,
    ComplementaryDataModule,
    CommercialPlanModule,
    CommercialPlanWizardModule
   
  ],
  exports: [
    RiskTypesComponent
  ]
})
export class RiskTypesModule { }