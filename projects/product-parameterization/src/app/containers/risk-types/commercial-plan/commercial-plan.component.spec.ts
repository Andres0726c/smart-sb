import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommercialPlanComponent } from './commercial-plan.component';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ProductService } from '../../../services/product.service';

class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of([
          {
            id: 1,
            name: 'name test return',
            description: 'description test return',
          },
        ]),
    };
  }
}
const ProductServiceMock = {
  // mdfctnPrcss: new FormGroup({
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
  // }),
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
  servicePlans: new FormArray([
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
class toastMock {
  openFromComponent() {
    of([{
      data:''
    }
    ])
  }
}
describe('CommercialPlanComponent', () => {
  let component: CommercialPlanComponent;
  let fixture: ComponentFixture<CommercialPlanComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, MatDialogModule],
      declarations: [],
      providers: [
        CommercialPlanComponent,
        ProductService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
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
          provide: MatDialogRef,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CommercialPlanComponent);
    component.CommertialPlan = new FormArray([]);
    let element: any;
    element = {
      name: '',
      description: '',
      coverages: '',
      servicePlans: '',
    };
    productService = TestBed.inject(ProductService);
    component.CommertialPlanControls.push(component.fb.control(element));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openwizzard create', () => {
    const spy = jest.spyOn(component, 'addRiskModify').mockImplementation();
    expect(component.openwizzard('create')).toBeUndefined();
  });

  it('autoIncrementCustomId', () => {
    expect(component.autoIncrementCustomId(10, 'name')).toBeDefined();
  });

  it('autoIncrementCustomIdLargeName', () => {
    expect(
      component.autoIncrementCustomId(2, 'Mi casa nueva premium bolivar')
    ).toBeDefined();
  });

  it('deletePlan', () => {
    let obj: any = {
      name: 'nombre',
      description: 'description',
      coverages: [
        { id: 2, name: 'Hurto calificado', description: 'Hurto calificado' },
      ],
      servicePlans: [
        {
          clauses: [],
          description: 'Plan que tiene hasta 6 coberturas',
          id: 2,
          name: 'Plan estándar',
        },
      ],
    };
    expect(component.deletePlan(obj)).toBeUndefined();
  });
  it('editWizard edit', () => {
    let obj: any = {
      name: 'nombre',
      description: 'description',
      coverages: [
        { id: 2, name: 'Hurto calificado', description: 'Hurto calificado' },
      ],
      servicePlans: [
        {
          clauses: [],
          description: 'Plan que tiene hasta 6 coberturas',
          id: 2,
          name: 'Plan estándar',
        },
      ],
    };
    const spy = jest.spyOn(component, 'editRiskModiy').mockImplementation();
    expect(component.editWizard('edit', obj)).toBeUndefined();
  });

  it('FormCommercialPlan', () => {
    let commercialPlan = component.fb.group({
      step1: component.fb.group({
        name: component.fb.control('', [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(4),
        ]),
        description: component.fb.control('', [
          Validators.required,
          Validators.maxLength(2000),
          Validators.minLength(20),
        ]),
      }),
      coverages: component.fb.array([]),
      servicesPlan: component.fb.array([]),
    });

    component.CommercialPlan = commercialPlan;

    expect(component.FormCommercialPlan).toBeDefined();
  });

  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });

  it('reset Ok', () => {
    expect(component.reset()).toBeUndefined();
  });

  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });
  it('ngAfterViewInit Ok', () => {
    component.ngAfterViewInit();
    expect(component).toBeDefined();
  });
  it('getSuccessStatus  Ok', () => {
    component.getSuccessStatus('', '');
    expect(component).toBeDefined();
  });

  it('eliminarDiacriticos  Ok', () => {
    component.eliminarDiacriticos('VALIDANDÓ');
    expect(component).toBeDefined();
  });

  it('getMax  Ok', () => {
    let arr = [
      {
        code: 'pc001_plancccc',
        coverages: { id: 2, required: true },
        description: 'PLANCCCC PLANCCCC PLANCCCC PLANCCCC',
        name: 'PLANCCCC',
      },
      {
        code: 'pc002_planAAA',
        coverages: { id: 2, required: true },
        description: 'PLANAAAA PLANAAAA PLANAAAA PLANAAAAA',
        name: 'PLANAAAAA',
      },
    ];
    expect(component.getMax(arr, 'code')).toEqual(2);
  });

  it('getMax Zero', () => {
    expect(component.getMax([], 'id')).toEqual(0);
  });

  it('addItemPlan',()=>{
    let result = {
      coverages: new FormArray([
        new FormGroup({
          id: new FormControl(2),
          required: new FormControl(true),
        }),
      ]),
      servicePlans: new FormArray([
        new FormGroup({
          id: new FormControl(2),
          required: new FormControl(true),
        }),
      ]),
      step1: new FormGroup({
        code: new FormControl('abc'),
        name: new FormControl('abc'),
        description: new FormControl('abc'),
      }),
    };
    const spy3 = jest
    .spyOn(component, 'addRiskModify')
    .mockImplementation();
    const spy2 = jest
    .spyOn(component, 'getMax').mockImplementation();
    const spy1 = jest
    .spyOn(component, 'addDataSource')
    .mockImplementation();
    component.addItemPlan(result);

  })
  describe('TestModify', () => {

    let result = {
        coverages: new FormArray([
          new FormGroup({
            id: new FormControl(2),
            required: new FormControl(true),
          }),
        ]),
        servicePlans: new FormArray([
          new FormGroup({
            id: new FormControl(2),
            required: new FormControl(true),
          }),
        ]),
        step1: new FormGroup({
          code: new FormControl('abc'),
          name: new FormControl('abc'),
          description: new FormControl('abc'),
        }),
      },
      objservicePlans = new FormArray([
        new FormGroup({
          id: new FormControl(1),
          required: new FormControl(true),
          name: new FormControl('service'),
          description: new FormControl('service'),
          athrzdOprtn: new FormArray([]),
        }),
      ]),
      objCoverages = new FormArray([
        new FormGroup({
          id: new FormControl(1),
          required: new FormControl(true),
          name: new FormControl('coverage'),
          description: new FormControl('coverage'),
          athrzdOprtn: new FormArray([]),
          cvrgDtGrp: new FormArray([], []),
        }),
      ]),
      element={
        code:'abc',
        description:'abc',
        name:'abc',
        coverages:[{id:1,required:true,name:'coverage',description:'coverage'}],
        service:[{id:1,required:true,name:'service',description:'service'}],
      }
      ;
      it('addRiskModify', () => {
        component.productService.mdfctnPrcss = component.fb.group([
          ProductServiceMock,
        ]);
        const spy = jest
          .spyOn(component, 'addNewCommercialModify')
          .mockImplementation();
        const spy1 = jest
          .spyOn(component, 'getDataCoverages')
          .mockImplementation();

        const spy3 = jest
          .spyOn(component, 'getServicesPlan')
          .mockImplementation();

        jest
          .spyOn(component, 'validateMadatory')
          .mockImplementation();
        component.addRiskModify(result, 'add');
        expect(spy).toBeCalled();
        expect(spy1).toBeCalled();
        expect(spy3).toBeCalled();
  
      });

      it('addRiskModifyEdit', () => {
        component.productService.mdfctnPrcss = component.fb.group([
          ProductServiceMock,
        ]);
        const spy = jest
          .spyOn(component, 'modifyCommericalRisk')
          .mockImplementation();
        const spy1 = jest
          .spyOn(component, 'getDataCoverages')
          .mockImplementation();
        const spy2 = jest
          .spyOn(component, 'getAthrzdOprtnCoveragePln')
          .mockImplementation();
        const spy3 = jest
          .spyOn(component, 'getServicesPlan')
          .mockImplementation();
        const spy4 = jest
          .spyOn(component, 'getAthrzdOprtnSrvcPln')
          .mockImplementation();
        jest
          .spyOn(component, 'validateMadatory')
          .mockImplementation();
        component.addRiskModify(result, 'edit');
        expect(spy).toBeCalled();
        expect(spy1).toBeCalled();
        expect(spy2).toBeCalled();
        expect(spy3).toBeCalled();
        expect(spy4).toBeCalled();
      });
    it('addNewCommercialModify', () => {
      component.productService.mdfctnPrcss = component.fb.group({
        ProductServiceMock,
    });
      component.idRisk=new FormControl(2);
      let res= new FormArray([
        new FormGroup({
          name: new FormControl('abc'),
          description: new FormControl('abc'),
          code: new FormControl('abc'),
          athrzdOprtn: new FormArray([]),
          cvrg: new FormArray([]),
          srvcPln: new FormArray([])
        })
      ])
      jest.spyOn(component,'getRiskArrayById').mockReturnValue(res);
      jest.spyOn(component,'getMax').mockImplementation();
      jest.spyOn(component,'autoIncrementCustomId').mockImplementation();

      component.addNewCommercialModify(result, objCoverages, objservicePlans);
    });
    it('validateMadatory',()=>{
      let array= new FormArray([new FormGroup({value:new FormControl('MFD')})])
      component.validateMadatory(array,true);
    });

    it('validateMadatoryFalse',()=>{
      let array= new FormArray([new FormGroup({value:new FormControl('MFD')})])
      component.validateMadatory(array,false);
    });
    it('editRiskModiy',()=>{
      component.idRisk=new FormControl(2);
      component.productService.mdfctnPrcss = component.fb.group({
        ProductServiceMock,
    });
    let res=new FormArray(
      [
        new FormGroup({
          code: new FormControl('abc'),
          athrzdOprtn:new FormControl([])
        })
      ]
    )
      const spy = jest.spyOn(component,'addRiskModify').mockImplementation();
      const spy1= jest.spyOn(component,'getRiskArrayById').mockReturnValue(res);
      component.editRiskModiy(element,result);
    })
    it('modifyCommericalRisk',()=>{
      component.idRisk=new FormControl(2);
      const spy=jest.spyOn(component,'getRiskArrayById').mockImplementation();
      const spy1=jest.spyOn(component,'modifyGroup').mockImplementation();
      const spy2=jest.spyOn(component,'getAthrzdOprtn').mockImplementation();
      component.modifyCommericalRisk(result,objCoverages,objservicePlans,0);
      // expect(spy).toBeCalled();
    });
    it('getDataCoverages',()=>{
      component.idRisk=new FormControl(2);
      component.productService.mdfctnPrcss = component.fb.group({
        ProductServiceMock,
    });
      component.getDataCoverages(7,'name')
    })
    it('getServicesPlan',()=>{
      component.idRisk=new FormControl(2);
      component.productService.mdfctnPrcss = component.fb.group({
        ProductServiceMock,
    });
      component.getServicesPlan(7,'name')
    })
   it('getcoveragesPln',()=>{
    component.idRisk=new FormControl(2);
    component.productService.mdfctnPrcss = component.fb.group({
      ProductServiceMock,
   });
   let res=new FormArray(
    [
      new FormGroup({
        code: new FormControl('pc001_opcion1alternativa1'),
        athrzdOprtn:new FormControl([])
      })
    ]
  )
    const spy1= jest.spyOn(component,'getRiskArrayById').mockReturnValue(res);
    component.getcoveragesPln('pc001_opcion1alternativa1');
   })

   it('getAthrzdOprtn',()=>{
    component.idRisk=new FormControl(2);
    component.productService.mdfctnPrcss = component.fb.group({
      ProductServiceMock,
   });
   let res=new FormArray(
    [
      new FormGroup({
        code: new FormControl('pc001_opcion1alternativa1'),
        athrzdOprtn:new FormControl([])
      })
    ]
  )
    const spy1= jest.spyOn(component,'getRiskArrayById').mockReturnValue(res);
    component.getAthrzdOprtn('pc001_opcion1alternativa1');
   });
   it('getAthrzdOprtnCoveragePln',()=>{
    component.idRisk=new FormControl(2);
    component.productService.mdfctnPrcss = component.fb.group({
      ProductServiceMock,
   });
   let res=new FormArray(
    [
      new FormGroup({
        id:new FormControl(2),
        code: new FormControl('pc001_opcion1alternativa1'),
        athrzdOprtn:new FormControl([])
      })
    ]
  )
    const spy1= jest.spyOn(component,'getcoveragesPln').mockReturnValue(res);
    component.getAthrzdOprtnCoveragePln(2,'pc001_opcion1alternativa1');
   });
   it('getSrvcPln',()=>{
    component.idRisk=new FormControl(2);
    component.productService.mdfctnPrcss = component.fb.group({
      ProductServiceMock,
   });
   let res=new FormArray(
    [
      new FormGroup({
        id:new FormControl(2),
        code: new FormControl('pc001_opcion1alternativa1'),
        athrzdOprtn:new FormControl([])
      })
    ]
  )
    const spy1= jest.spyOn(component,'getRiskArrayById').mockReturnValue(res);
    component.getSrvcPln('pc001_opcion1alternativa1');
   });

   it('getAthrzdOprtnSrvcPln',()=>{
    component.idRisk=new FormControl(2);
    component.productService.mdfctnPrcss = component.fb.group({
      ProductServiceMock,
   });
   let res=new FormArray(
    [
      new FormGroup({
        id:new FormControl(2),
        code: new FormControl('pc001_opcion1alternativa1'),
        athrzdOprtn:new FormControl([])
      })
    ]
  )
    const spy1= jest.spyOn(component,'getSrvcPln').mockReturnValue(res);
    component.getAthrzdOprtnSrvcPln(2,'pc001_opcion1alternativa1');
   });
   
   
  });
});
