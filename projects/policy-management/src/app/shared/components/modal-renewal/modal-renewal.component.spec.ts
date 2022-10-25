import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRenewalComponent } from './modal-renewal.component';

describe('ModalRenewalComponent', () => {
  let component: ModalRenewalComponent;
  let fixture: ComponentFixture<ModalRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRenewalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
