import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ModalAlertComponent } from './modal-alert.component';

class dialogMock {
  open() {
    return {
      afterClosed: () => of([{
       
        message       : 'name test return',
        subMessage: 'description test return'
      }])
    };
  }
}

describe('ModalAlertComponent', () => {
  let component: ModalAlertComponent;
  let fixture: ComponentFixture<ModalAlertComponent>;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ ModalAlertComponent ,
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
   });
   component = TestBed.inject(ModalAlertComponent);

  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
