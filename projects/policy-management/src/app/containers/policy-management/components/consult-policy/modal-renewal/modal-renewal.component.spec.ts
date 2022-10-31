import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRenewalComponent } from './modal-renewal.component';

describe('ModalRenewalComponent', () => {
  let component: ModalRenewalComponent;
  let fixture: ComponentFixture<ModalRenewalComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ModalRenewalComponent,
      ],
    });
    component = TestBed.inject(ModalRenewalComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
