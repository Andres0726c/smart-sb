import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAdministrationComponent } from './role-administration.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthManagementService } from '../../services/auth-management.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Table } from 'primeng/table';
import { of } from 'rxjs';

describe('RoleAdministrationComponent', () => {
  let component: RoleAdministrationComponent;
  let fixture: ComponentFixture<RoleAdministrationComponent>;
  let confirmationService: ConfirmationService;
  let authService: AuthManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleAdministrationComponent],
      providers: [
        ConfirmationService,
        AuthManagementService,
        DynamicDialogRef,
        MessageService,
        DialogService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {
            confirm: () => of([]),

          },
          
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleAdministrationComponent); 
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    authService = TestBed.inject(AuthManagementService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openToAdd', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('deleteRole', () => {
    expect(component.deleteRole()).toBeUndefined();
  });

  it('deleteRoleConfirm', () => {
    let rol = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      description: new FormControl('test'),
    });
    component.selectedRole.push(rol);
    authService.roles.push(rol);
    expect(component.deleteRoleConfirm()).toBeUndefined();
  });

  it('openToEdit', () => {
    let rol = {
      id: 1,
      name: 'test',
      description: 'test'
    }
    expect(component.openToEdit(rol)).toBeUndefined();
  });

  it('copyRol', () => {
    let rol = {
      id: 1,
      name: 'test',
      description: 'test'
    }
    expect(component.copyRol(rol)).toBeUndefined();
  });

});
