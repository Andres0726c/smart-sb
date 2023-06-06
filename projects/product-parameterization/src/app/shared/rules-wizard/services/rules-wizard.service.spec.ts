import { TestBed } from '@angular/core/testing';

import { RulesWizardService } from './rules-wizard.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';

describe('RulesWizardService', () => {
  let service: RulesWizardService;
  const errorResponseSpy = jest.fn().mockImplementation(() => {
    return new Observable(() => {
      throw new Error("error");
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
        providers: [ProductService, FormBuilder, DialogService]
    });
    service = TestBed.inject(RulesWizardService);
    service.contextData = [
      {
          "code": "prdct",
          "description": "Producto",
          "applctnLvl": [
              "*"
          ]
      },
      {
          "code": "vldtyPrd",
          "description": "Período de vigencia",
          "applctnLvl": [
              "*"
          ]
      },
      {
          "code": "rsk",
          "description": "Riesgo",
          "applctnLvl": [
              "Tipo de riesgo",
              "Cobertura"
          ]
      },
      {
          "code": "rskTyp",
          "description": "Tipo de riesgo",
          "applctnLvl": [
              "Tipo de riesgo",
              "Cobertura"
          ]
      },
      {
          "code": "cmmrclPln",
          "description": "Plan comercial",
          "applctnLvl": [
              "Cobertura"
          ]
      },
      {
          "code": "cvrg",
          "description": "Cobertura",
          "applctnLvl": [
              "Cobertura"
          ]
      },
      {
          "code": "ddctblVl",
          "description": "Deducible",
          "applctnLvl": [
              "Cobertura"
          ]
      },
      {
          "code": "prmmVl",
          "description": "Prima de la cobertura",
          "applctnLvl": [
              "Cobertura"
          ]
      },
      {
          "code": "prmmTyp",
          "description": "Tipo de prima de la cobertura",
          "applctnLvl": [
              "Cobertura"
          ]
      },
      {
          "code": "cntry",
          "description": "País",
          "applctnLvl": [
              "*"
          ]
      }
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('openRuleWizard', () => {
    expect(service.openRuleWizard('test', 'test', {rlCd: 'test'}, 'rhClcltnRl')).toBeUndefined();
  });

  it('getAllFields', () => {
    service.productService.policyData.push(new FormGroup({
      id: new FormControl('1'),
      fields: new FormControl({businessCode: 'code', name: 'test'})
    }));
    expect(service.getAllFields()).toBeDefined();
  });

  it('getRulesDp', () => {
    service.productService.rnsttmntPrcss.get('clcltnRl')?.setValue([{id: 1, name: 'test'}]);
    expect(service.getRulesDp()).toBeDefined();
  });

  it('getParamValuesList', () => {
    service.productService.policyData.push(new FormGroup({
      id: new FormControl('1'),
      fields: new FormControl({businessCode: 'code', name: 'test'})
    }));
    service.contextData = [{code: 'code', description: 'test'}];
    expect(service.getParamValuesList()).toBeDefined();
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
    //service.rulePrevValue = {rlCd: 'test'};
    service.productService.references.push(new FormControl({
      prdctDpndncyRef: 'rl',
      cd: 'test',
      uses: ['clcltnRl']
    }));
    expect(service.addRule('test', objRule, {rlCd: 'test'}, 'rhClcltnRl')).toBeUndefined();
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
    jest.spyOn(service.productService, 'getApiData').mockReturnValue(of(res));
    expect(service.loadContextData('test')).toBeDefined();
  });

  it('load context data error', () => {
    jest.spyOn(service.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(service.loadContextData('test')).toBeDefined();
  });
});
