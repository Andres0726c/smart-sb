import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ModificationTypesComponent } from './modification-types.component';
import { ModificationTypesRiskComponent } from './modification-types-risk/modification-types-risk.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CheckboxModule} from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommercialPlanTypeComponent } from './modification-types-risk/commercial-plan-type/commercial-plan-type.component';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTypesComponent
  }
];

@NgModule({
  declarations: [ModificationTypesComponent,ModificationTypesRiskComponent, CommercialPlanTypeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PanelMenuModule,
    DynamicDialogModule,
    BreadcrumbModule,
    CheckboxModule,
    TableModule,
    FormsModule
  ]
})
export class ModificationTypesModule { }
