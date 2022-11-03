import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CoveragesRulesComponent } from './coverages-rules.component';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';

describe('CoveragesRulesComponent', () => {
  let component: CoveragesRulesComponent;
  let fixture: ComponentFixture<CoveragesRulesComponent>;

  class dialogMock {
    open() {
      return {
        afterClosed: () => of([{
          id         : 1,
          name       : 'name test return',
          description: 'description test return'
        }])
      };
    }
  }

  class toastMock {
    openFromComponent() {} 
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule,HttpClientTestingModule],
      declarations: [],
      providers: [ CoveragesRulesComponent ,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },
        FormBuilder,
        {
          provide: FormArray,
          useValue: {}
        },
        {
          provide: FormGroup,
          useValue: {}
        },{
          provide: MatSnackBar,
          useValue: new toastMock()
        }
        ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CoveragesRulesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'ruleSelectionControls';
    const sendData = [{id: 1, name: 'Tasa del producto', description: 'Se usa la prima del producto'}];
    const parameter = '0';
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData, parameter:parameter},
    });

    expect(dialogRef).toBeDefined();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'ruleInitializeControls';
    const sendData = [{id: 1, name: 'Tasa del producto', description: 'Se usa la prima del producto'}];
    const parameter = '0';
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData, parameter:parameter},
    });

    expect(dialogRef).toBeDefined();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'ruleValidationControls';
    const sendData = [{id: 1, name: 'Tasa del producto', description: 'Se usa la prima del producto'}];
    const parameter = '0';
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData, parameter:parameter},
    });

    expect(dialogRef).toBeDefined();
  });
  it('openDialog openDialogCoverageRules',()=>{
    expect(component.openDialogCoverageRules('ruleSelectionControls')).toBeUndefined();
  });
  it('openDialog openDialogCoverageRules',()=>{
    expect(component.openDialogCoverageRules('ruleInitializeControls')).toBeUndefined();
  });
  it('openDialog openDialogCoverageRules',()=>{
    expect(component.openDialogCoverageRules('ruleValidationControls')).toBeUndefined();
  });

  it('openDialog default',()=>{
    expect(component.openDialogCoverageRules('default')).toBeUndefined();
  });

  it('remove rule selection',()=>{
    component.ruleSelectionControls.push(component.fb.control('0'));
    expect(component.remove('0','selectionRule')).toBeUndefined();
  });

  it('remove rule initialize',()=>{
    component.ruleInitializeControls.push(component.fb.control('0'));
    expect(component.remove('0','initializeRule')).toBeUndefined();
  });

  it('remove rule validate',()=>{
    component.ruleValidationControls.push(component.fb.control('0'));
    expect(component.remove('0','validateRule')).toBeUndefined();
  });

  it('mensaje de éxito', ()=>{
    expect(component.addChip('field',[])).toBeUndefined();
  })

});