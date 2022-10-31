import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PolicyManagementRoutingModule } from './policy-management-routing.module';

import { PolicyManagementComponent } from './policy-management.component';

describe('PolicyManagementComponent', () => {
  let component: PolicyManagementComponent;
  let fixture: ComponentFixture<PolicyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyManagementComponent ],
      imports: [ PolicyManagementRoutingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
