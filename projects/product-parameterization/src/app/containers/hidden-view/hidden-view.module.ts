import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiddenViewComponent } from './hidden-view.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


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
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    HiddenViewComponent
  ]
})
export class HiddenViewModule { }
