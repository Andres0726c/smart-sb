import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicePlansComponent } from './service-plans.component';
import { Route, RouterModule } from '@angular/router';
import { ClausesModule } from '../../shared/clauses/clauses.module';
import { AngularMaterialModule } from '../../material.module';
import { ModalSearchSmallModule } from '../../shared/modal-search-small/modal-search-small.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
      path     : '',
      component: ServicePlansComponent
  }
]

@NgModule({
  declarations: [
    ServicePlansComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    ModalSearchSmallModule,
    ClausesModule
  ],
  exports:[
    ServicePlansComponent
  ]
})
export class ServicePlansModule { }
