import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenProductComponent } from './main-screen-product.component';
import { Route, RouterModule } from '@angular/router';
/*import { ModalCreateProductModule } from '../modal-create-product/modal-create-product.module';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ToastMessageModule } from 'src/app/shared/toast-message/toast-message.module';*/
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ModalEditProductModule } from '../modal-edit-product/modal-edit-product.module';
//import { ModalCompanyModule } from '../modal-company/modal-company.module';
import { AngularMaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { ModalAlertModule } from '../../shared/modal-alert/modal-alert.module';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditProductModule } from '../modal-edit-product/modal-edit-product.module';
import { ModalCreateProductModule } from '../modal-create-product/modal-create-product.module';

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
    //HeaderModule,
    ModalCreateProductModule,
    ModalEditProductModule,
    //ToastMessageModule,
    SharedModule,
    //ModalCompanyModule
  ],
  providers:[
   MatSnackBar
  ],
  exports: [
    MainScreenProductComponent
  ]
})
export class MainScreenProductModule { }
