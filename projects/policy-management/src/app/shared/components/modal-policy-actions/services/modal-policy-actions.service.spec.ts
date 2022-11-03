import { TestBed } from '@angular/core/testing';

import { ModalPolicyActionsService } from './modal-policy-actions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from 'commons-lib';
import { CancelPolicy } from '../../../../containers/policy-management/components/consult-policy/interfaces/cancel-policy';

describe('ModalPolicyActionsService', () => {
  let service: ModalPolicyActionsService;
  let httpController: HttpTestingController;
  let premium = {
    id: 1,
    deleteDate: "2022-05-31T12:53:00-05:00"
  };

  let cancel: CancelPolicy[] = [
    {
      deletionDate:       null,
      startDate:          new Date,
      endDate:            new Date,
      idPolicy:           58,
      idCause:            138,
      observation:        '',
      immediate:          0,
      applicationProcess: ''
    }
  ];

  let rehabilitate = {
    idPolicy:           58,
    idCause:            138,
    observation:        '',
  }

  let policy = {
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
  }
   let data = {
    deletionDate: "2022-05-31T12:53:00-05:00",
    idCause: 138,
    observation: 'Observación',
    immediate: 0,
    applicationProcess: 'Cancelación'
   }

  const apiUrl: string = environment.urlPolicyIssuerMS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ModalPolicyActionsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(ModalPolicyActionsService);
    httpController = TestBed.inject(HttpTestingController)
  });

  beforeEach( () => {
    service = TestBed.inject(ModalPolicyActionsService);
    httpController = TestBed.inject(HttpTestingController);
  })

  afterEach( () => {
    httpController.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCauses', () => {
    const applicationProcess = "Cancelación";
    service.getCauses(applicationProcess).subscribe((res) =>{
      expect(res).toEqual('Cancelación');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}cause/findAllByApplicationProcess/${applicationProcess}`
    });
    req.flush('Cancelación');
  });

  it('getPremium', () => {
    const id = 1;
    const deleteDate = "2022-05-31T12:53:00-05:00";
    service.getPremium(id, deleteDate).subscribe((res) =>{
      expect(res).toEqual(premium);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}policy/valueCancellation/${id}/${deleteDate}`
    });
    req.flush(premium);
  });

  it('postCancelPolicy', () => {
    service.postCancelPolicy(policy, data).subscribe((res) =>{
      expect(res).toEqual(cancel);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrl}policy/deletion`
    });
    req.flush(cancel);
  });

  it('postRehabilitation', () => {
    service.postRehabilitation(policy, data).subscribe((res) =>{
      expect(res).toEqual(rehabilitate);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrl}policy/rehabilitation`
    });
    req.flush(rehabilitate);
  });
});
