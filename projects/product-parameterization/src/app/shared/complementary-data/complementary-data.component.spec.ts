import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { STATES } from '../toast-message/toast-message.component';
import { ComplementaryDataComponent } from './complementary-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

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
  getApiData: () => of(
    [
      {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      }
    ]
  ),
  policyData: new FormArray([
    new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Datos básicos'),
      code: new FormControl('datos_basicos'),
      isEditing: new FormControl(false),
      fields: new FormArray([
        new FormGroup({
          id: new FormControl(24),
          name: new FormControl('Test'),
          fieldGroup: new FormControl(1)
        })
      ], Validators.required)
    }),
  ])
}

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
      ]
    }
  }
}
class toastMock {
  openFromComponent() { /* TODO document why this method 'openFromComponent' is empty */ }
}

describe('ComplementaryDataComponent', () => {
  let component: ComplementaryDataComponent;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule, HttpClientTestingModule, HttpClientModule],
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

  });

  beforeEach(() => {
    component = TestBed.inject(ComplementaryDataComponent);
    productService = TestBed.inject(ProductService);

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
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(24),
            name: new FormControl('Test')
          })
        ], Validators.required)
      }),
    ])
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

  it('loadData OK', async () => {
    let res: any = {
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        },
      ]
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadData()).toBeDefined();

    res = {
      body:
      {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      }
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadData()).toBeDefined();

    jest.spyOn(productService, 'getApiData').mockImplementation(() => { throw new Error('error'); });
    expect(component.loadData()).toBeDefined();
  });

  it('loadContextData OK', async () => {
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

  it('openDialog openDialogPolicyData', () => {
    expect(
      component.openDialogPolicyData('complementaryDataControls')
    ).toBeUndefined();
  });
  it('openDialog openDialogPolicyData default', () => {
    expect(component.openDialogPolicyData('default')).toBeUndefined();
  });

  it('openDialog openDialogEmissionData', () => {
    expect(
      component.openDialogEmissionData('complementaryDataControls')
    ).toBeUndefined();
  });

  it('openDialog openDialogEmissionData default', () => {
    expect(component.openDialogEmissionData('default')).toBeUndefined();
  });

  it('removeComplementaryData Ok', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(24),
            name: new FormControl('test'),
            fieldGroup: new FormControl(1)
          })
        ], Validators.required)
      })
    ], Validators.required);
    expect(component.removeComplementaryData()).toBeUndefined();
  });

  /*it('removeComplementaryData  not empty', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([], Validators.required)
      })
    ], Validators.required);
    component.complementaryDataControls.push(component.selectedField);
    expect(component.removeComplementaryData()).toBeUndefined();
  });*/

  it('removeAssociatedReference Ok', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);
    expect(component.removeAssociatedReference()).toBeUndefined();
  });

  it('removeAssociatedReference  not empty', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([], Validators.required)
      })
    ], Validators.required);
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

    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(null)
          })
        ], Validators.required)
      })
    ], Validators.required);

    component.complementaryDataControls.push(field);

    expect(
      component.selectComplementaryData(component.selectedField)
    ).toBeUndefined();
  });

  it('associateReference Ok', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);

    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.associateReference(24)).toBeUndefined();
    expect(component.associateReference(undefined!)).toBeUndefined();
  });

  it('associateReference empty', () => {

    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([], Validators.required)
      })
    ], Validators.required);

    component.getGroupArrayById(1).push(component.selectedField);

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

    component.getGroupArrayById(1).push(field);

    expect(component.associateReference(24)).toBeUndefined();
  });

  it('showToastMessage warning', () => {
    expect(
      component.showToastMessage(STATES.warning, 'Hola', 'Hola Mundo')
    ).toBeUndefined();
  });

  it('openModalInitializeRule OK', () => {
    let spy = jest.spyOn(component.dialog, 'open');
    component.openModalInitializeRule();
    expect(spy).toBeCalledTimes(1);
  });

  it('openModalValidateRule OK', () => {
    let spy = jest.spyOn(component.dialog, 'open');
    component.openModalValidateRule();
    expect(spy).toBeCalledTimes(1);
  });

  it('removeValidateRule  OK', () => {
    expect(component.removeValidateRule()).toBe(void 0);
  });

  it('removeInitializeRule   OK', () => {
    expect(component.removeInitializeRule()).toBe(void 0);
  });

  it('drop OK', () => {
    let event: any = {
      previousContainer: {
        data: {
          index: 1
        }
      },
      container: {
        data: {
          item: component.selectedField
        }
      }
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
    component.selectedField = component.fb.group({
      id: component.fb.control(1),
    })
    component.productService.modificationTypes = new FormArray([
    ]);
    component.productService.modificationTypes.push(
      component.fb.group({
        id: component.fb.control(1, Validators.required),
        description: component.fb.control('Plan básico', Validators.required),
        visibleNonModificableData: new FormArray([ component.fb.group ({
          id: component.fb.control(1),
          fields: new FormArray([
            component.fb.group({
              id: component.fb.control(1)
            })
          ]),
        })], Validators.required),
      })

    );
    const id: number = 1;
    expect(component.DeleteCascadeDateModify(id)).toBeUndefined();
  });

  it('setEssentialData', () => {
    const array = [
      {
        id: 1,
        name: 'test'
      }
    ];
    expect(component.setEssentialData(array)).toBeUndefined();
  });

  it('associateGroup', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([], Validators.required)
      })
    ], Validators.required);
    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.associateGroup(1)).toBeUndefined();
  });

  it('getMax', () => {
    let array: any[] = []
    expect(component.getMax(array, 'id')).toBe(0);
    array = [{id: 1}, {id: 2}]
    expect(component.getMax(array, 'id')).toBe(2);
  });

  it('getGroupBusinessCode', () => {
    expect(component.getGroupBusinessCode(1, 'name')).toBe('gd001_name');
    expect(component.getGroupBusinessCode(1, 'nametesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest')).toBe('gd001_testtesttesttesttesttest');
  });

  it('removeGroup', () => {
    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      fields: new FormArray([], Validators.required)
    });

    expect(component.removeGroup(group)).toBeUndefined();
  });

  it('isAvailableName', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);

    expect(component.isAvailableName('test')).toBeFalsy();
    expect(component.isAvailableName('test1')).toBeTruthy();
  });

  it('errorMessageName', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);
    expect(component.errorMessageName).toBe('Ingrese el nombre del grupo');
    component.formGroupTitle.get('groupTitle')?.setValue('#@');
    expect(component.errorMessageName).toBe('El nombre del grupo no recibe caracteres especiales');
    component.formGroupTitle.get('groupTitle')?.setValue('askjdnsajdnasjndkasjdnaksndksandkasjndkjasndksajndkjndkjnsajkdnsajdnjk1nkdjn2jkn21jn121kj2nk1jn21kjn121jn12k1n12kj2nkjn21kjn1kjn21j2n12j2n1k1nj21jk1n2jn12kjn12k1nj21kj2n1kj1n21kj2n1kjn12kj2n1kjn1kjn21kjn1k1n21jk2n21');
    expect(component.errorMessageName).toBe('La longitud máxima es de 200 caracteres');
    component.formGroupTitle.get('groupTitle')?.setValue('test');
    expect(component.errorMessageName).toBe('Ya existe un grupo con el nombre ingresado');
    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect(component.errorMessageName).toBe('');
  });

  it('addNewGroup', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Nuevo grupo'),
        isEditing: new FormControl(false),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);
    expect(component.addNewGroup()).toBeUndefined();
  });

  it('finishGroupEdit', () => {
    component.complementaryData = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test'),
        isEditing: new FormControl(false),
        fields: new FormArray([
          new FormGroup({
            id: new FormControl(25),
            name: new FormControl('test'),
            dependency: new FormControl(24)
          })
        ], Validators.required)
      })
    ], Validators.required);

    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      code: new FormControl(null),
      fields: new FormArray([], Validators.required)
    });

    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect(component.finishGroupEdit({target: { value: '123'}}, group)).toBeUndefined();
  });

  it('openDialogWizard', () => {
    expect(component.openDialogWizard(
      'ruleValidationControls',
      [],
      [],
      false,
      {},
      []
    )).toBeDefined();
  });
});


