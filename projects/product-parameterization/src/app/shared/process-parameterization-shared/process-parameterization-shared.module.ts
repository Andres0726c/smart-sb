import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessParameterizationSharedComponent } from './process-parameterization-shared.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [ProcessParameterizationSharedComponent],
  imports: [CommonModule, TableModule, CheckboxModule, MultiSelectModule,ChipsModule,ButtonModule ],
  exports: [ProcessParameterizationSharedComponent],
})
export class ProcessParameterizationSharedModule {}
