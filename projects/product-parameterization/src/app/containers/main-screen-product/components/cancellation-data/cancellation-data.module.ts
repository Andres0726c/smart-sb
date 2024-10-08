import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancellationDataComponent } from './cancellation-data.component';
import { Route, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { RulesWizardModule } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonsLibModule } from 'commons-lib';

const routes: Route[] = [
  {
    path: '',
    component: CancellationDataComponent,
  },
];

@NgModule({
  declarations: [CancellationDataComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CardModule,
    CheckboxModule,
    MultiSelectModule,
    ChipsModule,
    ButtonModule,
    RulesWizardModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CommonsLibModule
  ],
  exports: [CancellationDataComponent],
  providers: [DialogService],
})
export class CancellationDataModule {}
