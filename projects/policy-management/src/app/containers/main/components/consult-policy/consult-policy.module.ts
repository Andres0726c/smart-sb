import { ConsultPolicyComponent } from './consult-policy.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FilterPolicyTopComponent } from './filter-policy-top/filter-policy-top.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ModalPolicyActionsModule } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/modal-policy-actions.module';
import { ModalRenewalModule } from './modal-renewal/modal-renewal.module';
import { PolicyDetailsModule } from './policy-details/policy-details.module';

const routes: Routes = [
  {
    path: '',
    component: ConsultPolicyComponent,
  },
];

@NgModule({
  declarations: [
    ConsultPolicyComponent,
    FilterPolicyTopComponent,
  ],
  imports: [
    TagModule,
    PanelModule,
    ChipModule,
    ChipsModule,
    CardModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    SidebarModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    CalendarModule,
    FieldsetModule,
    DividerModule,
    TableModule,
    OverlayPanelModule,
    MenuModule,
    DialogModule,
    FormsModule,
    PaginatorModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ModalPolicyActionsModule,
    ModalRenewalModule,
    PolicyDetailsModule
  ],
  exports: [ConsultPolicyComponent],
})
export class ConsultPolicyModule {}
