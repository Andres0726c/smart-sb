import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalRoleComponent } from './modal-role/modal-role.component';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { Table } from 'primeng/table';
import { AuthManagementService } from '../../service/auth-management.service';

@Component({
  selector: 'refactoring-smartcore-mf-role-administration',
  templateUrl: './role-administration.component.html',
  styleUrls: ['./role-administration.component.scss'],
  providers: [DialogService],
})
export class RoleAdministrationComponent implements OnInit {
  
  @ViewChild('tableSearch') tableSearch!: Table;

  cols: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ];

  selectedRole: any = [];
  data:any = [];

  constructor(
    public dialogService: DialogService,
    public apiService: AuthManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.data = this.apiService.roles.value;

    console.log('roles onInit', this.data);
  }

  openToAdd() {
    this.selectedRole = [];
    const dialogRef = this.dialogService.open(ModalRoleComponent, {
      data: {
        title: 'Crear rol',
        subtitle: 'Especifique los datos para crear el rol',
        action: 'create',
      },
      showHeader: false,
      width: '600px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.data = this.apiService.roles.value;
    })
  }

  deleteRole() {
    this.confirmationService.confirm({
      message: `
        <div class="flex justify-center pt-5 pb-3">
            <img src="smartcore-commons/assets/styles/material-theme/icons/picto-delete.svg" alt="icon-delete">
        </div>
        <div class="flex flex-col justify-center items-center mt-5 mb-3 text-3xl">
          <p class="w-full text-center">
            ¿Está seguro de eliminar los roles seleccionados?
          </p>
        </div>
        <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl text-warn">
          <p class="w-full text-center">
            Tenga en cuenta que se borrará toda la información del rol y los usuarios asociados a este rol.
          </p>
        </div>
      `,
      accept: () => {
        this.deleteRoleConfirm();
      },
    });
  }

  deleteRoleConfirm(){
    for (let rol of this.selectedRole) {
      let index = this.apiService.roles.value.indexOf(rol);

      this.apiService.roles.removeAt(index);
      this.data = this.apiService.roles.value;
      this.selectedRole = [];
    }
  }
  openToEdit(rol: any) {
    const dialogRef = this.dialogService.open(ModalRoleComponent, {
      data: {
        title: 'Modificar rol',
        subtitle: 'Especifique los datos para modificar el rol',
        action: 'edit',
        rol: rol,
      },
      showHeader: false,
      width: '600px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.data = this.apiService.roles.value;
    })
  }

  copyRol(rol: any) {
    const dialogRef = this.dialogService.open(ModalRoleComponent, {
      data: {
        title: 'Copiar rol',
        subtitle: 'Especifique los datos para copiar el rol',
        action: 'copy',
        rol: rol,
      },
      showHeader: false,
      width: '600px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.data = this.apiService.roles.value;
    })
  }

  applyFilter(event: Event, filterType: string){
    let filterValue = (event.target as HTMLInputElement).value;
    this.tableSearch.filterGlobal(filterValue, filterType);
  }
}
