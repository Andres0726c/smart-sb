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
    // BrowserModule,
    // BrowserAnimationsModule,
    MessageModule,
    MenuModule,
    TabMenuModule,
    TabViewModule,
    InputTextModule,
    ProgressSpinnerModule
  ]
})
export class ModifyPolicyModule { }
