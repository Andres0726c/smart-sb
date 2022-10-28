import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoveragesRatesComponent } from './coverages-rates.component';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';

describe('CoveragesRatesComponent', () => {
  let component: CoveragesRatesComponent;
  let fixture: ComponentFixture<CoveragesRatesComponent>;

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
      providers: [ CoveragesRatesComponent ,
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
    component = TestBed.inject(CoveragesRatesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'coverageRatesControls';
    const sendData = [{id: 1, name: 'Tasa del producto', description: 'Se usa la prima del producto'}];
    const parameter = '0';
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData, parameter:parameter},
    });

    expect(dialogRef).toBeDefined();
  });

  it('openDialog openDialogCoverageRates',()=>{
    expect(component.openDialogCoverageRates()).toBeUndefined();
  });

  it('remove',()=>{
    expect(component.remove('remove')).toBeUndefined();
  });
  
  it('reset Ok', () => {
    expect(component.reset()).toBeUndefined();
  });
});
