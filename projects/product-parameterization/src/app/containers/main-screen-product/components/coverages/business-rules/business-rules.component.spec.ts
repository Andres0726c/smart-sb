import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessRulesComponent } from './business-rules.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('BusinessRulesComponent', () => {
  let component: BusinessRulesComponent;
  let fixture: ComponentFixture<BusinessRulesComponent>;
  let productService: ProductService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BusinessRulesComponent],
      providers: [
        BusinessRulesComponent,
        FormBuilder,
        DialogService,
        ProductService,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(BusinessRulesComponent);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    let res: any = {
      body: [
        {
          code: "prdct",
          description: 'Producto',
        },
      ]
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openDialogCoverageRules', () => {
    component.coverageRules = new FormGroup({
      selectionRule: new FormControl([], []),
      initializeRule: new FormControl([], []),
      validateRule: new FormControl([], []),
    });
    let code1 = 'ruleSelectionControls';
    let code2 = 'ruleInitializeControls';
    let code3 = 'ruleValidationControls';
    expect(component.openDialogCoverageRules(code1)).toBeUndefined();
    expect(component.openDialogCoverageRules(code2)).toBeUndefined();
    expect(component.openDialogCoverageRules(code3)).toBeUndefined();
  });

  it('addChip', () => {
    let code1 = 'ruleSelectionControls';
    let code2 = 'ruleInitializeControls';
    let code3 = 'ruleValidationControls';
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
    expect(component.addChip(code1, objrule)).toBeUndefined();
    expect(component.addChip(code2, objrule)).toBeUndefined();
    expect(component.addChip(code3, objrule)).toBeUndefined();
  });
});
