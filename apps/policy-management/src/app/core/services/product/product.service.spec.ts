import { Product } from 'apps/policy-management/src/app/core/interfaces/product/product';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'apps/policy-management/src/environments/environment';

import { ProductService } from './product.service';

const apiUrl: string = environment.urlMicroServices;
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
    service
      .getAllProductsByCompany(idCompany, pageNumber, pageSize)
      .subscribe((res) => {
        expect(res).toEqual(mockProducts);
      });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findByCompany/${idCompany}/${pageNumber}/${pageSize}`,
    });
    req.flush(mockProducts);
  });

  it('getAllProducts only idCompany param', () => {
    const idCompany = 1;
    const pageNumber = 0;
    const pageSize = 100;
    service.getAllProductsByCompany(idCompany).subscribe((res) => {
      expect(res).toEqual(mockProducts);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}product/findByCompany/${idCompany}/${pageNumber}/${pageSize}`,
    });
    req.flush(mockProducts);
  });
});
