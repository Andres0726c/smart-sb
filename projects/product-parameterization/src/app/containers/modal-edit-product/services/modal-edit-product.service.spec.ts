import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ModalEditProductService } from './modal-edit-product.service';

describe('ModalEditProductService', () => {
  let service: ModalEditProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ModalEditProductService,
         FormBuilder],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ModalEditProductService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
