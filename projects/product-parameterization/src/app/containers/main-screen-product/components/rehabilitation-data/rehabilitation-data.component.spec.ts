import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
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
