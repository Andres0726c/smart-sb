import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesWizardComponent } from './rules-wizard.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared.module';
import { StepsModule } from 'primeng/steps';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RulesWizardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SharedModule,
    TableModule,
    ButtonModule,
    PaginatorModule,
    StepsModule
  ]
})
export class RulesWizardModule { }
