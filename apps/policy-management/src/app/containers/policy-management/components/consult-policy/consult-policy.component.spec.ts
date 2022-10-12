import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import {
  ResponseDTO,
  ResponseErrorDTO,
} from './../../../../core/interfaces/commun/response';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FilterPolicy } from './interfaces/consult-policy';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  getTestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of, Observable } from 'rxjs';

import { ConsultPolicyComponent } from './consult-policy.component';
import { ConsultPolicyService } from './services/consult-policy.service';
import { PolicyBrief } from 'apps/policy-management/src/app/core/interfaces/policy';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;
  let consultPolicyService: ConsultPolicyService;

  beforeEach(() => {
    consultPolicyService = ConsultPolicyService.prototype;
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        DialogService,
        ConsultPolicyComponent,
        MessageService,
        FormBuilder,
      ],
    });
    component = TestBed.inject(ConsultPolicyComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search with start date', () => {
    let filters: FilterPolicy = component.filters;
    filters.startDate = '30/12/2022';

    component.search(filters);
    expect(component.filters.startDate).toEqual('2022-12-30T05:00:00.000Z');
  });

  it('nextPage', () => {
    component.policies = [
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
    let event: LazyLoadEvent = {
      first: 5,
      rows: 5,
    };
    component.nextPage(event);
    expect(component.filters.pageNumber).toEqual(1);
  });

  it('consult success', fakeAsync(() => {
    const response: ResponseDTO<string[]> = {
      body: ['test'],
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      },
    };
    jest
      .spyOn(consultPolicyService, 'getPolicies')
      .mockReturnValueOnce(of(response));
    component.consultPolicies(component.filters);
    expect(component.policies).toEqual(['test']);
  }));

  it('consult error 400', fakeAsync(() => {
    const response: ResponseDTO<string[]> = {
      body: ['test'],
      dataHeader: {
        code: 400,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      },
    };
    jest
      .spyOn(consultPolicyService, 'getPolicies')
      .mockReturnValueOnce(of(response));
    component.consultPolicies(component.filters);
    expect(component.policies).toEqual(['test']);
  }));
});
