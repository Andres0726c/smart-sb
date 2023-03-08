import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehabilitationDataComponent } from './rehabilitation-data.component';
import { Route, RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { RulesWizardModule } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

const routes: Route[] = [
  {
    path: '',
    component: RehabilitationDataComponent,
  },
];

@NgModule({
  declarations: [RehabilitationDataComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CheckboxModule,
    MultiSelectModule,
    ChipsModule,
    ButtonModule,
    RulesWizardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RehabilitationDataComponent],
  providers: [DialogService],
})
export class RehabilitationDataModule {}
