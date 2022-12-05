import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRenewalComponent } from './policy-renewal.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveGroupFieldsModule } from 'projects/policy-management/src/app/shared/components/reactive-group-fields/reactive-group-fields.module';
import { CommonsLibModule } from 'commons-lib';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
  {
    path: '',
    component: PolicyRenewalComponent,
  },
];

@NgModule({
  declarations: [
    PolicyRenewalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonsLibModule,
    InputTextModule,
    TabViewModule,
    ProgressSpinnerModule,
    ReactiveGroupFieldsModule,
    DividerModule
  ]
})
export class PolicyRenewalModule { }
