import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModificationTypesComponent } from './modification-types.component';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { HttpClientModule } from '@angular/common/http';

describe('ModificationTypesComponent', () => {
  let component: ModificationTypesComponent;
  let fixture: ComponentFixture<ModificationTypesComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  let dialog: any;
  const ProductServiceMock = {
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
    riskTypes: new FormArray([
      new FormGroup({
        id: new FormControl(2),
        name: new FormControl('Mascota'),
        description: new FormControl('Tipo de riesgo Mascota'),
        businessPlans: new FormArray([
          new FormGroup({
            code: new FormControl('pc001_compras'),
            description: new FormControl('comprascomprascompra'),
            name: new FormControl('compras'),
            servicePlans: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                required: new FormControl(true),
              }),
            ]),
            coverages: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                required: new FormControl(true),
              }),
            ]),
          }),
        ]),
        complementaryData: new FormArray([
          new FormGroup({
            code: new FormControl('datos_basicos'),
            id: new FormControl(1),
            isEditing: new FormControl(true),
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
          }),
        ]),
      }),
    ]),
    policyData: new FormArray([
      new FormGroup({
        code: new FormControl('datos_basicos'),
        id: new FormControl(1),
        name: new FormControl('Datos básicos'),
        isEditing: new FormControl(true),
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
      }),
    ]),
    servicesPlans: new FormArray([
      new FormGroup({
        id: new FormControl(7),
        name:new FormGroup({name:new FormControl('plan básico')})
      })
    ])
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ],
      declarations: [ModificationTypesComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ModificationTypesComponent,

        FormBuilder,

        {
          provide: FormArray,
          useValue: {},
        },

        { provide: MatDialog, useValue: new dialogMock() },
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

    fixture = TestBed.createComponent(ModificationTypesComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit', () => {
    const spy = jest.spyOn(component, 'calledMenu').mockImplementation();
    component.ngOnInit();
    expect(spy).toBeCalled();
  });
  // it('getDataCoverages',()=>{

  // })
  it('openToAdd', () => {
    component.data = 'pc001_opcion1alternativa1';
    const spy = jest.spyOn(component, 'addItem').mockImplementation();
    const spy1 = jest.spyOn(component, 'getAllRiskField').mockImplementation();
    const spy3 = jest.spyOn(component, 'getAllRisk').mockImplementation();

    component.openToAdd('risk');
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it('openToAddPolicy', () => {
    component.data = 'pc001_opcion1alternativa1';
    const spy = jest.spyOn(component, 'addItem').mockImplementation();
    const spy1 = jest.spyOn(component, 'getAll').mockImplementation();
    const spy3 = jest.spyOn(component, 'getAllFields').mockImplementation();

    component.openToAdd('policy');
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy3).toBeCalled();
  });
  it('addItem', () => {
    component.riskData = true;
    const spy = jest.spyOn(component, 'showMessageGroup').mockImplementation();
    const spy1 = jest.spyOn(component, 'getNameGroup').mockImplementation();
    const spy2 = jest.spyOn(component, 'addRisk').mockImplementation();
    const spy3 = jest.spyOn(component, 'add').mockImplementation();
    const spy4 = jest
      .spyOn(component, 'addGroupArrayById')
      .mockImplementation();
    const spy5 = jest
      .spyOn(component, 'addGroupArrayByIdRisk')
      .mockImplementation();
    component.addItem(res, 1, true);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
    expect(spy4).toBeCalled();
    expect(spy5).toBeCalled();
  });

  it('addItemPolicy', () => {
    component.policyData = true;
    const spy = jest.spyOn(component, 'showMessageGroup').mockImplementation();
    const spy1 = jest.spyOn(component, 'getNameGroup').mockImplementation();
    const spy2 = jest.spyOn(component, 'add').mockImplementation();
    const spy3 = jest
      .spyOn(component, 'addGroupArrayById')
      .mockImplementation();
    component.addItem(res, 1, true);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it('getAllRiskField', () => {
    expect(component.getAllRiskField()).toBeDefined();
  });

  it('getAllRisk', () => {
    expect(component.getAllRisk()).toBeDefined();
  });
  it('getAll', () => {
    expect(component.getAll()).toBeDefined();
  });

  it('getAllFields', () => {
    expect(component.getAllFields()).toBeDefined();
  });

  it('showMessageGroup', () => {
    expect(component.showMessageGroup(false)).toBeUndefined();
  });
  it('addRisk', () => {
    let group = {
      id: 1,
      code: 'datos_basicos',
      name: 'Datos básicos',
      fields: [{ code: { businessCode: 'datos_basicos' } }],
      isEditing: true,
    };
    expect(component.addRisk(group)).toBeUndefined();
  });
  it('add', () => {
    let group = {
      id: 1,
      code: 'datos_basicos',
      name: 'Datos básicos',
      fields: [{ code: { businessCode: 'datos_basicos' } }],
      isEditing: true,
    };
    expect(component.add(group)).toBeUndefined();
  });
  it('getNameGroupPolicyData', () => {
    component.policyData = true;
    expect(component.getNameGroup('datos_basicos')).toBeUndefined();
  });
  it('getNameGroupRisk', () => {
    component.riskData = true;
    expect(component.getNameGroup('datos_basicos')).toBeUndefined();
  });
  it('addGroupObj', () => {
    let group = [
      {
        id: 2,
        code: 'datos_basicos',
        name: 'Datos básicos',
        fields: [{ code: { businessCode: 'datos_basicos' } }],
        isEditing: true,
      },
    ];
    expect(component.addGroupObj(group, 'datos_basicos')).toBeUndefined();
  });

  it('calledMenu', () => {
    let menu = [
      {
        code: 'string',
        coverages: [{}],
        description: 'string',
        name: 'string',
        servicePlans: [{}],
        athrzdOprtn: ['MDF'],
      },
    ];
    expect(component.calledMenu(menu)).toBeUndefined();
  });

  it('onAddBranch',()=>{
    let menu = [
      {
        code: 'string',
        coverages: [{}],
        description: 'string',
        name: 'string',
        servicePlans: [{}],
        athrzdOprtn: ['MDF'],
      },
    ];
    const spy= jest.spyOn(component,'calledMenu').mockImplementation();
    component.onAddBranch(menu);
    expect(spy).toBeCalled();
  })
  it('sendData', () => {
    component.showCommercialPlans=true;
    component.bussinesPlans=true;
    expect(component.sendData('pc001_opcion1alternativa1', 'risk')).toBeUndefined();
  });
  it('showRiskType', () => {
    component.policyData=true;
    expect(component.showRiskType()).toBeUndefined();
  });
  it('showCommercialPlan', () => {
    component.showCommercialPlansTypes=true;
    expect(component.showCommercialPlan({ name: 'Risk' })).toBeUndefined();
  });

  it('getGroupArrayByIdModify',()=>{
    component.getGroupArrayByIdModify(2);
  });
  it('getGroupArrayById',()=>{
    component.getGroupArrayById(1);
  })
  it('getDataCoverages',()=>{
    component.getDataCoverages(7,'name')
  })

  it('addBranchCoverage',()=>{
    let menu = [
      {
        code: 'string',
        coverages: [{}],
        description: 'string',
        name: 'string',
        servicePlans: [{}],
        athrzdOprtn: ['MDF'],
      },
    ];
    component.addBranchCoverage(menu,{athrzdOprtn:['MDF'],code :'string'})
  });

  it('addBusinessPlan',()=>{
    let menu;
    let menu2 = [
      {
        code: 'string',
        coverages: [{}],
        description: 'string',
        name: 'string',
        servicePlans: [{}],
        athrzdOprtn: ['MDF'],
      },
    ];
    component.addBusinessPlan(menu2,menu);
  })

  // it('addDataRisk',()=>{
  //   const spy=jest.spyOn(component,'getCoverages').mockImplementation();
  //   component.addDataRisk();
  // })
});
