import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductiblesComponent } from './deductibles.component';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastMessageComponent } from '../../../shared/toast-message/toast-message.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';

class dialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
class SnackBarMock{
  open(){
    return {
      onAction: () => of({})
    }
  }
}

describe('DeductiblesComponent', () => {
  let component: DeductiblesComponent;
  let fixture: ComponentFixture<DeductiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, HttpClientTestingModule],
      declarations: [],
      providers: [DeductiblesComponent,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },
        {
          provide: MatSnackBarRef,
          useValue: new SnackBarMock()
        },
        FormBuilder,
        {
          provide: FormArray,
          useValue: {}
        },
        {
          provide: FormGroup,
          useValue: {}
        },
        {
          provide: Validators,
          useValue: {}
        }, {
          provide:Router,
          useValue:{}
        },
        ToastMessageComponent
        ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(DeductiblesComponent);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'typeCurrencyControls';
    const sendData = [{id: 1, name: 'Peso Colombiano', description: 'COP'}, {id: 2, name: 'Dolar Estadounidense ', description: 'USD'}];
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData},
    });

    expect(dialogRef).toBeDefined();
  });

  it('Abrir modal de confirmación de eliminación', () => {
    const dialogRef = component.dialog.open(ModalConfirmDeleteComponent, {
      data:{message:'Seguro desea eliminar el elemento?'},
    });

    expect(dialogRef).toBeDefined();
  });

  it('openDialog deductible',()=>{
    expect(component.openToAdd()).toBeUndefined();
  });

  it('remove deductible',()=>{
    let object1= {"id": 1, "name": "Mensual", "description": "Facturacion mensual"};
    component.deductibleControls.push(component.fb.control(object1));
    
// 
    expect(component.removeDeductible('3')).toBeUndefined();
  });
});
