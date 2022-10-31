import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { InitialParametersService } from './initial-parameters.service';
import data from '../../../../assets/json/data-search-modal.json';

describe('InitialParametersService', () => {
  let service: InitialParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [InitialParametersService,{provide: data, useValue: data}],

      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(InitialParametersService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDataInitialParameters',()=>{
    service.getDataInitialParameters('policyType').subscribe(val=>{
      expect(val).toBeDefined();
    });
  })

  it('getDataInitialParameters',()=>{
    service.getDataInitialParameters('policyType','1').subscribe(val=>{
      expect(val).toBeDefined();
    });
  })
});
