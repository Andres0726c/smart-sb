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
            mdfctnPrcss: new FormGroup({
              mdfcblDt: new FormGroup({
                plcyDtGrp: new FormArray([
                  new FormGroup({
                    id: new FormControl(1),
                    code: new FormControl('gd002_datosdeldebito', Validators.required),
                    name: new FormControl('Datos del débito', Validators.required),
                    fields: new FormArray(
                      [
                        new FormGroup({
                          id: new FormControl(24),
                          name: new FormControl('Test'),
                          fieldGroup: new FormControl(1),
                        }),
                      ],
                      Validators.required
                    ),
                  }),
                ]),
                rskTyp: new FormArray([
                  new FormGroup({
                    id: new FormControl(2, Validators.required),
                    name: new FormControl('Mascota', Validators.required),
                    description: new FormControl(
                      'Tipo de riesgo Mascota',
                      Validators.required
                    ),
                    code: new FormArray(
                      [
                        new FormGroup({
                          businessCode: new FormControl('2', Validators.required),
                        }),
                      ],
                      Validators.required
                    ),
                    cmmrclPln: new FormArray([
                      new FormGroup({
                        name: new FormControl('DAVIPLATA 1'),
                        description: new FormControl('opcion1 alternativa1'),
                        code: new FormControl('pc001_opcion1alternativa1'),
                        athrzdOprtn: new FormControl('MDF'),
                        cvrg: new FormArray([
                          new FormGroup({
                            id: new FormControl(7),
                            code: new FormArray(
                              [
                                new FormGroup({
                                  businessCode: new FormControl(
                                    'COB8',
                                    Validators.required
                                  ),
                                }),
                              ],
                              Validators.required
                            ),
                            name: new FormControl('Gastos exequiales'),
                            description: new FormControl('Gastos exequiales'),
                            athrzdOprtn: new FormControl('MDF'),
                            cvrgDtGrp: new FormArray([
                              new FormGroup({
                                id: new FormControl(2),
                                name: new FormControl('Datos cobertura'),
                                description: new FormControl(),
                                code: new FormControl('gd002_datoscobertura'),
                                fields: new FormArray(
                                  [
                                    new FormGroup({
                                      id: new FormControl(24),
                                      name: new FormControl('Test'),
                                      // fieldGroup: new FormControl(1)
                                    }),
                                  ],
                                  Validators.required
                                ),
                              }),
                            ]),
                          }),
                        ]),
                        srvcPln: new FormArray([
                          new FormGroup({
                            id: new FormControl(7),
                            name: new FormControl('Plan básico'),
                            athrzdOprtn: new FormControl('MDF'),
                            description: new FormControl(
                              'Plan básico con mínimo de 3 coberturas'
                            ),
                          }),
                        ]),
                      }),
                    ]),
                    rskTypDtGrp: new FormArray([
                      new FormGroup({
                        code: new FormControl(
                          'gd002_datosmascota',
                          Validators.required
                        ),
                        name: new FormControl('Datos mascota', Validators.required),
                        fields: new FormArray(
                          [
                            new FormGroup({
                              id: new FormControl(24),
                              name: new FormControl('Test'),
                              // fieldGroup: new FormControl(1)
                            }),
                          ],
                          Validators.required
                        ),
                      }),
                    ]),
                  }),
                ]),
              }),
            }),
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

  it('deleteRiskMdfctPrcss', () => {
    let node = {expandable: false, name: 'Mascota', level: 1};
    expect(component.deleteRiskMdfctPrcss(node)).toBeUndefined();
  });
});
