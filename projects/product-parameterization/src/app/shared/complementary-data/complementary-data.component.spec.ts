import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
//import {By} from

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { STATES } from '../toast-message/toast-message.component';
import { ComplementaryDataComponent } from './complementary-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ElementReturn } from '../../core/model/SearchModal.model';

class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of({
          id: 1,
          name: 'name test return',
          description: 'description test return',
          RulesForm: {
            rule: {
              id: 1,
              name: 'name',
              cdBusinessCode: 'code',
              description: 'description',
              cdRuleType: 'cdRule',
              endPoint: 'endpoint',
              rlEngnCd: 'rule',
              parameters: 'parameters',
            },
          },
        }),
    };
  }
}

const ProductServiceMock = {
  getApiData: () =>
    of([
      {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      },
    ]),
  initialParameters: new FormArray([
    new FormGroup({
      insuranceLine: new FormControl('23'),
    }),
  ]),
  prvwDt: new FormArray([
    new FormGroup({
      plcyDtGrp: new FormArray([
        new FormGroup({
          id: new FormControl(1),
        }),
      ]),
    }),
  ]),
  policyData: new FormArray([
    new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Datos básicos'),
      code: new FormControl('datos_basicos'),
      isEditing: new FormControl(false),
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
};

class ServiceMock {
  getApiData(route: any) {
    return {
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        },
        {
          id: 2,
          name: 'name test return 2',
          description: 'description test return 2',
        },
      ],
    };
  }
}
class toastMock {
  openFromComponent() {
    /* TODO document why this method 'openFromComponent' is empty */
  }
}

