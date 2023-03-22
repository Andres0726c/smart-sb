import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,ViewChild ,ChangeDetectorRef} from '@angular/core';
import { InitialParametersComponent } from './initial-parameters.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatChipList, MatChipsModule } from '@angular/material/chips';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model'
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { ToastMessageComponent } from '../../shared/toast-message/toast-message.component';

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

export class MatChipListSub {
  errorState:boolean=true;
}

describe('InitialParametersComponent', () => {
  let component: InitialParametersComponent;
  let fixture: ComponentFixture<InitialParametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, MatChipsModule, HttpClientTestingModule],
      declarations: [],
      providers: [InitialParametersComponent,
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
          provide: ChangeDetectorRef,
          useValue: {}
        },
        {
          provide: Validators,
          useValue: {}
        },
        {
          provide: MatChipsModule,
          useValue: {}
        },
        {
          provide:MatChipList,
          useValue:{}
        }, {
          provide:Router,
          useValue:{}
        },
        ToastMessageComponent
        ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(InitialParametersComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Formulario en estado TOUCHED', () => {
    component.onFormSubmit();
    expect(component.service.initialParameters.touched).toBeTruthy();
  });

  it('Prueba de caso typeCurrencyControls con datos iniciales vacíos', () => {
    const ctl = 'typeCurrencyControls';
    component.service.initialParameters = new FormGroup({});
    component.service.initialParameters.get('typeCurrency')?.setValue([]);
    expect(component.service.initialParameters.get('typeCurrency')).toBeDefined();
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
  it('Obtener los datos de typeCurrency (tipo de moneda)', () => {
    expect(component.typeCurrencyControls).toBeDefined();
  });

  it('Obtener los datos de objectiveGroup (grupos objetivo)', () => {
    expect(component.objectiveGroupControls).toBeDefined();
  });

  it('Obtener los datos de salesChannel (canales de venta)', () => {
    expect(component.salesChannelControls).toBeDefined();
  });

  it('Cambiar valor del periodo de validez de la cotización a tipo numérico', () => {
    /*
    TO-BE: // ajuste de este unit-test dada la migración de objeto de inital-parameter a ProductService
    component.service.initialParameters = new FormGroup({      periodValidity: component.service.fb.control(
      '',
      Validators.compose([Validators.min(1), Validators.max(365)])
    )});
    component.service.initialParameters.get('periodValidity')?.setValue('5');
    component.changeInputNumber('periodValidity');
    expect(component.service.initialParameters.get('periodValidity')?.value).toEqual(5);
    */
  });

  it('openDialog typeCurrencyControls',()=>{
    expect(component.openDialogToChips('typeCurrencyControls')).toBeUndefined();
  });

  it('openDialog objectiveGroupControls',()=>{
    expect(component.openDialogToChips('objectiveGroupControls')).toBeUndefined();
  });

  it('openDialog salesChannelControls',()=>{
    expect(component.openDialogToChips('salesChannelControls')).toBeUndefined();
  });

  it('openDialog billingPeriodControls',()=>{
    expect(component.openDialogToChips('billingPeriodControls')).toBeUndefined();
  });

  it('openDialog ruleValidationControls',()=>{
    //expect(component.openDialogToChips('ruleValidationControls')).toBeUndefined();
  });

  it('openDialog defauld',()=>{
    expect(component.openDialogToChips('defauld')).toBeUndefined();
  });

  it('remove type bullingPeriod',()=>{
    // let object={ "id": 1, "name": "Mensual", "description": "Mensual"};
    // component.billingPeriodControls.push(component.fb.control(object));
    expect(component.remove('0', 'bullingPeriod')).toBeUndefined();
  });

  it('remove type bullingPeriod',()=>{
    let object1= {"id": 1, "name": "Mensual", "description": "Facturacion mensual"};
    let object2= {"id": 1, "name": "Mensual", "description": "Facturacion mensual"};
    component.billingPeriodControls.push(component.fb.control(object1));
    component.billingPeriodControls.push(component.fb.control(object2));
    
// 
    expect(component.remove('3', 'bullingPeriod')).toBeUndefined();
  });

  it('remove type Currency',()=>{
    component.typeCurrencyControls.push(component.fb.control('0'));
    expect(component.remove('0','typeCurrency')).toBeUndefined();
  });

  it('remove objectiveGroup',()=>{
    component.objectiveGroupControls.push(component.fb.control('0'));
    expect(component.remove('0','objectiveGroup')).toBeUndefined();
  });

  it('remove salesChannel',()=>{
    component.salesChannelControls.push(component.fb.control('0'));
    expect(component.remove('0','salesChannel')).toBeUndefined();
  });

  it('remove billingPeriod',()=>{
    component.billingPeriodControls.push(component.fb.control('0'));
    expect(component.remove('0','billingPeriod')).toBeUndefined();
  });

  it('remove default',()=>{
    // component.typeCurrencyControls.push(component.fb.control('0'));
    expect(component.remove('0','default')).toBeUndefined();
  });

  it('getDataPolicyType true',()=>{
    expect(component.getDataPolicyType('', 'a')).toBeDefined();
  })

  it('getDataPolicyType false',()=>{
    /*
    TO-BE: // ajuste de este unit-test dada la migración de objeto de inital-parameter a ProductService
    component.service.initialParameters = new FormGroup({});
    expect(component.ruleValidationControls).toBeDefined();
    */
  })

  it('remover un periodo de facturación',()=>{
    component.removeBillingPeriod(2)
    expect(component.dialog).toBeDefined();
  })

  it('keepFocus',()=>{
    component.isInsuranceLineFocus = false;
    expect(component.keepFocus()).toBeUndefined();
  })

  it('confirmSelectInsurenceLine',()=>{
    component.insuranceLineTouched = '';
    let ramo = {
      businessCode : '118',
      dsDescription: 'Ramo accidentes personales individ.',
      financialCode: '27',
      id           : 55,
      idStatus     : 1,
      nmName       : 'Accidentes personales individ.',
    };
    component.ramo = [ramo];
    expect(component.confirmSelectInsurenceLine(55)).toBeUndefined();
  })

  it('confirmSelectInsurenceLine touched',()=>{
    component.insuranceLineTouched = '22';
    let ramo = {
      businessCode : '118',
      dsDescription: 'Ramo accidentes personales individ.',
      financialCode: '27',
      id           : 55,
      idStatus     : 1,
      nmName       : 'Accidentes personales individ.',
    };
    component.ramo = [ramo];
    expect(component.confirmSelectInsurenceLine(55)).toBeUndefined();
  })

  it('selectInsurenceLine Ok', () => {
    let ramo = {
      businessCode: '118',
      dsDescription: 'Ramo accidentes personales individ.',
      financialCode: '27',
      id: 55,
      idStatus: 1,
      nmName: 'Accidentes personales individ.',
    };
    component.ramo = [ramo];
    expect(component.selectInsurenceLine(55)).toBeUndefined();
  });

  it('clearProcess ok', () => {
    expect(component.clearProcess()).toBeUndefined();
  });
});
