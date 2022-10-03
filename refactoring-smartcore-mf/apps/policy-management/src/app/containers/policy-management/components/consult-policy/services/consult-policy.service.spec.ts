import { TestBed } from '@angular/core/testing';

import { ConsultPolicyService } from './consult-policy.service';

describe('ConsultPolicyService', () => {
  let service: ConsultPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
