import { ProductService } from './product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
describe('ProductService', () => {
  let component: ProductService;
  let fixture: ComponentFixture<ProductService>;

  class toastMock {
    openFromComponent() {} 
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      declarations: [],
      providers: [ProductService,
        {
          provide: MatDialog,
          useValue: {}
        },{
          provide: MatSnackBar,
          useValue: new toastMock()
        },FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('coveragesControls', () => {
    expect(component.coveragesControls).toBeDefined();
  });

  it('servicePlansControls', () => {
    expect(component.servicePlansControls).toBeDefined();
  });

  it('riskTypesControls', () => {
    expect(component.riskTypesControls).toBeDefined();
  });

  it('technicalControlsControls', () => {
    expect(component.technicalControls).toBeDefined();
  });

  it('taxesCategoriesControls', () => {
    expect(component.taxesCategoriesControls).toBeDefined();
  });

  it('isEnabledSave', () => {
    expect(component.isEnabledSave).toBeTruthy();
  });
  
  it('getProduct', () => {
    const obj = {
      initialParameters: {},
      policyData: [{
        name: 'Test'
      }],
      coverages: [
        {
          complementaryData: [{
            name : 'test'
          }],
          payRollData : [{
            name: 'test'
          }]
        }
      ],
      riskTypes: [
        {
          complementaryData: [{
            name : 'test'
          }],
        }
      ],
      claimData : [{
        name: 'Test'
      }]
    };
    expect(component.getProduct(JSON.stringify(obj))).toBeDefined();
  });

  it('enableSaveButton', () => {
    expect(component.enableSaveButton()).toBeDefined();
  });

  it('noProductChanges ', () => {
    let obj1: any = {a: 'testValueA', b: 'testValueB'};
    let obj2: any = {a: 'testValueA', b: 'testValueB'};
    expect(component.noProductChanges(obj1, obj2)).toBeTruthy();
    obj1 = {a: 'testValueA', b: {a: 'testValueA', b: 'testValueB'}};
    obj2 = {a: 'testValueA', b: {a: 'testValueA', b: 'testValueB'}};
    expect(component.noProductChanges(obj1, obj2)).toBeTruthy();
    obj1 = {a: 'testValueA', b: {a: 'testValueA', b: 'testValueC'}};
    obj2 = {a: 'testValueA', b: {a: 'testValueA', b: 'testValueB'}};
    expect(component.noProductChanges(obj1, obj2)).toBeFalsy();
    obj1 = {a: 'testValueC', b: 'testValueB'};
    expect(component.noProductChanges(obj1, obj2)).toBeFalsy();
    obj1 = {b: 'testValueB'};
    expect(component.noProductChanges(obj1, obj2)).toBeFalsy();
  });

  it('setFormArrayValue', () => {
    expect(component.setFormArrayValue('selectedProcess', [])).toBeDefined();
    expect(component.setFormArrayValue('policyData', [{ id: 1, name: 'test' }])).toBeDefined();
    expect(component.setFormArrayValue('test', { id: 1, name: 'test' })).toBeDefined();
  });

  it('setFields', () => {
    expect(component.setFields('selectedProcess', [])).toBeDefined();
    expect(component.setFields('policyData', { id: 1, name: 'test' })).toBeDefined();
    expect(component.setFields('test', 'test')).toBeDefined();
  });

  it('saveProduct', () => {
    expect(component.saveProduct(false)).toBeUndefined();
  });

  it('isSomeRelationEmpty', () => {
    const product = {
      coverages: [
        {
          claimReservation: [
            {
              id: 1,
              cause: {
                id: null
              },
              relCauseConcept: []
            }
          ]
        }
      ]
    };
    expect(component.isSomeRelationEmpty(product)).toBeTruthy();
  });

  it('isSomeRelationIncomplete', () => {
    const product = {
      coverages: [
        {
          claimReservation: [
            {
              id: 1,
              cause: {
                id: null
              },
              relCauseConcept: []
            }
          ]
        }
      ]
    };
    expect(component.isSomeRelationIncomplete(product)).toBeTruthy();
  });

  it('isEnabledSave', () => {
    expect(component.isEnabledSave).toBeDefined();
  });

  it('setProductDependency', () => {
    component.setProductDependency('cs', {id: 2, cd: 'test2', name: 'test2'});
    expect(component.setProductDependency('cs', {id: 1, cd: 'test', name: 'test'})).toBeUndefined();
  });

  it('getProductDependency', () => {
    component.setProductDependency('cs', {id: 1, cd: 'test', name: 'test'});
    expect(component.getProductDependency('cs', 'test')).toEqual({id: 1, cd: 'test', name: 'test'});
  });

  it('deleteProductDependency', () => {
    expect(component.deleteProductDependency('cs', 'test')).toBeUndefined();
  });

  it('setDependencyRef', () => {
    expect(component.setDependencyRef('cs', 'test', 'test')).toBeUndefined();
  });

  it('setDependencyRef else', () => {
    component.references.push(new FormControl({prdctDpndncyRef: "cs", cd: "test", uses: ["test2"]}));
    expect(component.setDependencyRef('cs', 'test', 'test')).toBeUndefined();
  });

  it('deleteDependencyRef', () => {
    component.setProductDependency('cs', {id: 1, cd: 'test', name: 'test'});
    component.references.push(new FormControl({prdctDpndncyRef: "cs", cd: "test", uses: ["test2"]}));
    expect(component.deleteDependencyRef('cs', 'test', 'test2')).toBeUndefined();
  });

});
