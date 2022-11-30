import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRenewalComponent } from './policy-renewal.component';

describe('PolicyRenewalComponent', () => {
  let component: PolicyRenewalComponent;
  let fixture: ComponentFixture<PolicyRenewalComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ PolicyRenewalComponent ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(PolicyRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
