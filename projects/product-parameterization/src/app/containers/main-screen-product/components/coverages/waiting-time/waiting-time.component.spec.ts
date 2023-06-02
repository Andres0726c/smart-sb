import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingTimeComponent } from './waiting-time.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WaitingTimeService } from './service/waiting-time.service';

describe('WaitingTimeComponent', () => {
  let component: WaitingTimeComponent;
  let fixture: ComponentFixture<WaitingTimeComponent>;

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
      declarations: [WaitingTimeComponent],
      providers: [
        WaitingTimeComponent,
        FormBuilder,
        DialogService,
        WaitingTimeService,
        {
          provide: ProductService,
          useValue: {
            formWaitingTime: new FormArray([
              new FormGroup({
                quantity: new FormControl({ value: 0, disabled: true }),
                period: new FormControl({ value: 0, disabled: true }),
              }),
            ]),
          },
        },
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(WaitingTimeComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    component.formWaitingTime = new FormGroup({
      quantity: new FormControl({ value: 0, disabled: true }),
      period: new FormControl({ value: 0, disabled: true }),
    });

    expect(component.ngOnInit()).toBeUndefined();
  });

  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });

  it('Waiting Time is checked', () => {
    let form = new FormGroup({
      quantity: new FormControl({ value: '', disabled: true }),
      period: new FormControl({ value: '', disabled: true }),
    });
    setTimeout(() => {
      component.isTouchedForm(form, true);
      expect(form.get('quantity')?.enabled).toBeTruthy();
      expect(form.get('period')?.enabled).toBeTruthy();
    });
  });

  it('Waiting Time is unchecked', () => {
    let form = new FormGroup({
      quantity: new FormControl({ value: '12', disabled: true }),
      period: new FormControl({ value: 'dias', disabled: true }),
    });
    setTimeout(() => {
      component.isTouchedForm(form, false);
      expect(form.get('quantity')?.value).toEqual('12');
      expect(form.get('period')?.value).toEqual('dias');
      expect(form.get('period')?.disabled).toBeTruthy();
      expect(form.get('period')?.disabled).toBeTruthy();
    });
  });

  it('format input quantity', () => {
    let form = new FormGroup({
      quantity: new FormControl({ value: '57', disabled: true }),
    });
    component.changeInputNumber(form, 'quantity');
    expect(form.get('quantity')?.value).toEqual('57');
  });

  it('isTouchedFormEnable', () => {
    let form = new FormGroup({
      quantity: new FormControl({ value: '12', disabled: true }),
      period: new FormControl({ value: 'dias', disabled: true }),
    });
    let checked = true;
    let checked2 = false;
    expect(component.isTouchedFormEnable(form, checked));
    expect(component.isTouchedFormEnable(form, checked2));
  });

  it('setValidators', () => {
    let form = new FormGroup({
      quantity: new FormControl({ value: '12', disabled: true }),
      period: new FormControl({ value: 'dias', disabled: true }),
    });
    let field = 'dia';
    let field2 = 'mes';
    let field3 = 'anio';
    expect(component.setValidators(form, field)).toBeUndefined();
    expect(component.setValidators(form, field2)).toBeUndefined();
    expect(component.setValidators(form, field3)).toBeUndefined();
  });
});
