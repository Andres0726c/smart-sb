import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ReactiveGroupFieldsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule
  ],
  exports: [
    ReactiveGroupFieldsComponent
  ]
})
export class ReactiveGroupFieldsModule { }
