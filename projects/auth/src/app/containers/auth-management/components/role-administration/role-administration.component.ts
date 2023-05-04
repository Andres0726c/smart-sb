import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalRoleComponent } from './modal-role/modal-role.component';
import { AuthManagementService } from '../../services/auth-management.service';

@Component({
  selector: 'refactoring-smartcore-mf-role-administration',
  templateUrl: './role-administration.component.html',
  styleUrls: ['./role-administration.component.scss'],
  providers: [DialogService],
})
export class RoleAdministrationComponent implements OnInit {

  cols: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ];
  constructor(
    public dialogService: DialogService,
    public apiService: AuthManagementService
  ) {}

  ngOnInit(): void {
    
  }

  openToAdd() {
    const dialogRef = this.dialogService.open(ModalRoleComponent, {
      data: {
        title: 'Crear rol',
        subtitle: 'Especifique los datos para crear el rol',
      },
      showHeader: false,
      width: '600px',
    });
  }
}
