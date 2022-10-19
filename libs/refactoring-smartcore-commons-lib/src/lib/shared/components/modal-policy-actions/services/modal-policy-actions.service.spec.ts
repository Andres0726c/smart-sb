import { TestBed } from '@angular/core/testing';

import { ModalPolicyActionsService } from './modal-policy-actions.service';

describe('ModalPolicyActionsService', () => {
  let service: ModalPolicyActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalPolicyActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
