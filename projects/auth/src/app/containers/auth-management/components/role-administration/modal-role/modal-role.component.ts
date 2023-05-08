import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthManagementService } from '../../../services/auth-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'refactoring-smartcore-mf-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.scss'],
})
export class ModalRoleComponent implements OnInit {
  modal!: any;
  formRole!: FormGroup;
  flagErrorName: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public dataSourceModal: DynamicDialogConfig,
    public apiService: AuthManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.modal = this.dataSourceModal;
    if (this.modal.data.action === 'create') {
      this.formRole = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(200),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.maxLength(2000),
        ]),
      });
    }

    if (this.modal.data.action === 'edit') {
      let rol = this.modal.data.rol;
      this.formRole = new FormGroup({
        name: new FormControl(rol.name, [
          Validators.required,
          Validators.maxLength(200),
        ]),
        description: new FormControl(rol.description, [
          Validators.required,
          Validators.maxLength(2000),
        ]),
      });
    }

    if (this.modal.data.action === 'copy') {
      let rol = this.modal.data.rol;
      this.formRole = new FormGroup({
        name: new FormControl(`${rol.name} - copia`, [
          Validators.required,
          Validators.maxLength(200),
        ]),
        description: new FormControl(rol.description, [
          Validators.required,
          Validators.maxLength(2000),
        ]),
      });
    }
    this.validateName(this.formRole.get('name')?.value);
  }

  addRole() {
    if (this.modal.data.action === 'create') {
      let id = this.apiService.roles.length + 1;
      this.formRole.get('id')?.setValue(id);
      this.apiService.roles.push(this.formRole);
    }
    if (this.modal.data.action === 'edit') {
      this.confirmationService.confirm({
        message: `
          <div class="flex justify-center pt-5 pb-3">
              <img src="smartcore-commons/assets/styles/material-theme/icons/picto-alert.svg" alt="icon-alert">
          </div>
          <div class="flex flex-col justify-center items-center mt-5 mb-3 text-3xl">
            <p class="w-full text-center">
              ¿Está seguro de modificar el rol seleccionado?
            </p>
          </div>
          <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl text-warn">
            <p class="w-full text-center">
              Tenga en cuenta que esta modificación afecta todos los usuarios asociados a este rol.
            </p>
          </div>
        `,
        accept: () => {
          let rol = this.modal.data.rol;
          let index = this.apiService.roles.value.indexOf(rol);
          this.apiService.roles.value[index].name = this.formRole.value.name;
          this.apiService.roles.value[index].description =
            this.formRole.value.description;
        },
      });
    }
    if (this.modal.data.action === 'copy') {
      let id = this.apiService.roles.length + 1;
      this.formRole.get('id')?.setValue(id);
      this.apiService.roles.push(this.formRole);
    }

    this.ref.close(this.apiService.roles);
  }

  verifyName(event: Event) {
    console.log(event);
    
    let filterValue = (event.target as HTMLInputElement).value;
    this.validateName(filterValue);
  }

  validateName(name: any) {
    let object = this.apiService.roles.value.filter((obj: any) => {
      return obj.name === name;
    });

    if (object.length > 0) {
      this.flagErrorName = true;
    } else {
      this.flagErrorName = false;
    }
  }
}
