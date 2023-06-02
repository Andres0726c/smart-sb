import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFieldsManagementComponent } from './data-fields-management.component';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonsLibModule, ModalDeleteModule } from 'commons-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { RulesWizardModule } from '../rules-wizard/rules-wizard.module';
import { MenuModule } from 'primeng/menu';
import { SlideMenuModule } from 'primeng/slidemenu';
import { NoDataScreenModule } from '../no-data-screen/no-data-screen.module';
import { ModalSearchModule } from '../modal-search/modal-search.module';

@NgModule({
  declarations: [
    DataFieldsManagementComponent
  ],
  imports: [
    CommonModule,
    CommonsLibModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DragDropModule,
    ChipsModule,
    InputSwitchModule,
    DynamicDialogModule,
    DialogModule,
    RulesWizardModule,
    MenuModule,
    SlideMenuModule,
    InputTextModule,
    NoDataScreenModule,
    ModalDeleteModule,
    ModalSearchModule
  ],
  exports: [
    DataFieldsManagementComponent
  ],
  providers: [
    DialogService
  ]
})
export class DataFieldsManagementModule { }
