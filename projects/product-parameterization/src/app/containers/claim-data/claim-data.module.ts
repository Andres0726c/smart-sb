import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimDataComponent } from './claim-data.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ComplementaryDataModule } from '../../shared/complementary-data/complementary-data.module';

const routes: Route[] = [
  {
      path     : '',
      component: ClaimDataComponent
  }
]

@NgModule({
  declarations: [
    ClaimDataComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    ComplementaryDataModule
  ],
  exports: [
    ClaimDataComponent
  ]
})
export class ClaimDataModule { }
