import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenProductComponent } from './main-screen-product.component';
import { Route, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalEditProductModule } from '../modal-edit-product/modal-edit-product.module';
import { ModalCreateProductModule } from '../modal-create-product/modal-create-product.module';
import { HeaderModule } from '../../components/header/header.module';
import { ToastMessageModule } from '../../shared/toast-message/toast-message.module';

const routes: Route[] = [
  {
      path     : '',
      component: MainScreenProductComponent
  }
];

@NgModule({
  declarations: [MainScreenProductComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AngularMaterialModule,
    HeaderModule,
    ModalCreateProductModule,
    ModalEditProductModule,
    ToastMessageModule,
    SharedModule
  ],
  providers:[
   MatSnackBar
  ],
  exports: [
    MainScreenProductComponent
  ]
})
export class MainScreenProductModule { }
