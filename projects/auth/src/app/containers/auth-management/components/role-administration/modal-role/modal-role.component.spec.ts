import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoleComponent } from './modal-role.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthManagementService } from '../../../service/auth-management.service';

describe('ModalRoleComponent', () => {
  let component: ModalRoleComponent;
  let fixture: ComponentFixture<ModalRoleComponent>;
  let confirmationService: ConfirmationService;
  let authService: AuthManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRoleComponent],
      providers: [
        FormBuilder,
        ConfirmationService,
        AuthManagementService,
        DynamicDialogRef,
        MessageService,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: DynamicDialogConfig,
          useValue: { data: { action: 'create' , rol: {id:1, name:'test', descriptio:'test'}} },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRoleComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    authService = TestBed.inject(AuthManagementService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit create', () => {
    component.modal.data.action = 'create';
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('ngOnInit edit', () => {
    component.modal.data.action = 'edit';
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('ngOnInit copy', () => {
    component.modal.data.action = 'copy';
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('verifyName', () => {
    let event = { target: { value: 'test' } } as any;
    let rol = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      description: new FormControl('test'),
    });
    authService.roles.push(rol);
    expect(component.verifyName(event)).toBeUndefined();
  });

  it('addRole create', () => {
    component.modal.data.action = 'create';
    expect(component.addRole()).toBeUndefined();
  });

  it('addRole edit', () => {
    component.modal.data.action = 'edit';
    expect(component.addRole()).toBeUndefined();
  });

  it('addRole copy', () => {
    component.modal.data.action = 'copy';
    expect(component.addRole()).toBeUndefined();
  });
});
