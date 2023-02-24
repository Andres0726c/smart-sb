import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPlanTypeComponent } from './commercial-plan-type.component';

describe('CommercialPlanTypeComponent', () => {
  let component: CommercialPlanTypeComponent;
  let fixture: ComponentFixture<CommercialPlanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialPlanTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialPlanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
