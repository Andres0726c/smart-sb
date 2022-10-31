import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDataComponent } from './policy-data.component';
import { Route, RouterModule } from '@angular/router';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
      path     : '',
      component: PolicyDataComponent
  }
]

@NgModule({
  declarations: [
    PolicyDataComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ComplementaryDataModule
  ],
  exports: [
    PolicyDataComponent
  ]
})
export class PolicyDataModule { }
