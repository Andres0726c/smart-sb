import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../material.module';

@NgModule({
  declarations: [SidenavPropertyProductComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  exports: [
    SidenavPropertyProductComponent
  ]
})
export class SidenavPropertyProductModule { }
