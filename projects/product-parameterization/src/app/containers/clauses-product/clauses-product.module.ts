import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClausesProductComponent } from './clauses-product.component';
import { Route, RouterModule } from '@angular/router';
import { ClausesModule } from '../../shared/clauses/clauses.module';

const routes: Route[] = [
  {
      path     : '',
      component: ClausesProductComponent
  }
]

@NgModule({
  declarations: [ClausesProductComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ClausesModule
  ],
  exports: [
    ClausesProductComponent
  ]
})
export class ClausesProductModule { }
