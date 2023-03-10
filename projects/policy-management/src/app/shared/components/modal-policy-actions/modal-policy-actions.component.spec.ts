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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConsultPolicyService } from '../../../containers/main/components/consult-policy/services/consult-policy.service';
import { ResponseDTO } from '../../../core/interfaces/commun/response';
import { Observable, of } from 'rxjs';

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
    jest.spyOn(component.productService, 'getPremiumData').mockReturnValue(of({dataHeader: {code: 200}, body: {}}));
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    const fixtureAux = TestBed.createComponent(ModalPolicyActionsComponent);
    const componentAux = fixtureAux.componentInstance;
    expect(componentAux.ngOnInit()).toBeUndefined();
  });

  it('consultPoliciesById', () => {
    const res: ResponseDTO<any> = {
      body: undefined,
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 0,
        totalPage: 0,
        totalRecords: 0
      }
    }
    const consultPolicyService = fixture.debugElement.injector.get(ConsultPolicyService);
    const spy1 = jest.spyOn(consultPolicyService, 'getPolicyById').mockReturnValueOnce(of(res));
    component.consultPoliciesById(1);
    expect(spy1).toHaveBeenCalledTimes(1);
  })

  it('getCauses', () => {
    const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
    const spy1 = jest.spyOn(modalActionsService, 'getCauses').mockReturnValueOnce(of('Cancelación'));
    component.getCauses('Cancelación');
    expect(spy1).toHaveBeenCalledTimes(1);
  })

  it('getPremiumReturnValue', () => {
    const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
    const spy1 = jest.spyOn(modalActionsService, 'getPremiumReturnValue').mockReturnValueOnce(of(1, '2022-11-15T20:27:10.000Z','2023-01-01T20:27:10.000Z'));
    component.getPremiumReturnValue(1, '2022-11-15T20:27:10.000Z','2023-01-01T20:27:10.000Z');
    expect(spy1).toHaveBeenCalledTimes(1);
  })

  it('cancelPolicy success', () => {

    component.formProcess = new FormGroup({
      processDate: new FormControl('2022-11-15T20:27:10.000Z'),
      causeType: new FormControl(138),
      immediate:new FormControl(0),
      applicationProcess: new FormControl('Cancelación'),
      observation: new FormControl('observación')
    })

    const res: any = {
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
  const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
  const spy1 = jest.spyOn(modalActionsService, 'postCancelPolicy').mockReturnValue(of(res));
  component.cancelPolicyConfirm();
  expect(spy1).toHaveBeenCalledTimes(1);
  });

  it('cancelPolicy error', () => {

    component.formProcess = new FormGroup({
      processDate: new FormControl('2022-11-15T20:27:10.000Z'),
      causeType: new FormControl(138),
      immediate:new FormControl(0),
      applicationProcess: new FormControl('Cancelación'),
      observation: new FormControl('observación')
    })

    const res: any = {
      body: ['test'],
      dataHeader: {
          code: 500,
          status: "OK",
          errorList: [],
          hasErrors: false,
          currentPage: 0,
          totalPage: 0,
          totalRecords: 0
      }
  };
  const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
  const spy1 = jest.spyOn(modalActionsService, 'postCancelPolicy').mockReturnValue(of(res));
  component.cancelPolicyConfirm();
  expect(spy1).toHaveBeenCalledTimes(1);
  });

  it('cancel Policy else', () => {
    component.formProcess.get('processDate')?.setValue(null);
    component.formProcess.get('causeType')?.setValue(138);
    expect(component.cancelPolicyConfirm()).toBeUndefined();
  })


it('rehabilitatePolicy success',() => {

  component.formProcess = new FormGroup({
    processDate: new FormControl('2022-11-15T20:27:10.000Z'),
    causeType: new FormControl(138),
    immediate:new FormControl(0),
    applicationProcess: new FormControl('Cancelación'),
    observation: new FormControl('observación'),
    rehabilitationDate: new FormControl('2022-11-15T20:27:10.000Z')
  })

  const res: any = {
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
const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
const spy1 = jest.spyOn(modalActionsService, 'postRehabilitation').mockReturnValueOnce(of(res));
component.rehabilitatePolicy();
expect(spy1).toHaveBeenCalledTimes(1);
});
it('rehabilitatePolicy error',() => {

  component.formProcess = new FormGroup({
    processDate: new FormControl('2022-11-15T20:27:10.000Z'),
    causeType: new FormControl(138),
    immediate:new FormControl(0),
    applicationProcess: new FormControl('Cancelación'),
    observation: new FormControl('observación'),
    rehabilitationDate: new FormControl('2022-11-15T20:27:10.000Z')
  })

  const res: any = {
    body: ['test'],
    dataHeader: {
        code: 500,
        status: "OK",
        errorList: [],
        hasErrors: false,
        currentPage: 0,
        totalPage: 0,
        totalRecords: 0
    }
};
const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);
const spy1 = jest.spyOn(modalActionsService, 'postRehabilitation').mockReturnValueOnce(of(res));
component.rehabilitatePolicy();
expect(spy1).toHaveBeenCalledTimes(1);
});

  it('rehabilitatePolicy error exception', () => {

    component.formProcess = new FormGroup({
      processDate: new FormControl('2022-11-15T20:27:10.000Z'),
      causeType: new FormControl(138),
      immediate: new FormControl(0),
      applicationProcess: new FormControl('Cancelación'),
      observation: new FormControl('observación'),
      rehabilitationDate: new FormControl('2022-11-15T20:27:10.000Z')
    })

    const modalActionsService = fixture.debugElement.injector.get(ModalPolicyActionsService);

    const spy = jest.fn().mockImplementation(() => {
      return new Observable(() => {
        throw new Error("Blahblah");
      })
    });

    jest.spyOn(modalActionsService, 'postRehabilitation').mockImplementation(spy);

    component.rehabilitatePolicy();
    expect(component.messageError).toBeTruthy();
  });


  it('rehabilitatePolicy error no date', () => {

    component.formProcess = new FormGroup({
      processDate: new FormControl('2022-11-15T20:27:10.000Z'),
      causeType: new FormControl(138),
      immediate: new FormControl(0),
      applicationProcess: new FormControl('Cancelación'),
      observation: new FormControl('observación')
    })

    component.rehabilitatePolicy();

    expect(component.messageError).toBeTruthy();

  });

it('verify Date', () => {
  component.formProcess.get('processDate')?.setValue('2022-11-15T20:27:10.000Z');
  component.config.data.policy.inceptionDate = '2022-11-15T20:27:10.000Z';
  component.config.data.policy.expirationDate = '2022-11-15T20:27:10.000Z';
  expect(component.verifyDate()).toBeUndefined();
});

it('verify Date else', () => {
  component.formProcess.get('processDate')?.setValue('2022-11-14T20:27:10.000Z');
  component.config.data.policy.inceptionDate = '2022-11-15T20:27:10.000Z';
  component.config.data.policy.expirationDate = '2022-11-15T20:27:10.000Z';
  expect(component.verifyDate()).toBeUndefined();
});

  it('showSuccess', () => {
    expect(component.showSuccess('succes', 'Cancelación exitosa', 'Se ha cancelado la póliza'));
  });

  it('verify Check', () => {
    component.formProcess.get('checked')?.setValue(true);
    component.config.data.policy.inceptionDate = '2022-11-15T20:27:10.000Z';
    component.config.data.policy.expirationDate = '2022-11-15T20:27:10.000Z';
    expect(component.verifyCheck()).toBeUndefined();
  });

  it('verify Check else', () => {
    component.formProcess.get('checked')?.setValue(false);
    expect(component.verifyCheck()).toBeUndefined();
  });

});

