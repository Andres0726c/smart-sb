import { TestBed } from '@angular/core/testing';

import { AuthManagementService } from './auth-management.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthManagementService', () => {
  let service: AuthManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    service = TestBed.inject(AuthManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
