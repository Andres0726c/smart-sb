import { TestBed } from '@angular/core/testing';

import { SyncPolicyFailedService } from './sync-policy-failed.service';

describe('SyncPolicyFailedService', () => {
  let service: SyncPolicyFailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncPolicyFailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
