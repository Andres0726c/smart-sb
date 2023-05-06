
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'commons-lib';
import { Product } from '../../interfaces/product/product';
import { ProductService } from './product.service';

const apiUrl: string = environment.urlPolicyIssuerMS;
const apiUrlAdapter: string = environment.urlAdapterMS;
const mockProducts: Product[] = [
  {
    id: 1,
    nmName: 'string',
    dsDescription: 'string',
    nmHashCode: 1,
  },
];
describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllProducts', () => {
    service.getAllProducts().subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findAll`,
    });
    req.flush(mockProducts);
  });

  it('getAllProducts', () => {
    const idCompany = 1;
    const pageNumber = 1;
    const pageSize = 1;
    const search = "test"
    service
      .getAllProductsByCompany(idCompany, search, pageNumber, pageSize)
      .subscribe((res) => {
        expect(res).toEqual(mockProducts);
      });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findByCompany/${idCompany}/${search}/${pageNumber}/${pageSize}`,
    });
    req.flush(mockProducts);
  });

  it('getAllProducts only idCompany param', () => {
    const idCompany = 1;
    const pageNumber = 0;
    const pageSize = 50;
    const search = "0";
    service.getAllProductsByCompany(idCompany).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findByCompany/${idCompany}/${search}/${pageNumber}/${pageSize}`,
    });
    req.flush(mockProducts);
  });

  it('getProductById', () => {
    service.getProductById(1).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findById/1`,
    });
    req.flush(mockProducts);
  });

  it('getProductByCode', () => {
    service.getProductByCode('test').subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findByBusinessCode/test`,
    });
    req.flush(mockProducts);
  });

  it('findPolicyDataById', () => {
    service.findPolicyDataById(1, 17).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}policy/findPolicyDataById/1/17`,
    });
    req.flush(mockProducts);
  });

  it('modificationPolicyClaimStatus', () => {
    service.modificationPolicyClaimStatus("1").subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}policy/modificationPolicyClaimStatus/1`,
    });
    req.flush(mockProducts);
  });

  it('findByIdPolicy', () => {
    service.findByIdPolicy(1).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}policy/findByIdPolicy/1`,
    });
    req.flush(mockProducts);
  });

  it('getPremiumData', () => {
    service.getPremiumData(1,2).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrlAdapter}policy/taxes?smartCorePolicyNumber=1&endorsementNumber=2`,
    });
    req.flush(mockProducts);
  });

});
