import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPolicyTopComponent } from './filter-policy-top.component';

describe('FilterPolicyTopComponent', () => {
  let component: FilterPolicyTopComponent;
  let fixture: ComponentFixture<FilterPolicyTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPolicyTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPolicyTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
