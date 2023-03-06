import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncPolicyFailedComponent } from './sync-policy-failed.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FilterPolicyFailedTopComponent } from './filter-policy-failed-top/filter-policy-failed-top.component';
import { PolicyFailedDetailsModule } from './policy-failed-details/policy-failed-details.module';

const routes: Routes = [
  {
    path: '',
    component: SyncPolicyFailedComponent,
  },
];

@NgModule({
  declarations: [
    SyncPolicyFailedComponent,
    FilterPolicyFailedTopComponent
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
    PolicyFailedDetailsModule
  ]
})
export class SyncPolicyFailedModule { }
