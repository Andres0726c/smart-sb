import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('SidenavPropertyProductComponent', () => {
  let component: SidenavPropertyProductComponent;
  let fixture: ComponentFixture<SidenavPropertyProductComponent>;
  let router: Router;
  let dialog: MatDialog;
  let productService: ProductService;

  let productServiceMock: FormGroup = new FormGroup({
    mdfctnPrcss: new FormGroup({
      enabled: new FormControl(true),
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
  });
  let formBuilderMock = new FormBuilder();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [],
      providers: [
        SidenavPropertyProductComponent,
        { provide: FormBuilder, useValue: formBuilderMock },
        {
          provide: FormGroup,
          useValue: {},
        },
        ProductService,
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(true),
              beforeClosed: () => of(true),
            }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(SidenavPropertyProductComponent);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Componente inicializado', () => {
    component.productService.initialParameters = new FormGroup({});
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('validateShow modification process', () => {
    component.formProcess = new FormGroup({
      modification: new FormGroup({ enabled: new FormControl(true) }),
    });
    let menu = {
      name: 'Modificación',
      formControlName: 'modification',
      showEnable: true,
      show: true,
      isExpanded: true,
    };
    component.validateShow(menu);
    expect(component.menus[2].show).toEqual(false);
  });

  it('validateShow doesnt find modification process into formProcess', () => {
    component.formProcess = new FormGroup({});
    let menu = {
      name: 'Modificación',
      showEnable: true,
      show: true,
      isExpanded: true,
    };
    component.validateShow(menu);
    expect(component.menus[2].show).toEqual(false);
  });

  it('validateShow emision process', () => {
    component.validateShow(component.menus[0]);
    expect(component.menus[0].show).toEqual(false);
  });

  describe('clearDataByProcess',()=>{
    it('cancellation',()=>{
      component.formProcess = new FormGroup({
        cancellation: new FormGroup({ enabled: new FormControl(true) }),
        rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
        renewal: new FormGroup({ enabled: new FormControl(true) }),
      });
      let menu = {
        name: 'Cancelación',
        formControlName: 'cancellation',
        showEnable: true,
        show: false,
        isExpanded: true,
        nameClearData1:'cnclltnCsCd',
        nameClearData2:'clcltnRl',
        nameClearData3:'isCncllblIncptnDt'
      };
      expect(component.clearData('cancellation',menu)).toBeUndefined();
    });
    it('renewal when is false',()=>{
      component.formProcess = new FormGroup({
        cancellation: new FormGroup({ enabled: new FormControl(true) }),
        rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
        renewal: new FormGroup({ enabled: new FormControl(false) }),
      });
      let menu = {
        name: 'Renovación',
        formControlName: 'renewal',
        showEnable: true,
        show: false,
        isExpanded: true,
        nameClearData1:'rnwlCsCd',
        nameClearData2:'clcltnRl',
        nameClearData3:'isNwIssPlcy'
      };
      expect(component.clearData('renewal',menu)).toBeUndefined();
    });
    it('renewal when is true',()=>{
      component.formProcess = new FormGroup({
        cancellation: new FormGroup({ enabled: new FormControl(true) }),
        rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
        renewal: new FormGroup({ enabled: new FormControl(true) }),
      });
      let menu = {
        name: 'Renovación',
        formControlName: 'renewal',
        showEnable: true,
        show: false,
        isExpanded: true,
        nameClearData1:'rnwlCsCd',
        nameClearData2:'clcltnRl',
        nameClearData3:'isNwIssPlcy'
      };
      expect(component.clearData('renewal',menu)).toBeUndefined();
    })
  })
  it('cancellation when enabled is not present',()=>{
    component.formProcess = new FormGroup({
      cancellation: new FormGroup({  }),
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
      renewal: new FormGroup({ enabled: new FormControl(true) }),
    });
    let menu = {
      name: 'Cancelación',
      formControlName: 'cancellation',
      showEnable: true,
      show: false,
      isExpanded: true,
      nameClearData1:'cnclltnCsCd',
      nameClearData2:'clcltnRl',
      nameClearData3:'isCncllblIncptnDt'
    };
    expect(component.clearData('cancellation',menu)).toBeUndefined();
  });


  it('cancellation when name is not present',()=>{
    component.formProcess = new FormGroup({
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
      renewal: new FormGroup({ enabled: new FormControl(true) }),
    });
    let menu = {
      name: 'Cancelación',
      formControlName: 'cancellation',
      showEnable: true,
      show: false,
      isExpanded: true,
      nameClearData1:'cnclltnCsCd',
      nameClearData2:'clcltnRl',
      nameClearData3:'isCncllblIncptnDt'
    };
    expect(component.clearData('cancellation',menu)).toBeUndefined();
  });

  it('cancellation when name is present',()=>{
    component.formProcess = new FormGroup({
      cancellation: new FormGroup({ 
        enabled: new FormControl(true),
        cnclltnCsCd: new FormControl(),
        clcltnRl:new FormControl(),
        isCncllblIncptnDt: new FormControl(),
       }),
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
      renewal: new FormGroup({ enabled: new FormControl(true) }),
    });
    let menu = {
      name: 'Cancelación',
      formControlName: 'cancellation',
      showEnable: true,
      show: false,
      isExpanded: true,
      nameClearData1:'cnclltnCsCd',
      nameClearData2:'clcltnRl',
      nameClearData3:'isCncllblIncptnDt'
    };
    expect(component.clearData('cancellation',menu)).toBeUndefined();
  });

  it('renewal when is false when there are 3 dataClear',()=>{
    component.formProcess = new FormGroup({
      cancellation: new FormGroup({ enabled: new FormControl(true) }),
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
      renewal: new FormGroup({ 
        enabled: new FormControl(false),
        rnwlCsCd: new FormControl(),
        clcltnRl: new FormControl(),
        isNwIssPlcy: new FormControl()
      }),
    });
    let menu = {
      name: 'Renovación',
      formControlName: 'renewal',
      showEnable: true,
      show: false,
      isExpanded: true,
      nameClearData1:'rnwlCsCd',
      nameClearData2:'clcltnRl',
      nameClearData3:'isNwIssPlcy'
    };
    expect(component.clearData('renewal',menu)).toBeUndefined();
  });

  it('renewal when is false when name is not present',()=>{
    component.formProcess = new FormGroup({
      cancellation: new FormGroup({ enabled: new FormControl(true) }),
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
    });
    let menu = {
      name: 'Renovación',
      formControlName: 'renewal',
      showEnable: true,
      show: false,
      isExpanded: true,
      nameClearData1:'rnwlCsCd',
      nameClearData2:'clcltnRl',
      nameClearData3:'isNwIssPlcy'
    };
    expect(component.clearData('renewal',menu)).toBeUndefined();
  });



  describe('changeCheck', () => {
    it('changeCheckEnableTrue', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy = jest
        .spyOn(component, 'validateFormControlName')
        .mockImplementation();
      component.changeCheck(menu, 'modification');
      expect(spy).toBeDefined();
    });

    it('changeCheckEnableFalse', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      expect(component.changeCheck(menu, 'modification')).toBeUndefined();
    });
  });

  describe('validateFormControlName', () => {
    it('validateFormControlName when is not enable', () => {
      component.formProcess
        .get('modification')
        ?.get('enabled')
        ?.setValue(false);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      expect(
        component.validateFormControlName(menu, 'modification')
      ).toBeUndefined();
    });

    it('validateFormControlName when is enable', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy = jest.spyOn(component, 'showMessage').mockImplementation();
      expect(
        component.validateFormControlName(menu, 'modification')
      ).toBeUndefined();
    });

    it('validateFormControlName when is enable but it is not module type', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy = jest.spyOn(component, 'showMessage').mockImplementation();
      expect(
        component.validateFormControlName(menu, 'cancellation')
      ).toBeUndefined();
    });
  });
  it('showMessage', () => {
    let menu = {
      name: 'Modificación',
      showEnable: true,
      show: true,
      isExpanded: true,
    };
    const spy2 = jest.spyOn(component, 'setterValuesMenu').mockImplementation();
    component.showMessage(menu);
    expect(spy2).toBeCalled();
  });

  describe('setterValuesMenu', () => {
    it('when is true', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy2 = jest.spyOn(component, 'setValues').mockImplementation();
      const spy3 = jest.spyOn(component, 'deleteCascade').mockImplementation();
      component.setterValuesMenu(menu,true);
      expect(spy2).toBeCalled();
      expect(spy3).toBeCalled();
    });
    it('when is false', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy2 = jest.spyOn(component, 'setValues').mockImplementation();
      component.setterValuesMenu(menu,false);
      expect(spy2).toBeCalled();
    });
  });

  it('navigateGeneralParams', () => {
    expect(component.navigateGeneralParams()).toBeDefined();
  });
  it('setValues', () => {
    component.formProcess.get('modification')?.get('enabled')?.setValue(true);

    let menu = {
      name: 'Modificación',
      formControlName: 'modification',
      showEnable: true,
      show: true,
      isExpanded: true,
    };

    expect(component.setValues(menu, true)).toBeUndefined();

  });

  it('deleteCascade', () => {
    let data: FormGroup = new FormGroup({
      id: component.fb.control(1),
      code: component.fb.control('gd002_datosdeldebito', Validators.required),
      name: component.fb.control('Datos del débito', Validators.required),
      fields: component.fb.array(
        [
          component.fb.group({
            id: component.fb.control(24),
            name: component.fb.control('Test'),
            fieldGroup: component.fb.control(1),
          }),
        ],
        Validators.required
      ),
    });
    let dataRisk: FormGroup = new FormGroup({
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
                    businessCode: new FormControl('COB8', Validators.required),
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
    });
    let plcyDtGrp: any = new FormArray([]);
    let mdfctnTchnclCntrl: any = new FormArray([]);
    let risk: any = new FormArray([]);

    plcyDtGrp.push(data);
    mdfctnTchnclCntrl.push(data);
    risk.push(dataRisk);

    const spy1 = jest
      .spyOn(component, 'getComplementaryDataControls')
      .mockReturnValue(plcyDtGrp);
    const spy2 = jest
      .spyOn(component, 'getMdfctnTchnclCntrl')
      .mockReturnValue(mdfctnTchnclCntrl);
    const spy = jest.spyOn(component, 'getRiskType').mockReturnValue(risk);
    const spy3 = jest
      .spyOn(component, 'deleteDataModification')
      .mockImplementation();
    component.deleteCascade();
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
  });

  it('getComplementaryDataControls', () => {
    expect(component.getComplementaryDataControls()).toBeDefined();
  });
  it('getMdfctnTchnclCntrl', () => {
    expect(component.getMdfctnTchnclCntrl()).toBeDefined();
  });

  it('getRiskTypeCmmrclPlnNull', () => {
    let risk: any = new FormArray([]);
    expect(component.getRiskTypeCmmrclPln(risk)).toBeNull();
  });
  it('getRiskTypeCmmrclPln', () => {
    let dataRisk: FormGroup = new FormGroup({
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
                    businessCode: new FormControl('COB8', Validators.required),
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
              }),
            ],
            Validators.required
          ),
        }),
      ]),
    });
    let risk: any = new FormArray([]);
    risk.push(dataRisk);

    expect(component.getRiskTypeCmmrclPln(risk)).toBeDefined();
  });

  it('getRiskType',()=>{
    component.productService.mdfctnPrcss= component.fb.group({
      mdfcblDt: component.fb.group({
        rskTyp: component.fb.array([
          component.fb.group({
            id: new FormControl(2)
          })
        ])
      })
    })
    expect(component.getRiskType()).toBeDefined();
  });


  it('deleteDataModification', () => {
    let dataRisk: FormGroup = new FormGroup({
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
                    businessCode: new FormControl('COB8', Validators.required),
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
              }),
            ],
            Validators.required
          ),
        }),
      ]),
    });
    let risk: any = new FormArray([]);
    risk.push(dataRisk);
    const spy = jest
      .spyOn(component, 'getRiskTypeCmmrclPln')
      .mockReturnValue(risk);
    const spy1 = jest
      .spyOn(component, 'deleteAthrzdOprtn')
      .mockImplementation();
    const spy2 = jest.spyOn(component, 'deleteCvrgModify').mockImplementation();
    component.deleteDataModification(risk);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });

  it('deleteCvrgModify', () => {
    let dataRisk: FormGroup = new FormGroup({
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
                    businessCode: new FormControl('COB8', Validators.required),
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
              }),
            ],
            Validators.required
          ),
        }),
      ]),
    });
    let risk: any = new FormArray([]);
    risk.push(dataRisk);
    const spy1 = jest
      .spyOn(component, 'deleteAthrzdOprtn')
      .mockImplementation();
    component.deleteCvrgModify(risk);
    expect(spy1).toBeCalled();
  });
  it('deleteAthrzdOprtn', () => {
    let risk: any = new FormArray([]);

    risk.push(new FormControl(1));

    expect(component.deleteAthrzdOprtn(risk, 'athrzdOprtn')).toBeUndefined();
  });

  it('deleteAthrzdOprtnElse', () => {
    let dataRisk: FormGroup = new FormGroup({
      id: new FormControl(7),
      code: new FormArray(
        [
          new FormGroup({
            businessCode: new FormControl('COB8', Validators.required),
          }),
        ],
        Validators.required
      ),
      name: new FormControl('Gastos exequiales'),
      description: new FormControl('Gastos exequiales'),
      athrzdOprtn: new FormArray([new FormControl('MDF')]),
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
              }),
            ],
            Validators.required
          ),
        }),
      ]),
    });
    let risk: any = new FormArray([]);
    risk.push(dataRisk);
    expect(component.deleteAthrzdOprtn(risk, '')).toBeUndefined();
  });

  it('delete AthrzdOprtn When cvrgDtGrp Is Null', () => {
    let dataRisk: FormGroup = new FormGroup({
      id: new FormControl(7),
      code: new FormArray(
        [
          new FormGroup({
            businessCode: new FormControl('COB8', Validators.required),
          }),
        ],
        Validators.required
      ),
      name: new FormControl('Gastos exequiales'),
      description: new FormControl('Gastos exequiales'),
      athrzdOprtn: new FormArray([new FormControl('MDF')]),
    });
    let risk: any = new FormArray([]);
    risk.push(dataRisk);
    expect(component.deleteAthrzdOprtn(risk, '')).toBeUndefined();
  });
});
