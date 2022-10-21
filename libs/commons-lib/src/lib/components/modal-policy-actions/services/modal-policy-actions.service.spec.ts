import { TestBed } from '@angular/core/testing';

import { ModalPolicyActionsService } from './modal-policy-actions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ModalPolicyActionsService', () => {
  let service: ModalPolicyActionsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModalPolicyActionsService);
    httpController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
