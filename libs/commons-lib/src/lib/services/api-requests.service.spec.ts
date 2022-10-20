import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiRequestsService } from './api-requests.service';

describe('ApiRequestsService', () => {
  let service: ApiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientModule]
    });
    service = TestBed.inject(ApiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
