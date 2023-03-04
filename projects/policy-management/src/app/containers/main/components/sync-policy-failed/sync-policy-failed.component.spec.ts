import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncPolicyFailedComponent } from './sync-policy-failed.component';

describe('SyncPolicyFailedComponent', () => {
  let component: SyncPolicyFailedComponent;
  let fixture: ComponentFixture<SyncPolicyFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyncPolicyFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncPolicyFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
