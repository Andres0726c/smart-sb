import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenewalDataComponent } from './renewal-data.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RulesWizardModule } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.module';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';

const routes: Route[] = [
  {
      path     : '',
      component: RenewalDataComponent
  }
];

@NgModule({
  declarations: [
    RenewalDataComponent
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
    MultiSelectModule
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class RenewalDataModule { }
