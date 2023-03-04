import { ConsultPolicyService } from '../../consult-policy/services/consult-policy.service';
import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, Subscription } from 'rxjs';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { FilterPolicyFailedTopComponent } from './filter-policy-failed-top.component';

describe('FilterPolicyFailedTopComponent', () => {
  let component: FilterPolicyFailedTopComponent;
  let productService:ProductService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [
        FilterPolicyFailedTopComponent,
        FormBuilder,
        ProductService,
        {
          provide: ProductService,
          useValue: {
            getAllProductsByCompany: () => of([]),
            getApiData: () => of([]),
          }
        },
        {
          provide: ConsultPolicyService,
          useValue: {
            getDocumentType: () => of([]),
          },
        }
      ],
    });
    productService = TestBed.inject(ProductService);
    component = TestBed.inject(FilterPolicyFailedTopComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search error all fields empty', () => {
    component.search();
    expect(component.errorAllForm).toBeTruthy();
  });

  it('search success', () => {
    component.smartCorePolicyNumber.setValue('100000000000010');
    component.formQueryFilter.get('startDate')?.setValue(null)
    component.search();
    expect(component.errorAllForm).toBeFalsy();
  });

  it('search success', () => {
    component.tronPolicyNumber.setValue('100000000000010');
    component.formQueryFilter.get('startDate')?.setValue(null)
    component.search();
    expect(component.errorAllForm).toBeFalsy();
  });


  it('validate policyNumber fields valid', () => {
    component.smartCorePolicyNumber.setValue('policy number');
    expect(component.validForm()).toBeFalsy();
  });

  it('validate all fields empty', () => {
    expect(component.validForm()).toBeTruthy();
  });

  it('cleanFilter', () => {
    component.smartCorePolicyNumber.setValue('test');
    component.cleanFilter();
    expect(component.smartCorePolicyNumber.value).toEqual('');
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



  it('setData', () => {
    let res: any = { body:'' };
    const spy = component.setData(res, 'city');
    const spy2 = jest.spyOn(component, 'addToElementData').mockImplementation();
    expect(spy).toBeUndefined();
    expect(spy2).toBeDefined();
  });

  it('addToElementData', () => {
    let res: any = { body: [{ code: 'abc', description: 'abc' }, { code: 'bcd', description: 'bcd' }] };
    const spy = component.setData(res, 'city');
    const spy2 = jest.spyOn(component, 'addToElementData').mockImplementation();
    expect(spy).toBeUndefined();
    expect(spy2).toBeDefined();
  });
});
