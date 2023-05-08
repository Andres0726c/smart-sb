import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AuthManagementService } from './auth-management.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthManagementService', () => {
  let service: AuthManagementService;
  let fixture: ComponentFixture<AuthManagementService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthManagementService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(AuthManagementService);
    service = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
