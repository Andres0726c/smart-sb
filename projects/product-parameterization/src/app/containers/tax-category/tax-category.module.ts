import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TaxCategoryComponent } from './tax-category.component';
import { SharedModule } from '../../shared/shared.module';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';

const routes: Route[] = [
  {
      path     : '',
      component: TaxCategoryComponent
  }
]

@NgModule({
  declarations: [
    TaxCategoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule
  ]
})
export class TaxCategoryModule { }
