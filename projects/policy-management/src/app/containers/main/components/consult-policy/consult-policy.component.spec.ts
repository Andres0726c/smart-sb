import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
} from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of, Observable } from 'rxjs';

import { ConsultPolicyComponent } from './consult-policy.component';
import { ConsultPolicyService } from './services/consult-policy.service';
import { By } from '@angular/platform-browser';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;
  let consultPolicyService: ConsultPolicyService;
  let fixture: ComponentFixture<ConsultPolicyComponent>;
  let ref: DialogService;

  beforeEach(() => {
    consultPolicyService = ConsultPolicyService.prototype;
    ref = DialogService.prototype

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        DialogService,
        ConsultPolicyComponent,
        MessageService,
        FormBuilder,
        { provide: DynamicDialogRef, useValue: { onClose: of(true) } }
      ],
    });
    fixture = TestBed.createComponent(ConsultPolicyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search with start date', () => {
    let filters: FilterPolicy = component.filters;
    filters.startDate = '12/30/2022';

    component.search(filters);
    expect(component.filters.startDate).toEqual('2022-12-30T00:00:00.000Z');
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

  it('clearSearch', () => {
    component.clearSearch()
    expect(component.policies).toEqual([])
    expect(component.totalRecords).toEqual(0)
  })

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
      body: [],
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
    expect(component.policies).toEqual([]);
  }));

  it('disable items (Activa)', () => {
    component.disabledItem('Activa')
    expect(component.items[0].disabled).toBeFalsy();
  });

  it('disable items (Cancelada)', () => {
    component.disabledItem('Cancelada')
    expect(component.items[0].disabled).toBeTruthy();
  });

  it('show modal consult', () => {
    component.selectedPolicy = { idPolicy: 1 }
    const refOpenSpy = jest.spyOn(ref, 'open')
    component.showModalConsulDetails()
    expect(refOpenSpy).toHaveBeenCalled();
  });

  it('show modal cancelacion/rehabilitación', () => {
    component.selectedPolicy = { idPolicy: 1 }
    const refOpenSpy = jest.spyOn(ref, 'open')
    component.showModal('Cancelacion/Rehabilitación', component.selectedPolicy, 'test')
    expect(refOpenSpy).toHaveBeenCalled();
  });

  
});
