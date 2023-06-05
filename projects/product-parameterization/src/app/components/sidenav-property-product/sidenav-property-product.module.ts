import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidenavPropertyProductComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SidenavPropertyProductComponent
  ]
})
export class SidenavPropertyProductModule { }
