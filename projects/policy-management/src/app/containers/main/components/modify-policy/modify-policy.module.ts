import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyPolicyComponent } from './modify-policy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ModifyTabsDataComponent } from './modify-tabs-data/modify-tabs-data.component';
import { ModifyDataComponent } from './modify-data/modify-data.component';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveGroupFieldsModule } from 'projects/policy-management/src/app/shared/components/reactive-group-fields/reactive-group-fields.module';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { ModalResponseRulesModule } from 'projects/policy-management/src/app/shared/components/modal-response-rules/modal-response-rules.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonsLibModule } from 'commons-lib';


const routes: Routes = [
  {
    path: '',
    component: ModifyPolicyComponent,
  },
];
@NgModule({
  declarations: [
    ModifyPolicyComponent,
    ModifyTabsDataComponent,
    ModifyDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FieldsetModule,
    InputTextModule,
    CardModule,
    DividerModule,
    InputMaskModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonsLibModule,
    MessageModule,
    MenuModule,
    TabMenuModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule,
    CalendarModule,
    ReactiveGroupFieldsModule,
    AccordionModule,
    ModalResponseRulesModule,
    ConfirmDialogModule,
    DialogModule,
  ]
})
export class ModifyPolicyModule { }
