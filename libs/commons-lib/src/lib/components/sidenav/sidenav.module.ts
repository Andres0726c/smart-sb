import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    PanelMenuModule,
    ButtonModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
