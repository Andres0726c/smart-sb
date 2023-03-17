import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommercialPlanTypeComponent } from './commercial-plan-type.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  SimpleChange,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

const ProductServiceMock = {
  mdfctnPrcss: new FormGroup({
    mdfcblDt: new FormGroup({
      plcyDtGrp: new FormGroup({
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
              code: new FormControl('gd002_datosmascota', Validators.required),
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
  coverages: new FormArray([
    new FormGroup({
      id: new FormControl(7),
      name: new FormControl('Daños materiales bienes y personas'),
      code: new FormControl('COB7'),
      complementaryData: new FormArray([
        new FormGroup({
          code: new FormControl('datos_basicos'),
          id: new FormControl(1),
          name: new FormControl('Datos básicos'),
          fields: new FormArray(
            [
              new FormGroup({
                code: new FormArray(
                  [
                    new FormGroup({
                      businessCode: new FormControl(
                        'datos_basicos',
                        Validators.required
                      ),
                    }),
                  ],
                  Validators.required
                ),

                // fieldGroup: new FormControl(1)
              }),
            ],
            Validators.required
          ),
          isEditing: new FormControl(true),
        }),
      ]),
    }),
  ]),
};
let res = [
  {
    id: 1,
    name: 'string',
    description: 'string',
    details: 'string',
    shouldDelete: true,
    cdRuleType: 'string',
    element: {
      id: 1,
      businessCode: 'string',
      nmLabel: 'string',
      dsDescription: 'string',
      dataType: {
        code: 'string',
        name: 'string',
        description: 'string',
        bdFieldType: 'string',
        guiComponent: 'string',
        lenght: 1,
        precision: 1,
        scale: 1,
      },
      flIsMandatory: 'S',
      domainList: {
        code: 'string',
        name: 'string',
        description: 'string',
        valueList: 'String',
      },
    },
  },
];
class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of([
          {
            id: 1,
            name: 'string',
            description: 'string',
            details: 'string',
            shouldDelete: true,
            cdRuleType: 'string',
            element: {
              id: 1,
              businessCode: 'string',
              nmLabel: 'string',
              label: 'string',
              dsDescription: 'string',
              dataType: {
                code: 'string',
                name: 'string',
                description: 'string',
                bdFieldType: 'string',
                guiComponent: 'string',
                lenght: 1,
                precision: 1,
                scale: 1,
              },
              flIsMandatory: 'S',
              domainList: {
                code: 'string',
                name: 'string',
                description: 'string',
                valueList: 'String',
              },
            },
          },
        ]),
    };
  }
}

class toastMock {
  openFromComponent() {
    /* TODO document why this method 'openFromComponent' is empty */
  }
}

describe('CommercialPlanTypeComponent', () => {
  let component: CommercialPlanTypeComponent;
  let fixture: ComponentFixture<CommercialPlanTypeComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CommercialPlanTypeComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        CommercialPlanTypeComponent,
        ProductService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock(),
        },
        {
          provide: MatSnackBar,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: ProductService,
          useValue: ProductServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CommercialPlanTypeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnchanges', () => {
    component.data = 'pc001_daviplata1';
    component.titleBussinesPlan = 'planA';
    fixture.detectChanges();
    const spy = jest.spyOn(component, 'addDataTable').mockImplementation();
    component.ngOnChanges({
      data: new SimpleChange(null, 'pc001_opcion1alternativa1', false),
    });
    expect(spy).toBeCalled();
  });

  it('getAllFields', () => {
    component.idCoverage = 7;
    expect(component.getAllFields()).toBeDefined();
  });

  it('getAll', () => {
    component.idCoverage = 7;
    component.data = 'pc001_opcion1alternativa1';
    expect(component.getAll()).toBeDefined();
  });

  it('addDataTable', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.addDataTable();
  });



  it('activeButtonON', () => {
    component.activeButton({ athrzdOprtn: ['MDF'] });
  });
  it('activeButtonOff', () => {
    component.activeButton({ athrzdOprtn: ['RPM'] });
  });

  it('openToAdd', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    const spy = jest.spyOn(component, 'addItem').mockImplementation();
    component.openToAdd();
    expect(spy).toBeCalled();
  });
  it('addItem', () => {
    const spy = jest.spyOn(component, 'showMessageGroup').mockImplementation();
    const spy1 = jest.spyOn(component, 'getNameGroup').mockImplementation();
    const spy2 = jest.spyOn(component, 'add').mockImplementation();
    const spy3 = jest.spyOn(component, 'addGroupArray').mockImplementation();
    component.addItem(res, 1, true);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });
  it('getNameGroup', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    expect(component.getNameGroup('datos_basicos')).toBeUndefined();
  });
  it('add', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    let group = {
      id: 2,
      code: 'datos_basicos',
      name: 'Datos básicos',
      fields: [{ code: { businessCode: 'datos_basicos' } }],
      isEditing: true,
    };
    expect(component.add(group)).toBeUndefined();
  });


  it('showMessageGroup', () => {
    expect(component.showMessageGroup(false)).toBeUndefined();
  });

  it('editDataTrue', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    expect(component.editData({ id: 8, name: 'nose' })).toBeUndefined();
  });
  it('editDataFalse', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    expect(component.editData({})).toBeUndefined();
  });
  it('sendDataCoverage', () => {
    component.data = 'pc001_opcion1alternativa1';
    component.idCoverage = 7;
    const spy= jest.spyOn(component,'getcover').mockImplementation();
    component.sendDataCoverage();
    expect(spy).toBeCalled();
  });
  
});
