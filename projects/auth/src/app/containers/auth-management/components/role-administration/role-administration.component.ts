import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRequestsService } from 'commons-lib';
import { ModalRoleComponent } from './modal-role/modal-role.component';

@Component({
  selector: 'refactoring-smartcore-mf-role-administration',
  templateUrl: './role-administration.component.html',
  styleUrls: ['./role-administration.component.scss'],
  providers: [DialogService],
})
export class RoleAdministrationComponent implements OnInit {
  roles!: any[];
  cols: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ];
  constructor(
    public dialogService: DialogService,
    public apiService: ApiRequestsService
  ) {}

  ngOnInit(): void {
    this.roles = this.apiService.getRoles()?.value;
    console.log('roles', this.roles);
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
