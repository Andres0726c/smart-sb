import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { TechnicalControlService } from './technical-control.service';

describe('TechnicalControlService', () => {
  let service: TechnicalControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
      declarations: [],
      providers: [TechnicalControlService,
         FormBuilder],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(TechnicalControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
