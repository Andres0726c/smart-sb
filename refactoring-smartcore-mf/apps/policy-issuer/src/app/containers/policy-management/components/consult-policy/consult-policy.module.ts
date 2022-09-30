import { ConsultPolicyComponent } from './consult-policy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FilterPolicyComponent } from './filter-policy/filter-policy.component';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {FieldsetModule} from 'primeng/fieldset';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import { FilterPolicyTopComponent } from './filter-policy-top/filter-policy-top.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { MaterialExampleModule, PrimengExampleModule } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';
import { SliderModule } from 'primeng/slider';

const routes: Routes = [
  {
      path     : '',
      component: ConsultPolicyComponent
  }
]

@NgModule({
  declarations: [ConsultPolicyComponent, FilterPolicyComponent, FilterPolicyTopComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    CalendarModule,
    FieldsetModule,
    DividerModule,
    TableModule,
    OverlayPanelModule,
    MenuModule,
    DialogModule,
    MaterialExampleModule,
    PrimengExampleModule
  ],
  exports:[
    ConsultPolicyComponent
  ]
})
export class ConsultPolicyModule { }
