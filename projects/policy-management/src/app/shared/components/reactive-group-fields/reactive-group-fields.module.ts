import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ModalResponseRulesModule } from '../modal-response-rules/modal-response-rules.module';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ReactiveGroupFieldsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    ModalResponseRulesModule,
    // MessageModule,
    // DialogModule,
    TooltipModule
  ],
  exports: [
    ReactiveGroupFieldsComponent
  ]
})
export class ReactiveGroupFieldsModule { }
