import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormRoleComponent } from './modal-form-role.component';

describe('ModalFormRoleComponent', () => {
  let component: ModalFormRoleComponent;
  let fixture: ComponentFixture<ModalFormRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
