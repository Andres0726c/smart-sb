import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultPolicyComponent } from './consult-policy.component';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;
  let fixture: ComponentFixture<ConsultPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
