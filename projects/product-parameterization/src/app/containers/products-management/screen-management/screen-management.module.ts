import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenManagementComponent } from './screen-management.component';
import { RouterModule } from '@angular/router';
//import { HeaderModule } from 'src/app/components/header/header.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { screenManagementRoutes } from './screen-management.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidenavPropertyProductModule } from '../../../components/sidenav-property-product/sidenav-property-product.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    ScreenManagementComponent
  ],
  imports: [
    RouterModule.forChild(screenManagementRoutes),
    CommonModule,
    SharedModule,
    //HeaderModule,
    SidenavPropertyProductModule,
    MatSnackBarModule,
    NgxCurrencyModule
  ],
  exports: [
    ScreenManagementComponent
  ]
})
export class ScreenManagementModule { }
