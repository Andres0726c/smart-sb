import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewPolicyDataComponent } from './preview-policy-data.component';
import { Route, RouterModule } from '@angular/router';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
      path     : '',
      component: PreviewPolicyDataComponent
  }
]

@NgModule({
  declarations: [
    PreviewPolicyDataComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ComplementaryDataModule
  ],
  exports: [
    PreviewPolicyDataComponent
  ]
})
export class PreviewPolicyDataModule { }
