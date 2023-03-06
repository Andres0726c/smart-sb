import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'commons-lib';
import { PolicyBrief } from 'projects/policy-management/src/app/core/interfaces/policy';
import { FilterPolicyFailed } from '../interfaces/consult-policy-failed';

import { SyncPolicyFailedService } from './sync-policy-failed.service';

const mockPolicyBrief: PolicyBrief[] = [
  {
    idProduct: 126,
    productName: 'ProductoEmision',
    company: 'SEGUROS COMERCIALES BOLÍVAR S.A.',
    idPolicy: 18,
    policyNumber: '100000000000033',
    requestNumber: '37',
    insuranceLine: 'Hogar',
    inceptionDate: '2022-05-08T12:53:00-05:00',
    expirationDate: '2022-05-08T12:53:00-05:00',
    policyStatus: 'Activa',
    holderDocument: '1131345121',
    holderTypeDocument: '1',
    holderName: 'holderName',
    insuredDocument: '1131345121',
    insuredTypeDocument: '1',
    insuredName: 'insuredName',
  },
];

const mockPolicyFailed: FilterPolicyFailed = 
  {
    smartCorePolicyNumber: null,
    tronPolicyNumber: null,
    process: null,
    date: "2023-01-01"
  };

describe('SyncPolicyFailedService', () => {
  let service: SyncPolicyFailedService;
  let httpController: HttpTestingController;
  const apiUrlAdapter: string = environment.urlAdapterMS;
  const apiUrlNode: string = environment.urlAdapterNodeMS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SyncPolicyFailedService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postPoliciesFailed', () => {
    service.postPoliciesFailed(mockPolicyFailed).subscribe((res) => {
      expect(res).toEqual(mockPolicyBrief);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrlAdapter}queue/listfailedmessages`,
    });
    req.flush(mockPolicyBrief);
  });

  it('postSendDataPoliciesFailed', () => {
    service.postSendDataPoliciesFailed(mockPolicyFailed).subscribe((res) => {
      expect(res).toEqual(mockPolicyBrief);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrlNode}create`,
    });
    req.flush(mockPolicyBrief);
  });

});