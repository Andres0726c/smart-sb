import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationDataComponent } from './cancellation-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

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
  cnclltnPrcss: new FormGroup({
    enabled: new FormControl(false),
    cnclltnCsCd: new FormControl([]),
    clcltnRl: new FormControl([]),
    isCncllblIncptnDt: new FormControl(false)
  }),
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
describe('CancellationDataComponent', () => {
  let component: CancellationDataComponent;
  let fixture: ComponentFixture<CancellationDataComponent>;
  let ref: DialogService;
  let productService: ProductService;

  beforeEach(() => {
    ref = DialogService.prototype;
    TestBed.configureTestingModule({
      declarations: [CancellationDataComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule],
      providers: [
        CancellationDataComponent,
        FormBuilder,
        DialogService,
        MessageService,
        {
          provide: ProductService,
          useValue: ProductServiceMock,
        },
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        { provide: DynamicDialogRef, useValue: { onClose: of(true) } },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    component = TestBed.inject(CancellationDataComponent);
    productService = TestBed.inject(ProductService);
    productService.companyId = '3';
    productService.initialParameters?.get('insuranceLine')?.setValue('22');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    expect(component.ngOnInit()).toBeUndefined();
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