describe('ComplementaryDataComponent', () => {
  let component: ComplementaryDataComponent;
  let productService: ProductService;
  let ref: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      declarations: [],
      providers: [
        ComplementaryDataComponent,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
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
          provide: MatSnackBar,
          useValue: new toastMock(),
        },
        {
          provide: ProductService,
          useValue: ProductServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    ref = TestBed.inject(MatDialog);
  });

  beforeEach(() => {
    component = TestBed.inject(ComplementaryDataComponent);
    productService = TestBed.inject(ProductService);
    //jest.useFakeTimers();

    component.selectedField = new FormGroup({
      id: component.fb.control(24, [Validators.required]),
      name: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      label: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      fieldGroup: new FormControl(1),
      dataTypeGui: component.fb.control('input', [Validators.required]),
      dataTypeName: component.fb.control('text', [Validators.required]),
      initializeRule: component.fb.array([], []),
      validateRule: component.fb.array([], []),
      dependency: component.fb.control(25, []),
      required: component.fb.control(false, [Validators.required]),
      editable: component.fb.control(true, [Validators.required]),
      visible: component.fb.control(true, [Validators.required]),
    });
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Datos básicos'),
        code: new FormControl('datos_basicos'),
        isEditing: new FormControl(false),
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
    ]);
  });

  afterEach(() => {
    //jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('ngAfterViewInit OK', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('ngOnChanges OK', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });

  it('shootAction', () => {
    expect(component.shootAction()).toBeUndefined();
  });


  it('setInitialParameter when is true', () => {
    component.applicationLevel = 'Póliza';
    const spy=jest.spyOn(component, 'setApplicationLevel').mockImplementation();
    component.setInitialParameter(true);
    expect(spy).toBeCalled();
  });

  it('setInitialParameter when is false', () => {
    component.applicationLevel = 'Póliza';
    const spy=jest.spyOn(component, 'setApplicationLevel').mockImplementation();
    component.setInitialParameter(false);
    expect(spy).toBeCalled();
  });

  it('setInitialParameter when is null', () => {
    component.productService.initialParameters = new FormGroup({
      insuranceLine: new FormControl(null),
    });
    const result = component.productService.initialParameters.value;
    jest.spyOn(component, 'setApplicationLevel').mockReturnValue('');
    expect(result).toEqual({ insuranceLine: null });
    expect(component.setInitialParameter(false)).toEqual('0');
  });

  it('setInitialParameter when initialParameters is null ', () => {
    component.productService.initialParameters.removeControl('insuranceLine');
    jest.spyOn(component, 'setApplicationLevel').mockReturnValue('');
    expect(component.setInitialParameter(false)).toBeDefined();
  });

  it('getSuccessStatus ', () => {
    expect(component.getSuccessStatus(
      'Asociación con ciclos',
      'No se puede generar esta asociación'
    )).toEqual({"msg": "No se puede generar esta asociación", "status": "success", "title": "Asociación con ciclos"});
  });

  it('setApplicationLevel When Is True', () => {
    expect(component.setApplicationLevel(true)).toEqual("/");
  });

  it('setApplicationLevel When Is False', () => {
    expect(component.setApplicationLevel(false)).toEqual("");
  });

  it('loadData OK', async () => {
    let res: any = {
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        },
      ],
    };
    jest.spyOn(component, 'setInitialParameter').mockImplementation();
    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadData()).toBeDefined();

    res = {
      body: {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      },
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadData()).toBeDefined();

    jest.spyOn(productService, 'getApiData').mockImplementation(() => {
      throw new Error('error');
    });
    expect(component.loadData()).toBeDefined();
  });

  describe('loadContextData', () => {
    it('loadContextData OK', async () => {
      let res: any = {
        body: [
          {
            code: 'prdct',
            description: 'Producto',
          },
        ],
      };

      component.applicationLevel = 'Producto';

      jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
      expect(component.loadContextData()).toBeDefined();
    });
    it('loadContextDataFilter OK', async () => {
      let res = {
        body: [
          {
            code: 'prdct',
            applctnLvl:'Producto',
            description: 'Producto',
          },
        ],
      };
      component.contextData=[{applctnLvl:'Producto'}];
      component.applicationLevel = 'Producto';
      jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
      expect(component.loadContextData()).toBeDefined();
    });

    it('loadContextDataFilter error', async () => {
      jest.spyOn(productService, 'getApiData').mockImplementation(() => {
        throw new Error('error');
      });
      expect(component.loadContextData()).toBeDefined();
    });
  });

  it('openDialog openDialogPolicyData', () => {
    jest.spyOn(component, 'setInitialParameter').mockImplementation();
    jest.spyOn(component, 'addItem').mockImplementation();

    expect(
      component.openDialogPolicyData('complementaryDataControls')
    ).toBeUndefined();
  });
  it('openDialog openDialogPolicyData default', () => {
    jest.spyOn(component, 'addItem').mockImplementation();

    expect(component.openDialogPolicyData('default')).toBeUndefined();
  });

  it('openDialog openDialogEmissionData', () => {
    jest.spyOn(component, 'addItem').mockImplementation();
    expect(
      component.openDialogEmissionData('complementaryDataControls')
    ).toBeUndefined();
  });

  it('openDialog openDialogEmissionData default', () => {
    jest.spyOn(component, 'addItem').mockImplementation();
    expect(component.openDialogEmissionData('default')).toBeUndefined();
  });

  it('removeComplementaryData Ok', () => {
    let data = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(24),
                name: new FormControl('test'),
                fieldGroup: new FormControl(1),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );
    component.complementaryData = data;
    jest.spyOn(component, 'validateData').mockImplementation();
    expect(component.removeComplementaryData()).toBeUndefined();
  });

  it('validateData', () => {
    let obj = { fieldGroup: 1 },
      res: any = new FormArray([]);
    component.policyData = true;
    component.modifyData = false;
    let obj1 = component.fb.group({
      id: component.fb.control(24, Validators.required),
      businessCode: component.fb.control(24, Validators.required),
      dependency: component.fb.control(2, Validators.required),
    });
    res.push(obj1);
    component.getGroupArrayById(1).push(res);
    const spy=jest.spyOn(component, 'DeleteCascadeDateModify').mockImplementation();
    const spy1=jest.spyOn(component, 'selectComplementaryData').mockImplementation();
    component.validateData(obj, 0);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();

  });

  it('getComplementaryData', () => {
    const group = component.fb.group({
      id: component.fb.control(1, Validators.required),
    });
    expect(component.getComplementaryData(group)).toEqual(0);
  });

  it('getPlcyDtGrp', () => {
    component.productService.prvwDt = component.fb.group({
      plcyDtGrp: new FormArray([
        component.fb.group({
          id: component.fb.control(1, Validators.required),
          fields: new FormArray([
            component.fb.group({
              businessCode: component.fb.control('1', Validators.required),
            }),
          ]),
        }),
      ]),
    });
    const group = component.fb.group({
      id: component.fb.control(1, Validators.required),
    });
    expect(component.getPlcyDtGrp(group)).toEqual(0);
  });

  it('getMdfcblDtPlcyDtGrp', () => {
    component.productService.mdfctnPrcss = component.fb.group({
      mdfcblDt: component.fb.group({
        plcyDtGrp: new FormArray([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
            fields: new FormArray([
              component.fb.group({
                businessCode: component.fb.control('1', Validators.required),
              }),
            ]),
          }),
        ]),
      }),
    });
    const group = component.fb.group({
      id: component.fb.control(1, Validators.required),
    });
    expect(component.getMdfcblDtPlcyDtGrp(group)).toEqual(0);
  });
  it('removeGroupCascade', () => {
    component.productService.prvwDt = component.fb.group({
      plcyDtGrp: new FormArray([
        component.fb.group({
          id: component.fb.control(1, Validators.required),
          fields: new FormArray([
            component.fb.group({
              businessCode: component.fb.control('1', Validators.required),
            }),
          ]),
        }),
      ]),
    });
    component.productService.mdfctnPrcss = component.fb.group({
      mdfcblDt: component.fb.group({
        plcyDtGrp: new FormArray([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
            fields: new FormArray([
              component.fb.group({
                businessCode: component.fb.control('1', Validators.required),
              }),
            ]),
          }),
        ]),
      }),
    });
    const group = component.fb.group({
      id: component.fb.control(1, Validators.required),
    });
    const spy=jest.spyOn(component, 'getMdfcblDtPlcyDtGrp').mockReturnValue(0);
    const spy1=jest.spyOn(component, 'getPlcyDtGrp').mockReturnValue(0);
    component.removeGroupCascade(group);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
  });

  it('removeAssociatedReference Ok', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );
    expect(component.removeAssociatedReference()).toBeUndefined();
  });

  it('removeAssociatedReference  not empty', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray([], Validators.required),
        }),
      ],
      Validators.required
    );
    component.complementaryDataControls.push(component.selectedField);
    expect(component.removeAssociatedReference()).toBeUndefined();
  });

  it('selectComplementaryData Ok', () => {
    let field: FormGroup = new FormGroup({
      id: component.fb.control(25, [Validators.required]),
      name: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      label: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      dataTypeGui: component.fb.control('input', [Validators.required]),
      dataTypeName: component.fb.control('text', [Validators.required]),
      initializeRule: component.fb.array([], []),
      validateRule: component.fb.array([], []),
      dependency: component.fb.control(24, []),
      required: component.fb.control(false, [Validators.required]),
      editable: component.fb.control(true, [Validators.required]),
      visible: component.fb.control(true, [Validators.required]),
    });

    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(null),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );

    component.complementaryDataControls.push(field);
    jest.spyOn(component, 'validateComplementaryData');
    expect(
      component.selectComplementaryData(component.selectedField)
    ).toBeUndefined();
  });

  it('validateComplementaryData when requiredEssential is true', fakeAsync(() => {
    component.selectedField = new FormGroup({
      requiredEssential: new FormControl(true),
      required: new FormControl(true),
    });
    setTimeout(() => {
      jest.spyOn(component, 'addItem').mockImplementation();
      expect(component.validateComplementaryData()).toBeUndefined();
    }, 0);
    tick(50);
  }));

  it('validateComplementaryData when requiredEssential is false', fakeAsync(() => {
    component.selectedField = new FormGroup({
      requiredEssential: new FormControl(false),
      required: new FormControl(true),
    });
    setTimeout(() => {
      jest.spyOn(component, 'addItem').mockImplementation();
      expect(component.validateComplementaryData()).toBeUndefined();
    }, 0);
    tick(50);
  }));

  it('AddItem', () => {
    let obj: ElementReturn[] = [
      {
        id: 1,
        name: 'name',
        description: 'ds',
        details: 'detail',
        shouldDelete: true,
        cdRuleType: 'cd',
        element: {
          id: 1,
          businessCode: 'business',
          nmLabel: 'nmLabel',
          label: 'label',
          dsDescription: 'dsDescr',
          dataType: {
            code: 'code',
            name: 'name',
            description: 'ds',
            bdFieldType: 'bdField',
            guiComponent: 'guiC',
            lenght: 1,
            precision: 1,
            scale: 1,
          },
          flIsMandatory: 'S',
          domainList: {
            code: 'code',
            name: 'name',
            description: 'desc',
            valueList: '',
          },
        },
      },
    ];
    let res: any = new FormArray([]);
    const spy=jest.spyOn(component, 'getGroupArrayById').mockReturnValue(res);
    component.addItem(obj, 0, true);
    expect(spy).toBeCalled();

  });

  it('AddItem when is 0', () => {
    let obj: ElementReturn[] = [
      {
        id: 2,
        name: 'name',
        description: 'ds',
        details: 'detail',
        shouldDelete: true,
        cdRuleType: 'cd',
        element: {
          id: 1,
          businessCode: 'business',
          nmLabel: 'nmLabel',
          label: 'label',
          dsDescription: 'dsDescr',
          dataType: {
            code: 'code',
            name: 'name',
            description: 'ds',
            bdFieldType: 'bdField',
            guiComponent: 'guiC',
            lenght: 1,
            precision: 1,
            scale: 1,
          },
          flIsMandatory: 'S',
          domainList: {
            code: 'code',
            name: 'name',
            description: 'desc',
            valueList: '',
          },
        },
      },
    ];
    let res: any = new FormArray([]);
    const spy=jest.spyOn(component, 'getGroupArrayById').mockReturnValue(res);
    component.addItem(obj, 1, true);
    expect(spy).toBeCalled();
  });

  it('associateReference Ok', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                businessCode: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );

    jest.spyOn(component, 'showMessageError').mockImplementation();
    expect(component.associateReference('test')).toBeUndefined();
    expect(component.associateReference(undefined!)).toBeUndefined();
  });

  it('showMessageError', () => {
    let res: any = new FormArray([]);
    let obj = component.fb.group({
      id: component.fb.control(24, Validators.required),
      businessCode: component.fb.control(24, Validators.required),
      dependency: component.fb.control(24, Validators.required),
    });
    let objAux = { dependency: 24 };

    res.push(obj);
    const spy=jest.spyOn(component, 'showToastMessage').mockImplementation();
    const spy1=jest.spyOn(component, 'getGroupArrayById').mockReturnValue(res);
    component.showMessageError(objAux);
    expect(spy).toBeCalled();
    //expect(spy1).toBeCalled();
  });

  it('showMessageError when dependency is diferent', () => {
    let res: any = new FormArray([]);
    let obj = component.fb.group({
      id: component.fb.control(24, Validators.required),
      businessCode: component.fb.control(24, Validators.required),
      dependency: component.fb.control(2, Validators.required),
    });
    let objAux = { dependency: 2 };

    res.push(obj);
    component.getGroupArrayById(1).push(res);
    expect(component.showMessageError(objAux)).toBeUndefined();
  });
  it('associateReference empty', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray([], Validators.required),
        }),
      ],
      Validators.required
    );

    component.getGroupArrayById(1).push(component.selectedField);

    let field: FormGroup = new FormGroup({
      id: component.fb.control(25, [Validators.required]),
      name: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      businessCode: new FormControl('test'),
      label: component.fb.control('NEGOCIO REFERIDO [S/N]', [
        Validators.required,
      ]),
      dataTypeGui: component.fb.control('input', [Validators.required]),
      dataTypeName: component.fb.control('text', [Validators.required]),
      initializeRule: component.fb.array([], []),
      validateRule: component.fb.array([], []),
      dependency: component.fb.control(24, []),
      required: component.fb.control(false, [Validators.required]),
      editable: component.fb.control(true, [Validators.required]),
      visible: component.fb.control(true, [Validators.required]),
    });

    component.getGroupArrayById(1).push(field);

    expect(component.associateReference('test')).toBeUndefined();
  });

  it('showToastMessage warning', () => {
    expect(
      component.showToastMessage(STATES.warning, 'Hola', 'Hola Mundo')
    ).toBeUndefined();
  });

  it('openModalInitializeRule OK', () => {
    let spy = jest.spyOn(ref, 'open');
    component.openModalInitializeRule();
    expect(spy).toBeCalledTimes(1);
  });

  it('openModalValidateRule OK', () => {
    let spy = jest.spyOn(ref, 'open');
    component.openModalValidateRule();
    expect(spy).toBeCalledTimes(1);
  });

  it('removeValidateRule  OK', () => {
    expect(component.removeValidateRule()).toBe(void 0);
  });

  it('removeInitializeRule   ', () => {
    component.selectedField=component.fb.group({
      initializeRule: new FormArray([])
    });
    expect(component.removeInitializeRule()).toBe(void 0);
  });

  it('drop OK', () => {
    let event: any = {
      previousContainer: {
        data: {
          index: 1,
        },
      },
      container: {
        data: {
          item: component.selectedField,
        },
      },
    };
    const array: any = new FormArray([]);
    expect(component.drop(event, array)).toBeUndefined();
  });

  it('reset Ok', () => {
    expect(component.reset()).toBeUndefined();
  });

  it('getFieldsFormArray  OK', () => {
    const array = new FormArray([]);
    expect(component.getFieldsFormArray(array)).toBeDefined();
  });

  it('DeleteCascadeDateModify', () => {
    component.productService.mdfctnPrcss = component.fb.group({
      mdfcblDt: component.fb.group({
        id: component.fb.control(1, Validators.required),
        plcyDtGrp: new FormArray([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
            fields: new FormArray([
              component.fb.group({
                businessCode: component.fb.control('1', Validators.required),
              }),
            ]),
          }),
        ]),
      }),
    });

    component.productService.prvwDt = component.fb.group({
      plcyDtGrp: new FormArray([
        component.fb.group({
          id: component.fb.control(1, Validators.required),
          fields: new FormArray([
            component.fb.group({
              businessCode: component.fb.control('1', Validators.required),
            }),
          ]),
        }),
      ]),
    });
    jest.spyOn(component, 'deleteMdfctnPrcss').mockImplementation();
    jest.spyOn(component, 'deletePreviewData').mockImplementation();
    expect(component.DeleteCascadeDateModify(1, '1')).toBeUndefined();
  });

  it('deletePreviewData', () => {
    component.productService.prvwDt = component.fb.group({
      plcyDtGrp: new FormArray([
        component.fb.group({
          id: component.fb.control(1, Validators.required),
          fields: new FormArray([
            component.fb.group({
              businessCode: component.fb.control('1', Validators.required),
            }),
          ]),
        }),
      ]),
    });

    let data: any = new FormArray([]);
    let preview = new FormGroup({
      businessCode: new FormControl('1', Validators.required),
    });

    data.push(preview);
    expect(component.deletePreviewData(data, 1, '1')).toBeUndefined();
  });

  it('deletePreviewData when plcyDtGrp is empty', () => {
    component.productService.prvwDt = component.fb.group({
      plcyDtGrp: new FormArray([
        component.fb.group({
          id: component.fb.control(1, Validators.required),
          fields: new FormArray([]),
        }),
      ]),
    });

    let data: any = new FormArray([]);
    let preview = new FormGroup({
      businessCode: new FormControl('1', Validators.required),
    });

    data.push(preview);
    expect(component.deletePreviewData(data, 1, '1')).toBeUndefined();
  });

  it('deleteMdfctnPrcss', () => {
    component.productService.mdfctnPrcss = component.fb.group({
      mdfcblDt: component.fb.group({
        id: component.fb.control(1, Validators.required),
        plcyDtGrp: new FormArray([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
            fields: new FormArray([
              component.fb.group({
                businessCode: component.fb.control('1', Validators.required),
              }),
            ]),
          }),
        ]),
      }),
    });
    let data: any = new FormArray([]);
    let mdfctnPrcss = new FormGroup({
      businessCode: new FormControl('1', Validators.required),
    });

    data.push(mdfctnPrcss);
    expect(component.deleteMdfctnPrcss(data, 1, '1')).toBeUndefined();
  });

  it('deleteMdfctnPrcss when plcyDtGrp is empty ', () => {
    component.productService.mdfctnPrcss = component.fb.group({
      mdfcblDt: component.fb.group({
        id: component.fb.control(1, Validators.required),
        plcyDtGrp: new FormArray([
          component.fb.group({
            fields: new FormArray([]),
          }),
        ]),
      }),
    });
    let data: any = new FormArray([]);
    let mdfctnPrcss = new FormGroup({
      businessCode: new FormControl('2', Validators.required),
    });

    data.push(mdfctnPrcss);
    expect(component.deleteMdfctnPrcss(data, 1, '1')).toBeUndefined();
  });

  it('setEssentialData', () => {
    const array = [
      {
        id: 1,
        name: 'test',
      },
    ];
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray([], Validators.required),
        }),
      ],
      Validators.required
    );
    expect(component.setEssentialData(array)).toBeUndefined();
  });

  it('associateGroup', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray([], Validators.required),
        }),
      ],
      Validators.required
    );
    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.associateGroup(1)).toBeUndefined();
  });

  it('getMax', () => {
    let array: any[] = [];
    expect(component.getMax(array, 'id')).toBe(0);
    array = [{ id: 1 }, { id: 2 }];
    expect(component.getMax(array, 'id')).toBe(2);
  });

  it('getGroupBusinessCode', () => {
    expect(component.getGroupBusinessCode(1, 'name')).toBe('gd001_name');
    expect(
      component.getGroupBusinessCode(
        1,
        'nametesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
      )
    ).toBe('gd001_testtesttesttesttesttest');
  });

  it('removeGroup', () => {
    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      fields: new FormArray(
        [
          new FormGroup({
            id: new FormControl(24),
          }),
        ],
        Validators.required
      ),
    });

    let res: any = new FormArray([]);
    jest.spyOn(component, 'getComplementaryData').mockReturnValue(0);
    jest.spyOn(component, 'getGroupArrayById').mockReturnValue(res);
    expect(component.removeGroup(group)).toBeUndefined();
  });

  it('isAvailableName', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );

    expect(component.isAvailableName('test')).toBeFalsy();
    expect(component.isAvailableName('test1')).toBeTruthy();
  });

  it('errorMessageName', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );
    expect(component.errorMessageName).toBe('Ingrese el nombre del grupo');
    component.formGroupTitle.get('groupTitle')?.setValue('#@');
    expect(component.errorMessageName).toBe(
      'El nombre del grupo no recibe caracteres especiales'
    );
    component.formGroupTitle
      .get('groupTitle')
      ?.setValue(
        'askjdnsajdnasjndkasjdnaksndksandkasjndkjasndksajndkjndkjnsajkdnsajdnjk1nkdjn2jkn21jn121kj2nk1jn21kjn121jn12k1n12kj2nkjn21kjn1kjn21j2n12j2n1k1nj21jk1n2jn12kjn12k1nj21kj2n1kj1n21kj2n1kjn12kj2n1kjn1kjn21kjn1k1n21jk2n21'
      );
    expect(component.errorMessageName).toBe(
      'La longitud máxima es de 200 caracteres'
    );
    component.formGroupTitle.get('groupTitle')?.setValue('test');
    expect(component.errorMessageName).toBe(
      'Ya existe un grupo con el nombre ingresado'
    );
    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect(component.errorMessageName).toBe('');
  });

  it('addNewGroup', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('Nuevo grupo'),
          isEditing: new FormControl(false),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );
    jest.spyOn(component, 'startGroupEdit').mockImplementation();
    expect(component.addNewGroup()).toBeUndefined();
  });

  it('finishGroupEdit', () => {
    component.complementaryData = new FormArray(
      [
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test'),
          isEditing: new FormControl(false),
          fields: new FormArray(
            [
              new FormGroup({
                id: new FormControl(25),
                name: new FormControl('test'),
                dependency: new FormControl(24),
              }),
            ],
            Validators.required
          ),
        }),
      ],
      Validators.required
    );

    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      code: new FormControl(null),
      fields: new FormArray([], Validators.required),
      isEditing:new FormControl(true)
    });

    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect(
      component.finishGroupEdit({ target: { value: '123' } }, group)
    ).toBeUndefined();
  });

  it('finishGroupEdit when is invalid', () => {
    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      code: new FormControl(null),
      fields: new FormArray([], Validators.required),
      isEditing:new FormControl(true)
    });
    expect(
      component.finishGroupEdit({ target: { value: '123' } }, group)
    ).toBeUndefined();
  });

  it('startGroupEdit', fakeAsync(() => {
    let group: any = new FormArray([]),
      data = new FormGroup({
        isEditing: new FormControl(false),
        name: new FormControl('test'),
      });
    let flag = false;
    setTimeout(() => {
      jest.spyOn(component, 'actionEvent').mockImplementation();
      expect(component.startGroupEdit(group)).toBeUndefined();
    }, 0);
    tick(50);
  }));

  it('openDialogWizard', () => {
    expect(
      component.openDialogWizard(
        'ruleValidationControls',
        [],
        [],
        false,
        {},
        []
      )
    ).toBeDefined();
  });

  describe('isConfigured', () => {
    it('req when is zero', () => {
      const item = component.fb.group({
        required: component.fb.control(false, Validators.required),
        editable: component.fb.control(true, Validators.required),
        visible: component.fb.control(true, Validators.required),
        initializeRule: component.fb.array([]),
        validateRule: component.fb.array([]),
        dependency: component.fb.control(null, Validators.required),
      });
      expect(component.isConfigured(item)).toEqual(false);
    });

    it('req when is not zero', () => {
      const item = component.fb.group({
        required: component.fb.control(true, Validators.required),
        editable: component.fb.control(false, Validators.required),
        visible: component.fb.control(false, Validators.required),
        initializeRule: component.fb.array([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
          }),
        ]),
        validateRule: component.fb.array([
          component.fb.group({
            id: component.fb.control(1, Validators.required),
          }),
        ]),
        dependency: component.fb.control(true, Validators.required),
      });
      expect(component.isConfigured(item)).toEqual(true);
    });
  });
});
