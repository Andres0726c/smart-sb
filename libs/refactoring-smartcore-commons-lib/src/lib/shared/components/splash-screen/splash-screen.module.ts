import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import { AngularMaterialModule } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';

@NgModule({
  declarations: [
    SplashScreenComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    SplashScreenComponent
  ]
})
export class SplashScreenModule { }
