import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiddenViewComponent } from './hidden-view.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
    path     : '',
    component: HiddenViewComponent
  }
]

@NgModule({
  declarations: [
    HiddenViewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  exports: [
    HiddenViewComponent
  ]
})
export class HiddenViewModule { }
