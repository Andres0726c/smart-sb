import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialParametersComponent } from './initial-parameters.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';

const routes: Route[] = [
  {
      path     : '',
      component: InitialParametersComponent
  }
]

@NgModule({
  declarations: [InitialParametersComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    NgxCurrencyModule,
    ModalSearchSmallModule
  ],
  exports: [
    InitialParametersComponent
  ]
})
export class InitialParametersModule { }
