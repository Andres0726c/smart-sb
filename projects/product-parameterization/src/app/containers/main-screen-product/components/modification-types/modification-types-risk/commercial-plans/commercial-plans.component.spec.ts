import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPlansComponent } from './commercial-plans.component';

describe('CommercialPlansComponent', () => {
  let component: CommercialPlansComponent;
  let fixture: ComponentFixture<CommercialPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommercialPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
