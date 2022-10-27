import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccumulationComponent } from './accumulation.component';
import { Route, RouterModule } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
      path     : '',
      component: AccumulationComponent
  }
]


@NgModule({
  declarations: [AccumulationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    NgxCurrencyModule,
    ModalSearchSmallModule
  ],
  exports: [
    AccumulationComponent
  ]
})
export class AccumulationModule { }
