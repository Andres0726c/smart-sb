import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyRenewalComponent } from './policy-renewal.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {TabViewModule} from 'primeng/tabview';

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
    InputTextModule,
    TabViewModule
  ]
})
export class PolicyRenewalModule { }
