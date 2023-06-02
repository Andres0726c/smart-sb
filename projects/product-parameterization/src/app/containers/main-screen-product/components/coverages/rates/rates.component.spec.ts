import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesComponent } from './rates.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';

describe('RatesComponent', () => {
  let component: RatesComponent;
  let fixture: ComponentFixture<RatesComponent>;
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
      declarations: [RatesComponent],
      providers: [
        RatesComponent,
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

    component = TestBed.inject(RatesComponent);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnChanges({});
    expect(component).toBeDefined();
  });

  it('Componente inicializado', () => {
    let res: any = {
      body: [
        {
          code: 'prdct',
          description: 'Producto',
        },
      ],
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue(of(res));
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openDialogCoverageRules', () => {
    expect(component.openModalCalculationRule()).toBeUndefined();
  });

  it('addChip', () => {
    let code1 = 'test';

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
  });

  it('removeRule', () => {
    expect(component.removeRule()).toBeUndefined();
  });
});