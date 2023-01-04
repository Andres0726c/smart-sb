import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalControlComponent } from './technical-control.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TechnicalControlShModule } from '../../shared/technical-control-sh/technical-control-sh.module';

const routes: Route[] = [
  {
    path     : '',
    component: TechnicalControlComponent
  }
]

@NgModule({
  declarations: [
    TechnicalControlComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,  
    TechnicalControlShModule
  ],
  exports: [
    TechnicalControlComponent
  ]
})
export class TechnicalControlModule { }
