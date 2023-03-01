import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTechnicalControlComponent
  }
]


@NgModule({
  declarations: [
    ModificationTechnicalControlComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ModificationTechnicalControlModule { }
