import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTypesComponent } from './modification-types.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { NoDataScreenModule } from '../../shared/no-data-screen/no-data-screen.module';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTypesComponent
  }
]

@NgModule({
  declarations: [
    ModificationTypesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    NoDataScreenModule,
    ComplementaryDataModule
  ]
})
export class ModificationTypesModule { }
