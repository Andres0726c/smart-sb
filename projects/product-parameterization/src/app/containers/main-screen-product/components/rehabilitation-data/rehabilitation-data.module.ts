import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehabilitationDataComponent } from './rehabilitation-data.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
      path     : '',
      component: RehabilitationDataComponent
  }
]

@NgModule({
  declarations: [ RehabilitationDataComponent ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RehabilitationDataComponent]
})
export class RehabilitationDataModule { }
