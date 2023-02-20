import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTypesComponent } from './modification-types.component';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTypesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class ModificationTypesModule { }
