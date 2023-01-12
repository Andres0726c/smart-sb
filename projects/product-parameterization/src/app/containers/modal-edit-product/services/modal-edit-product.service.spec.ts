import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { environment } from 'commons-lib';
import { ModalEditProductService } from './modal-edit-product.service';

describe('ModalEditProductService', () => {
  let service: ModalEditProductService;
  let httpController: HttpTestingController;
  const apiUrl: string = environment.urlParameterizerMS;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ModalEditProductService,
         FormBuilder],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ModalEditProductService);
    httpController = TestBed.inject(HttpTestingController)
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDataEdit', () => {
    service.getDataEdit().subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}`
    });
    req.flush('Data Product');
  });

  it('validProduct', () => {
    service.validProduct().subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}`
    });
    req.flush('Data Product');
  });

  it('validCode', () => {
    service.validCode().subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}`
    });
    req.flush('Data Product');
  });

  it('getDataEdit with id', () => {
    const serviceName = 'serviceName'
    const id='id'
    service.getDataEdit(serviceName,id).subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}${serviceName}/${id}`
    });
    req.flush('Data Product');
  });

  it('validProduct with id', () => {
    const serviceName = 'serviceName'
    const id='id'
    service.validProduct(serviceName,id).subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}${serviceName}/${id}`
    });
    req.flush('Data Product');
  });

  it('validCode with id', () => {
    const serviceName = 'serviceName'
    const id='id'
    service.validCode(serviceName,id).subscribe((res) =>{
      expect(res).toEqual('Data Product');
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}${serviceName}/${id}`
    });
    req.flush('Data Product');
  });

});

