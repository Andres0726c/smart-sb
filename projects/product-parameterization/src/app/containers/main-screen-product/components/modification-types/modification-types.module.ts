import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTypesComponent } from './modification-types.component';
import { SharedModule } from 'primeng/api';
import { ComplementaryDataModule } from 'projects/product-parameterization/src/app/shared/complementary-data/complementary-data.module';
import { ModalSearchSmallModule } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.module';
import { NoDataScreenModule } from 'projects/product-parameterization/src/app/shared/no-data-screen/no-data-screen.module';
import {TreeModule} from 'primeng/tree';
import {ToastModule} from 'primeng/toast';
import { FormsModule } from '@angular/forms';
const routes: Route[] = [
  {
      path     : '',
      component: ModificationTypesComponent
  }
];

@NgModule({
  declarations: [ModificationTypesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComplementaryDataModule,
    SharedModule,
    ModalSearchSmallModule,
    NoDataScreenModule,
    FormsModule,
    TreeModule,
    ToastModule
  ]
})
export class ModificationTypesModule { }
