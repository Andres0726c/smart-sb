import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmDeleteComponent } from './modal-confirm-delete.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
class dialogMock {
  close() {
    return {
      afterClosed: () => of({})
    };
  }
}
describe('ModalConfirmDeleteComponent', () => {
  let component: ModalConfirmDeleteComponent;
  let fixture: ComponentFixture<ModalConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [ModalConfirmDeleteComponent,
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue:  new dialogMock()
        }, {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    component = TestBed.inject(ModalConfirmDeleteComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', ()=>{
    component.ngOnInit();
    expect(component.message).toBeDefined();
  })
});
