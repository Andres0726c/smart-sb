import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { Observable, of } from 'rxjs';

import { RehabilitationDataComponent } from './rehabilitation-data.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialogModule } from '@angular/material/dialog';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('RehabilitationDataComponent', () => {
  let component: RehabilitationDataComponent;
  let fixture: ComponentFixture<RehabilitationDataComponent>;
  const errorResponseSpy = jest.fn().mockImplementation(() => {
    return new Observable(() => {
      throw new Error("error");
    })
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, HttpClientTestingModule, MatDialogModule],
      declarations: [],
      providers: [
        RehabilitationDataComponent,
        FormBuilder,
        DialogService,
        ProductService,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RehabilitationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('addRule', () => {
    const objRule: any = {
      rule: {
        id: 1,
        cdBusinessCode: 'test',
        name: 'test',
        nmVersion: 1,
        description: 'test',
        nmParameterList: [ { id: 1, name: 'test' } ],
        nmReturnList: 'string',
        cdRuleType: 'Cálculo',
        aplctnLvlItm: 'Cobertura',
        endPoint: 'url',
        rlEngnCd: 'test'
      },
      parameters: [
        { name: 'test', value: 'test' },
        { name: 'test2', value: 'test2' }
      ]
    };
    component.rulePrevValue = {rlCd: 'test'};
    component.productService.references.push(new FormControl({
      prdctDpndncyRef: 'rl',
      cd: 'test',
      uses: ['clcltnRl']
    }));
    expect(component.addRule('test', objRule)).toBeUndefined();
  });

  it('load context data', () => {
    const res = {
      dataHeader: { code: 200 },
      body: {
        nmValueList: [
          {
            "code": "prdct",
            "description": "Producto",
            "applctnLvl": [
              "*"
            ]
          }
        ]
      }
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeDefined();
  });

  it('load context data error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.loadContextData()).toBeDefined();
  });

  it('load causes', () => {
    const res = {
      dataHeader: { code: 200 },
      body: [
        {
          id: 1,
          code: 'test',
          name: 'test'
        }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.getCauses()).toBeDefined();
  });

  it('load causes error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.getCauses()).toBeDefined();
  });

  it('getAllFields', () => {
    component.productService.policyData.push(new FormGroup({
      id: new FormControl('1'),
      fields: new FormControl({businessCode: 'code', name: 'test'})
    }));
    expect(component.getAllFields()).toBeDefined();
  });

  it('getRulesDp', () => {
    component.productService.rnsttmntPrcss.get('clcltnRl')?.setValue([{id: 1, name: 'test'}]);
    expect(component.getRulesDp()).toBeDefined();
  });

  it('getParamValuesList', () => {
    component.productService.policyData.push(new FormGroup({
      id: new FormControl('1'),
      fields: new FormControl({businessCode: 'code', name: 'test'})
    }));
    component.contextData = [{code: 'code', description: 'test'}];
    expect(component.getParamValuesList()).toBeDefined();
  });

  it('verifyCsProcess', () => {
    expect(component.verifyCsProcess([])).toBeUndefined();
  });

  it('verifyCsProcess add dp', () => {
    const value = ['code'];
    component.causes = [{id: 1, businessCode: 'code', name: 'test'}];
    expect(component.verifyCsProcess(value)).toBeUndefined();
  });

  it('verifyCsProcess remove dp', () => {
    const value = ['test'];
    component.flagCsProcess = true;
    component.causesPrevValue = ['code', 'test'];
    component.causes = [{id: 1, businessCode: 'code', name: 'test'}];
    component.productService.references.push(new FormControl({
      prdctDpndncyRef: 'cs',
      cd: 'code',
      uses: ['test']
    }));
    expect(component.verifyCsProcess(value)).toBeUndefined();
  });

  it('removeRule', () => {
    const value = {rlCd: 'code'};
    component.productService.references.push(new FormControl({
      prdctDpndncyRef: 'rl',
      cd: 'code',
      uses: ['clcltnRl']
    }));
    expect(component.removeRule(value)).toBeUndefined();
  });

  it('removeCsProcess', () => {
    const value = 'code';
    component.productService.references.push(new FormControl({
      prdctDpndncyRef: 'cs',
      cd: 'code',
      uses: ['cnclltnCsCd']
    }));
    expect(component.removeCsProcess(value)).toBeUndefined();
  });
});
