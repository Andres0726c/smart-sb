import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RiskTypesComponent } from './risk-types.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ProductService } from '../../services/product.service';


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

let navigatorRouteServiceServiceMock = {
  findIndexRiskType: jest.fn()
};

class toastMock {
  openFromComponent() {} 
}
describe('RiskTypesComponent', () => {
  let component: RiskTypesComponent;
  let fixture: ComponentFixture<RiskTypesComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [RiskTypesComponent,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },

        FormBuilder,
        {
          provide: MatSnackBar,
          useValue: new toastMock()
        },
        {
          provide: FormArray,
          useValue: {}
        },
        {
          provide: FormGroup,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue:  new dialogMock()
        }, {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: ProductService,
          useValue: {
            initialParameters: new FormGroup({
              insuranceLine: new FormControl(22),
            }),
            coverages: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('Hurto calificado'),
                claimReservation: new FormArray([
                  new FormGroup({
                    id: new FormControl(1),
                    cause: new FormControl(''),
                    conceptReserv: new FormControl(['test1', 'test2']),
                  }),
                ]),
              }),
            ]),
            conceptReservation: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test1'),
                claimLiquidation: new FormArray([]),
              }),
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test3'),
                claimLiquidation: new FormArray([]),
              }),
            ]),
            riskTypes: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test1')
              })
            ]),
          },
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(RiskTypesComponent);
   
 
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Abrir modal de búsqueda', () => {
    const ctl = 'typeCurrencyControls';
    const sendData = [{ id: '1', name: 'test name', description: 'test description'}];
    const dialogRef = component.dialog.open(ModalSearchSmallComponent, {
      data: {code: ctl, list: sendData},
    });

    expect(dialogRef).toBeDefined();
  });
  
  it('openToAdd', () => {
    component.productService.riskTypes = new FormArray([]);
    expect(component.openToAdd()).toBeUndefined();

  });

  it('removeRiskType', () => {
    let node = {expandable: false, name: 'test', level: 1};
    component.productService.coverages = new FormArray([]);
    component.dataSource.data.push({
      name: 'test risk',
      id: 1,
      children: [
        { name: 'Datos del Riesgo' },
        { name: 'Planes comerciales' },
      ],
    });

    component.productService.riskTypes.push(
      component.fb.group({
        id: component.fb.control(1, Validators.required),
        name: component.fb.control('test risk', Validators.required),
        description: component.fb.control(
          'test description',
          Validators.required
        ),
        complementaryData: component.fb.array([], Validators.required),
        businessPlans: component.fb.array([], Validators.required),
      })
    ); 

    (<FormArray>component.productService.coverages).push(new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test')
    }));
    jest.spyOn(component, 'findIndexRiskType').mockImplementation(()=>{return 0});
    expect(component.removeRiskType(node)).toBeUndefined();
  });

  it('openwizzard', () => {
    expect(component.openwizzard("")).toBeUndefined();
  });
  
  it('classToRiskTypeSelected', () => {
       let node = {expandable: false, name: 'test name', level: 1};
       expect(component.classToRiskTypeSelected(node)).toBeDefined();
  });
  

  it('viewRiskType Ok', () => {
    let node = {expandable: false, name: 'test name', level: 1};
    expect(component.viewRiskType(node)).toBeUndefined();
  });
});
