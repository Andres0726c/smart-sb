import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiRequestsService } from './api-requests.service';

describe('ApiRequestsService', () => {
  let service: ApiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getApiData', () => {
    expect(service.getApiData()).toBeDefined();
  });
});
