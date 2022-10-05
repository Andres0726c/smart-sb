import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FilterPolicy } from './interfaces/consult-policy';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { ConsultPolicyComponent } from './consult-policy.component';
import { ConsultPolicyService } from './services/consult-policy.service';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;
  let consultPolicyService: ConsultPolicyService;

  beforeEach(() => {
    consultPolicyService = ConsultPolicyService.prototype;
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        ConsultPolicyComponent,
        MessageService,
        FormBuilder,
        // {
        //   provide: ConsultPolicyService,
        //   useValue: {
        //     getPolicies: () => Promise.resolve(),
        //   },
        // },
      ],
    });
    component = TestBed.inject(ConsultPolicyComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search with start date', () => {
    let filters: FilterPolicy = {
      idCompany: 3,
      pageNumber: 0,
      pageSize: 5,
      notElements: '0',
      sortColumn: 'idProduct',
      sortDirection: 'desc',
      holderdocumentType: '',
      holderdocumentNumber: '',
      holderName: '',
      insuredDocumentType: '',
      insuredDocumentNumber: '',
      insuredName: '',
      policyNumber: '',
      idProduct: '',
      startDate: '05 October 2011 14:48 UTC',
    };
    component.search(filters);
    expect(component.filters.startDate).toEqual('2011-10-05T14:48:00.000Z');
  });

  it('nextPage', () => {
    let event: LazyLoadEvent = {
      first: 5,
      rows: 5,
    };
    component.nextPage(event);
    expect(component.filters.pageNumber).toEqual(1);
  });

  it('', () => {});
});
