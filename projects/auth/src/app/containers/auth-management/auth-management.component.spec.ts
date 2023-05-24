import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthManagementComponent } from './auth-management.component';

describe('AuthManagementComponent', () => {
  let component: AuthManagementComponent;
  let fixture: ComponentFixture<AuthManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
