import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewDataPolicyComponent } from './preview-data-policy.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { RulesWizardModule } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.module';

import { ComplementaryDataModule } from 'projects/product-parameterization/src/app/shared/complementary-data/complementary-data.module';
import { SharedModule } from 'projects/product-parameterization/src/app/shared/shared.module';


const routes: Route[] = [
  {
      path     : '',
      component: PreviewDataPolicyComponent
  }
];

@NgModule({
  declarations: [
    PreviewDataPolicyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ChipsModule,
    MessageModule,
    RulesWizardModule,
    DropdownModule,
    CheckboxModule,
    MultiSelectModule,
    ComplementaryDataModule,
    SharedModule
  ]
})
export class PreviewDataPolicyModule { }
