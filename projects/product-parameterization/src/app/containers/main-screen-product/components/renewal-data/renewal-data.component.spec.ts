import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { Observable, of } from 'rxjs';
import { RenewalDataComponent } from './renewal-data.component';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('RenewalDataComponent', () => {
  let component: RenewalDataComponent;
  let fixture: ComponentFixture<RenewalDataComponent>;
  const errorResponseSpy = jest.fn().mockImplementation(() => {
    return new Observable(() => {
      throw new Error("error");
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalDataComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        ProductService,
        FormBuilder,
        DialogService,
        MessageService,
        {
          provide: MatDialog,
          useValue: new DialogMock()
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.loadCauses()).toBeUndefined();
  });

  it('load causes error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.loadCauses()).toBeUndefined();
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
    expect(component.loadContextData()).toBeUndefined();
  });

  it('load context data error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.loadContextData()).toBeUndefined();
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

  it('getAllFields', () => {
    component.productService.policyData.push(new FormGroup({
      id: new FormControl('1'),
      fields: new FormControl({businessCode: 'code', name: 'test'})
    }));
    expect(component.getAllFields()).toBeDefined();
  });

  it('getRulesDp', () => {
    component.productService.rnwlPrcss.get('clcltnRl')?.setValue([{id: 1, name: 'test'}]);
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

});
