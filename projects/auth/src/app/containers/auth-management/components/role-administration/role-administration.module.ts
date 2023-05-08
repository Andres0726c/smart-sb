import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleAdministrationComponent } from './role-administration.component';
import { Route, RouterModule } from '@angular/router';
import { NoDataScreenModule } from '../../../../shared/no-data-screen/no-data-screen.module';
import { TableModule } from 'primeng/table';
import { ModalRoleModule } from './modal-role/modal-role.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

const routes: Route[] = [
  {
    path: '',
    component: RoleAdministrationComponent,
  },
];

@NgModule({
  declarations: [RoleAdministrationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NoDataScreenModule,
    TableModule,
    ModalRoleModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class RoleAdministrationModule {}
