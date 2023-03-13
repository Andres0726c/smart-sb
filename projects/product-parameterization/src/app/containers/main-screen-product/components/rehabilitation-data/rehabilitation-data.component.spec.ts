import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { of } from 'rxjs';

import { RehabilitationDataComponent } from './rehabilitation-data.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

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

describe('RehabilitationDataComponent', () => {
  let component: RehabilitationDataComponent;
  let productService: ProductService;
  let ref: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        RehabilitationDataComponent,
        FormBuilder,
        DialogService,
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
    component = TestBed.inject(RehabilitationDataComponent);
    productService = TestBed.inject(ProductService);
    ref = DialogService.prototype;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openRuleWizard Ok', () => {
    const refOpenSpy = jest.spyOn(ref, 'open');
    component.openRuleWizard('', '');
    expect(refOpenSpy).toHaveBeenCalled();
  });

  it('addRule Ok', () => {
    let objRule = {
      rule: {
        id: '',
        name: '',
        cdBusinessCode: '',
        description: '',
        cdRuleType: '',
        endPoint: '',
        rlEngnCd: '',
        argmntLst: '',
      },
    };

    expect(component.addRule('', objRule)).toBeUndefined();
  });

  it('loadContextData OK', async () => {
    let res: any = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
          nmValueList: 'test',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(res);
    expect(component.loadContextData()).toBeDefined();

    res = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
          nmValueList: 'test',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(res);
    expect(component.loadContextData()).toBeDefined();

    jest.spyOn(productService, 'getApiData').mockImplementation(() => {
      throw new Error('error');
    });
    expect(component.loadContextData()).toBeDefined();
  });

  it('getCauses Ok', () => {
    let res: any = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeDefined();

    res = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeDefined();

    jest.spyOn(productService, 'getApiData').mockImplementation(() => {
      throw new Error('error');
    });
    expect(component.loadContextData()).toBeDefined();
  });
});
