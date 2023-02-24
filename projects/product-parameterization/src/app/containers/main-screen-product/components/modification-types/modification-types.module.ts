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
import { ModificationTypesRiskComponent } from './modification-types-risk/modification-types-risk.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CheckboxModule} from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { CommercialPlanTypeComponent } from './modification-types-risk/commercial-plan-type/commercial-plan-type.component';
import { TabViewModule } from 'primeng/tabview';

const routes: Route[] = [
  {
      path     : '',
      component: ModificationTypesComponent
  }
];

@NgModule({
  declarations: [ModificationTypesComponent,CommercialPlanTypeComponent,ModificationTypesRiskComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ComplementaryDataModule,
    SharedModule,
    ModalSearchSmallModule,
    NoDataScreenModule,
    FormsModule,
    TreeModule,
    ToastModule,
    PanelMenuModule,
    DynamicDialogModule,
    BreadcrumbModule,
    CheckboxModule,
    TableModule,
    FormsModule,
    TabViewModule,

  ]
})
export class ModificationTypesModule { }
