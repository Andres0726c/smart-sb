import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ModalPolicyActionsComponent } from './modal-policy-actions.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConsultPolicyService } from 'projects/policy-management/src/app/containers/policy-management/components/consult-policy/services/consult-policy.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ModalPolicyActionsComponent', () => {
  let component: ModalPolicyActionsComponent;
  let modalAPService: ModalPolicyActionsService;
  let fixture: ComponentFixture<ModalPolicyActionsComponent>;

  beforeEach(() => {
    modalAPService = ModalPolicyActionsService.prototype;
    TestBed.configureTestingModule({
      declarations: [ModalPolicyActionsComponent],
      providers: [
        ModalPolicyActionsComponent,
        DynamicDialogRef,

        FormBuilder,
        ModalPolicyActionsComponent,
        DialogService,
        MessageService,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { policy: {}, process: 'Cancelar', butttonAction: 'Cancelar póliza' } },
        },
      ],
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    // component = TestBed.inject(ModalPolicyActionsComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPolicyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const fixtureAux = TestBed.createComponent(ModalPolicyActionsComponent);
    const componentAux = fixtureAux.componentInstance;
    expect(componentAux.ngOnInit()).toBeUndefined();
  });

  it('getCauses', () => {
    const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
    const spy1 = jest.spyOn(modalActionsService, 'getCauses').mockReturnValueOnce(of('Cancelación'));
    component.getCauses('Cancelación');
    expect(spy1).toHaveBeenCalledTimes(1);
  })

  it('getPremium', () => {
    const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
    const spy1 = jest.spyOn(modalActionsService, 'getPremium').mockReturnValueOnce(of(1, '2022-11-15T20:27:10.000Z'));
    component.getPremium(1, '2022-11-15T20:27:10.000Z');
    expect(spy1).toHaveBeenCalledTimes(1);
  })

  it('cancelPolicy', fakeAsync(() => {

    component.formProcess = new FormGroup({
      processDate: new FormControl('2022-11-15T20:27:10.000Z'),
      causeType: new FormControl(138),
      immediate:new FormControl(0),
      applicationProcess: new FormControl('Cancelación'),
      observation: new FormControl('observación')
    })

    const res = {
      body: ['test'],
      dataHeader: {
          code: 200,
          status: "OK",
          errorList: [],
          hasErrors: false,
          currentPage: 0,
          totalPage: 0,
          totalRecords: 0
      }
  };
  const policy = {
company: "SEGUROS COMERCIALES BOLÍVAR S.A.",
expirationDate: "2022-12-08T12:53:00-05:00",
holderDocument: "1131345121",
holderName: null,
holderTypeDocument: "CC",
idPolicy: 103,
idProduct: 58,
inceptionDate: "2022-05-31T12:53:00-05:00",
insuranceLine: "Hogar",
insuredDocument: "123456",
insuredName: null,
insuredTypeDocument: "CC",
policyNumber: "100000000000075",
policyStatus: "Activa",
premiumValue: 1000331,
productName: "pruebaEmision",
requestNumber: "87"
  };
  const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
  const spy1 = jest.spyOn(modalActionsService, 'postCancelPolicy').mockReturnValueOnce(of(policy));
  component.cancelPolicy();
  expect(spy1).toHaveBeenCalledTimes(1);
  }));


it('rehabilitatePolicy', fakeAsync(() => {

  component.formProcess = new FormGroup({
    processDate: new FormControl('2022-11-15T20:27:10.000Z'),
    causeType: new FormControl(138),
    immediate:new FormControl(0),
    applicationProcess: new FormControl('Cancelación'),
    observation: new FormControl('observación')
  })

  const res = {
    body: ['test'],
    dataHeader: {
        code: 200,
        status: "OK",
        errorList: [],
        hasErrors: false,
        currentPage: 0,
        totalPage: 0,
        totalRecords: 0
    }
};
const policy = {
company: "SEGUROS COMERCIALES BOLÍVAR S.A.",
expirationDate: "2022-12-08T12:53:00-05:00",
holderDocument: "1131345121",
holderName: null,
holderTypeDocument: "CC",
idPolicy: 103,
idProduct: 58,
inceptionDate: "2022-05-31T12:53:00-05:00",
insuranceLine: "Hogar",
insuredDocument: "123456",
insuredName: null,
insuredTypeDocument: "CC",
policyNumber: "100000000000075",
policyStatus: "Activa",
premiumValue: 1000331,
productName: "pruebaEmision",
requestNumber: "87"
};
const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
const spy1 = jest.spyOn(modalActionsService, 'postRehabilitation').mockReturnValueOnce(of(policy));
component.rehabilitatePolicy();
expect(spy1).toHaveBeenCalledTimes(1);
}));

  it('disableButton', () => {
    expect(component.disableButton()).toBeFalsy();
  });

  it('showSuccess', () => {
    expect(component.showSuccess('succes', 'Cancelación exitosa', 'Se ha cancelado la póliza'));
  });
  it('getCauses', () => {
    expect(component.getCauses('succes')).toBeUndefined();
  });

  it('Cancel Policy', () => {
    expect(component.cancelPolicy()).toBeUndefined();
  })

  it('Rehabilitate Policy', () => {
    expect(component.rehabilitatePolicy()).toBeUndefined();
  })

});

