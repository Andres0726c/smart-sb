import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancellationDataComponent } from './cancellation-data.component';
import { Route, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

const routes: Route[] = [
  {
      path     : '',
      component: CancellationDataComponent
  }
]

@NgModule({
  declarations: [CancellationDataComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardModule,
    TableModule
  ],
  exports: [CancellationDataComponent]
})
export class CancellationDataModule { }
