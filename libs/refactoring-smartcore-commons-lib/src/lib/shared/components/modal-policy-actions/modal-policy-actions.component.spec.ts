import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPolicyActionsComponent } from './modal-policy-actions.component';

describe('ModalPolicyActionsComponent', () => {
  let component: ModalPolicyActionsComponent;
  let fixture: ComponentFixture<ModalPolicyActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPolicyActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPolicyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
