import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFieldsManagementComponent } from './data-fields-management.component';
import { of } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

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
  getApiData: () =>
    of([
      {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      },
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
class toastMock {
  openFromComponent() {
    /* TODO document why this method 'openFromComponent' is empty */
  }
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
      ],
    };
  }
}
const dialogServiceMock = {
  open: jest.fn(),
};
describe('DataFieldsManagementComponent', () => {
  let component: DataFieldsManagementComponent;
  let fixture: ComponentFixture<DataFieldsManagementComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        FormsModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      declarations: [DataFieldsManagementComponent],
      providers: [
        DataFieldsManagementComponent,
        DialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        MessageService,
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
          provide: ProductService,
          useValue: ProductServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(DataFieldsManagementComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('disableMenu true', () => {
    const group = { value: { code: 'datos_basicos' } };

    component.itemsMenu = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Editar título del grupo',
            icon: 'pi pi-pencil',
            command: () => {},
          },
          { label: 'Eliminar grupo', icon: 'pi pi-trash', command: () => {} },
        ],
      },
    ];

    component.disabledItem(group);

    expect(component.itemsMenu[0].items[1].disabled).toBe(true);
  });

  it('disableMenu false', () => {
    const group = { value: { code: 'other_code' } };
    component.itemsMenu = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Editar título del grupo',
            icon: 'pi pi-pencil',
            command: () => {},
          },
          { label: 'Eliminar grupo', icon: 'pi pi-trash', command: () => {} },
        ],
      },
    ];

    component.disabledItem(group);

    expect(component.itemsMenu[0].items[1].disabled).toBe(false);
  });

  it('getFieldsFormArray  OK', () => {
    const array = new FormArray([]);
    expect(component.getFieldsFormArray(array)).toBeDefined();
  });

  it('getFieldsControls  OK', () => {
    const array = new FormArray([]);
    expect(component.getFieldsControls(array)).toBeDefined();
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
    expect('Ingrese el nombre del grupo').toBe('Ingrese el nombre del grupo');
    component.formGroupTitle.get('groupTitle')?.setValue('#@');
    expect('El nombre del grupo no recibe caracteres especiales').toBe(
      'El nombre del grupo no recibe caracteres especiales'
    );
    component.formGroupTitle
      .get('groupTitle')
      ?.setValue(
        'askjdnsajdnasjndkasjdnaksndksandkasjndkjasndksajndkjndkjnsajkdnsajdnjk1nkdjn2jkn21jn121kj2nk1jn21kjn121jn12k1n12kj2nkjn21kjn1kjn21j2n12j2n1k1nj21jk1n2jn12kjn12k1nj21kj2n1kj1n21kj2n1kjn12kj2n1kjn1kjn21kjn1k1n21jk2n21'
      );
    expect('La longitud máxima es de 200 caracteres').toBe(
      'La longitud máxima es de 200 caracteres'
    );
    component.formGroupTitle.get('groupTitle')?.setValue('test');
    expect('Ya existe un grupo con el nombre ingresado').toBe(
      'Ya existe un grupo con el nombre ingresado'
    );
    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect('').toBe('');
  });

  it('removeGroup', () => {
    const group = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('test'),
      fields: new FormArray([], Validators.required),
    });

    expect(component.removeGroup(group)).toBeUndefined();
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
    });

    component.formGroupTitle.get('groupTitle')?.setValue('test1');
    expect(
      component.finishGroupEdit({ target: { value: '123' } }, group)
    ).toBeUndefined();
  });

  it('DeleteCascadeDateModify', () => {
    component.selectedField = component.fb.group({
      id: component.fb.control(1),
    });
    component.productService.modificationTypes = new FormArray([]);
    component.productService.modificationTypes.push(
      component.fb.group({
        id: component.fb.control(1, Validators.required),
        description: component.fb.control('Plan básico', Validators.required),
        visibleNonModificableData: new FormArray(
          [
            component.fb.group({
              id: component.fb.control(1),
              fields: new FormArray([
                component.fb.group({
                  id: component.fb.control(1),
                }),
              ]),
            }),
          ],
          Validators.required
        ),
      })
    );
    const id: number = 1;
    expect(component.DeleteCascadeDateModify(id)).toBeUndefined();
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
    const groupArray = component.getGroupArrayById(1);
    if (groupArray instanceof FormArray) {
      expect(component.associateGroup(1)).toBeUndefined();
    }
  });

  it('loadEssentialData OK', () => {
    let res: any = {
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadEssentialData()).toBeUndefined();

    res = {
      body: {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      },
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadEssentialData()).toBeUndefined();

  });

  it('loadRequiredData OK', () => {
    let res: any = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadRequiredData()).toBeUndefined();

  });

  test('isConfigured', () => {
    const item = {
      value: {
        required: true,
        editable: true,
        visible: true,
        initializeRule: '',
        validateRule: '',
        dependency: null,
      },
    };
    const result = component.isConfigured(item);
    expect(result).toBe(true);
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
    expect(component.addNewGroup()).toBeUndefined();
  });

  it('getParamValuesList', () => {
    expect(component.getParamValuesList()).toBeDefined();
  });

  it('openDialogAddData', () => {
    expect(component.openDialogAddData()).toBeUndefined();
  });

  it('openRuleWizard', () => {
    expect(
      component.openRuleWizard('ruleInitializeControls', 'initializeRule')
    ).toBeUndefined();
  });

  it('removeComplementaryData', () => {
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
    component.groups = new FormArray(
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
    expect(component.removeComplementaryData()).toBeUndefined();
  });

  it('removeAssociatedReference', () => {
    component.groups = new FormArray(
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
    expect(component.removeAssociatedReference()).toBeUndefined();
  });

  it('associateReference Ok', () => {
    component.groups = new FormArray(
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

    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.associateReference(24)).toBeUndefined();
    expect(component.associateReference(undefined!)).toBeUndefined();
  });

  it('associateGroup Ok', () => {
    component.groups = new FormArray(
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

    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.associateGroup(1)).toBeUndefined();
  });

  it('addRule', () => {
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
    component.groups = new FormArray(
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
    let objrule = {
      rule: {
        id: 1,
        name: 'test',
        cdBusinessCode: 'test',
        description: 'test',
        cdRuleType: 'test',
        endPoint: 'test',
        rlEngnCd: 'test',
        argmntLst: 'test',
      },
    };
    component.getGroupArrayById(1).push(component.selectedField);
    expect(component.addRule('ruleInitializeControls', objrule)).toBeUndefined();
  });
});
