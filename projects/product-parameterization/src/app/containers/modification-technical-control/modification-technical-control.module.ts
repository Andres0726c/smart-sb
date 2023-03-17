import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TechnicalControlComponent } from '../technical-control/technical-control.component';
import { TechnicalControlShModule } from '../../shared/technical-control-sh/technical-control-sh.module';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTechnicalControlComponent
  }
]


@NgModule({
  declarations: [
    ModificationTechnicalControlComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    TechnicalControlShModule
  ]
})
export class ModificationTechnicalControlModule { }
