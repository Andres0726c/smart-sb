import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChanges} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoveragesRatesComponent } from './coverages-rates.component';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import {ProductService} from "../../../services/product.service";

const ProductServiceMock = {
  getApiData: () => of(
    [
      {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      }
    ]
  ),
}

describe('CoveragesRatesComponent', () => {
  let component: CoveragesRatesComponent;
  let productService: ProductService;
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
        }, {
          provide: ProductService,
          useValue: ProductServiceMock,
        },
        ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CoveragesRatesComponent);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnChanges({});
    expect(component).toBeDefined();
  });

  it('afterViewInit', () => {
    component.ngAfterViewInit();
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
    jest.spyOn(component,'getIndex').mockImplementation();
    expect(component.remove('remove')).toBeUndefined();
  });

  it('remove when index is zero',()=>{
    component.coverageRates= new FormArray([
      new FormGroup({
        id: new FormControl(1),
        calculationRule: new FormArray([
          new FormGroup({
            id: new FormControl("1")
          })
        ])
      })
    ])
    jest.spyOn(component,'getIndex').mockReturnValue(0);
    expect(component.remove('1')).toBeUndefined();
  });
  it('getIndex',()=>{
    component.coverageRates= new FormArray([
      new FormGroup({
        id: new FormControl(1),
        calculationRule: new FormArray([
          new FormGroup({
            id: new FormControl("1")
          })
        ])
      })
    ])
    component.getIndex('id');
  })

  it('reset Ok', () => {
    expect(component.reset()).toBeUndefined();
  });

  it('removeCalculationRule', () => {
    expect(component.removeCalculationRule()).toBeUndefined();
  });


  it('addChip ',()=>{
    component.selectedField = new FormArray([new FormGroup({
      calculationRule: new FormArray([]),

    })]);

    jest.spyOn(component,'removeChipList').mockImplementation();
    component.addChip([{id:1,name:'test',description:'test'}])
  })


  it('getSuccessStatus ',()=>{
    component.getSuccessStatus('hola','mundo');
  })

  it('removeCalculationRule ',()=>{
    component.selectedField= 
      new FormGroup({
        calculationRule: new FormArray([
          new FormGroup({
            id: new FormControl(1)
          })
        ])
      });
    component.removeCalculationRule();
  })


  it('openDialogWizard', () => {
    component.coverageRates= new FormArray([
      new FormGroup({
        id: new FormControl(1),
        calculationRule: new FormArray([
          new FormGroup({
            id: new FormControl("1")
          })
        ])
      })
    ])
    expect(component.openModalCalculationRule()).toBeUndefined();
  });

  it('loadContextData', () => {
    let res: any = {
      body: [
        {
          code: "prdct",
          description: 'Producto',
        },
      ]
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeDefined();

    res = {
      body: [
        {
          code: "prdct",
          description: 'Producto',
        },
      ]
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeDefined();

    jest.spyOn(productService, 'getApiData').mockImplementation(() => { throw new Error('error'); });
    expect(component.loadContextData()).toBeDefined();
  });
});
