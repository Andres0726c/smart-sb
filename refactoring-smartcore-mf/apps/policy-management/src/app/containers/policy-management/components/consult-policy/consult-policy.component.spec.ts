import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

import { ConsultPolicyComponent } from './consult-policy.component';
import { ConsultPolicyService } from './services/consult-policy.service';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        ConsultPolicyComponent,
        MessageService,
        FormBuilder,
        {
          provide: ConsultPolicyService,
          useValue: {
            getPolicies: () => of([]),
          },
        },
      ],
    });
    component = TestBed.inject(ConsultPolicyComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
