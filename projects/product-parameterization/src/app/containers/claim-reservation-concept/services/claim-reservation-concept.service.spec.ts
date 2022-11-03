import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { ClaimReservationConceptService } from './claim-reservation-concept.service';
import { FormArray, FormBuilder } from '@angular/forms';

describe('ClaimReservationConceptService', () => {
  let service: ClaimReservationConceptService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ClaimReservationConceptService);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ClaimReservationConceptService, 
        FormBuilder,
        {
          provide: FormArray,
          useValue: {}
        }
      ],

      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ClaimReservationConceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getConcept', () => {
    expect(service.getConcept("test","test")).toBeDefined();
  });

  it('getExecutionLevel', () => {
    expect(service.getExecutionLevel("test","test")).toBeDefined();
  });

});
