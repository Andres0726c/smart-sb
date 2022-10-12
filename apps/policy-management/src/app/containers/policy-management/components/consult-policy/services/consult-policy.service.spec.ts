import { Identification } from 'apps/policy-management/src/app/containers/policy-management/components/consult-policy/interfaces/identification';
import { PolicyBrief } from 'apps/policy-management/src/app/core/interfaces/policy';
import { FilterPolicy } from './../interfaces/consult-policy';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConsultPolicyService } from './consult-policy.service';
import { environment } from '@refactoring-smartcore-mf/refactoring-smartcore-commons-lib';

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

const mockIdentification: Identification[] = [
  {
    id: 1,
    businessCode: 'businessCode',
    nmName: 'nmName',
    dsDescription: 'dsDescription',
    idStatus: 1,
  },
];
describe('ConsultPolicyService', () => {
  let service: ConsultPolicyService;
  let httpController: HttpTestingController;
  let filterPolicy: FilterPolicy = {
    idCompany: 2,
    pageNumber: 0,
    pageSize: 5,
    notElements: '',
    sortColumn: 'idProduct',
    sortDirection: 'desc',
  };
  const apiUrl: string = environment.urlMicroServices;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ConsultPolicyService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPolicies', () => {
    service.getPolicies(filterPolicy).subscribe((res) => {
      expect(res).toEqual(mockPolicyBrief);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}policy/data?${service.getQueryParams(filterPolicy)}`,
    });
    req.flush(mockPolicyBrief);
  });

  it('getDocumentType', () => {
    service.getDocumentType().subscribe((res) => {
      expect(res).toEqual(mockPolicyBrief);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}identificationtype/findAll`,
    });
    req.flush(mockIdentification);
  });

});
