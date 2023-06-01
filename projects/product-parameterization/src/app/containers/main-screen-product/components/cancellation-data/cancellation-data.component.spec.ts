import { ComponentFixture,
  fakeAsync,
  TestBed,
  tick
 } from '@angular/core/testing';

import { CancellationDataComponent } from './cancellation-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  
} from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { endWith, Observable, of } from 'rxjs';
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
            code:'test',
            description: 'description test return',
          },
        ]),
    };
  }
}

describe('CancellationDataComponent', () => {
  let component: CancellationDataComponent;
  let fixture: ComponentFixture<CancellationDataComponent>;
  let productService:ProductService;
  let dialogService:DialogService;
  let matDialog:MatDialog;

  const errorResponseSpy = jest.fn().mockImplementation(() => {
    return new Observable(() => {
      throw new Error("error");
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancellationDataComponent],
      imports: [HttpClientTestingModule, HttpClientModule, FormsModule, MatDialogModule],
      providers: [
        CancellationDataComponent,
        FormBuilder,
        DialogService,
        MessageService,
        ProductService,
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

    fixture = TestBed.createComponent(CancellationDataComponent);
    productService= TestBed.inject(ProductService);
    dialogService = TestBed.inject(DialogService);
    matDialog = TestBed.inject(MatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', async() => {
    expect(component.ngOnInit()).toBeDefined();
  });

it('findRmsDpndncy',()=>{
  component.rmsDpndncy=[{id:'23',insrncLn:'23'}]
  component.findRmsDpndncy();
});

it('openRuleWizard',()=>{
  jest.spyOn(component,'getRulesDp').mockImplementation();


   let spy= jest.spyOn(dialogService,'open');
  
  component.openRuleWizard('test','test');
})
  it('addRule', () => {
    (<FormArray>component.productService.prdctDpndncy.get('insrncLn')).push(new FormControl({id: 1, cd: 'test'}));
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
    component.rulePrevValue = [{rlCd: 'test'}];
    jest.spyOn(productService,'deleteDependencyRef').mockImplementation()
    component.productService.references.push(new FormControl({
      prdctDpndncyRef: 'rl',
      cd: 'test',
      uses: ['cnClcltnRl']
    }));
    expect(component.addRule('test', objRule)).toBeUndefined();
  });

  it('loadContextData OK', async () => {
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

  it('getCauses Ok', () => {
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
    expect(component.loadContextData()).toBeDefined();
  });



  it('getCauses when initialParameter have insuranceLine',()=>{
    component.productService.initialParameters= new FormGroup({
      insuranceLine: new FormControl('23') 
    })

    component.getCauses();
  })
  it('getCauses when insuranceLine is null',()=>{
    component.productService.initialParameters= new FormGroup({
      insuranceLine: new FormControl(null) 
    })

    component.getCauses();
  })
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
    component.productService.cnclltnPrcss.get('clcltnRl')?.setValue([{id: 1, name: 'test'}]);
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
      uses: ['cnClcltnRl']
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
