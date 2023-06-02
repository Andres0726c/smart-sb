import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDataComponent } from './policy-data.component';
import { Route, RouterModule } from '@angular/router';
import { DataFieldsManagementModule } from 'projects/product-parameterization/src/app/shared/data-fields-management/data-fields-management.module';

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
    DataFieldsManagementModule
  ]
})
export class PolicyDataModule { }
