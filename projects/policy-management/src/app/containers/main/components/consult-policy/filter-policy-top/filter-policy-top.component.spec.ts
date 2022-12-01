import { ConsultPolicyService } from './../services/consult-policy.service';
import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterPolicyTopComponent } from './filter-policy-top.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

describe('FilterPolicyTopComponent', () => {
  let component: FilterPolicyTopComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        FilterPolicyTopComponent,
        FormBuilder,
        {
          provide: ProductService,
          useValue: {
            getAllProductsByCompany: () => of([]),
          },
        },
        {
          provide: ConsultPolicyService,
          useValue: {
            getDocumentType: () => of([]),
          },
        },
      ],
    });
    component = TestBed.inject(FilterPolicyTopComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate Fields return true', () => {
    component.holderDocumentType.setValue('document');
    component.holderDocumentNumber.setValue('document');
    expect(
      component.validateFields({
        type: 'holderdocumentType',
        number: 'holderdocumentNumber',
      })
    ).toBeTruthy();
  });

  it('validate Fields return false', () => {
    component.holderDocumentType.setValue('document');
    expect(
      component.validateFields({
        type: 'holderdocumentType',
        number: 'holderdocumentNumber',
      })
    ).toBeFalsy();
  });

  it('validate Fields return false', () => {
    component.holderDocumentNumber.setValue('document');
    expect(
      component.validateFields({
        type: 'holderdocumentType',
        number: 'holderdocumentNumber',
      })
    ).toBeFalsy();
  });

  it('validate Fields return false', () => {
    component.holderDocumentNumber.setValue('document');
    expect(
      component.validateFields({
        type: '',
        number: '',
      })
    ).toBeFalsy();
  });

  it('seeMore', () => {
    component.seeMore();
    expect(component.showMoreFilters).toBeTruthy();
  });

  xit('search error all fields empty', () => {
    component.search();
    expect(component.errorAllForm).toBeTruthy();
  });

  it('search success', () => {
    component.policyNumber.setValue('100000000000010');
    component.search();
    expect(component.errorAllForm).toBeFalsy();
  });

  it('validate holder fields valid', () => {
    component.holderDocumentNumber.setValue('holder document number');
    component.holderDocumentType.setValue('holder document type');
    expect(component.validForm()).toBeFalsy();
  });

  it('validate insured fields valid', () => {
    component.insuredDocumentNumber.setValue('insured document number');
    component.insuredDocumentType.setValue('insured document type');
    expect(component.validForm()).toBeFalsy();
  });

  it('validate policyNumber fields valid', () => {
    component.policyNumber.setValue('policy number');
    expect(component.validForm()).toBeFalsy();
  });

  xit('validate all fields empty', () => {
    expect(component.validForm()).toBeTruthy();
  });

  it('cleanFilter', () => {
    component.policyNumber.setValue('test');
    component.cleanFilter();
    expect(component.policyNumber.value).toEqual('');
  });

  it('clear fields when namme doesnt exist', () => {
    component.clearFields({ type: '', number: '' });
  });

  it('clear dropdown with x', () => {
    component.formQueryFilter.get('idProduct')?.setValue('test idProduct');
    component.onClearField('idProduct');
    expect(component.formQueryFilter.value.idProduct).toEqual('');
  });

  it('clear dropdown with field doesnt exist', () => {
    component.onClearField('noExist');
    expect(component.formQueryFilter.value.noExist).toEqual(undefined);
  });
});
