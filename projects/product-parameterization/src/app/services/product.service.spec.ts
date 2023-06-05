import { ProductService } from './product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl,FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppHttpResponse } from '../core/model/app-http-response.model';
describe('ProductService', () => {
  let component: ProductService;
  let fixture: ComponentFixture<ProductService>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
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
          useValue: new dialogMock()
        },{
          provide: MatSnackBar,
          useValue: new toastMock()
        },FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ProductService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
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

  it('getCoverageById when id is 1',()=>{
    component.coverages= new FormArray([
      new FormGroup({
        id:new FormControl(1)
      })
    ]);
    component.getCoverageById (1);
  })

  it('servicePlans  when id is 1',()=>{
    component.servicePlans= new FormArray([
      new FormGroup({
        id:new FormControl(1)
      })
    ]);
    component.getServicePlanById  (1);
  })

  
  it('getConceptReservationById   when id is 1',()=>{
    component.conceptReservation= new FormArray([
      new FormGroup({
        id:new FormControl(1)
      })
    ]);
    component.getConceptReservationById(1);
  })


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

  it('enableSaveButton when is defined', () => {
    component.initialParameters= new FormGroup({
      commercialName: new FormControl('name'),
      insuranceLine: new FormControl('23')
    });
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

  it('saveProduct when is not null', () => {

    
      component.initialParameters=new FormGroup({
        productName: new FormControl('test'),
        commercialName: new FormControl('test'),
        businessCode: new FormControl("test"),
        insuranceLine: new FormControl("23"),
        productJson: new FormControl(component.getProductObject())
      });
 
      const expectedResponse = { status: 200, body: { Product: {productJson:'id=1' }} };

      jest.spyOn(httpClient,'post').mockReturnValue(of(expectedResponse))
      jest.spyOn(component,'saveProductJSON').mockImplementation();

    expect(component.saveProduct(false)).toBeUndefined();
  
  });
it('saveProductJSON when is true',()=>{
  jest.spyOn(component,'isSomeRelationEmpty').mockReturnValue(true);
  jest.spyOn(component,'showErrorMessage').mockImplementation();

  component.saveProductJSON(true);
})
it('saveProductJSON when  isSomeRelationIncomplete is true ',()=>{
  jest.spyOn(component,'isSomeRelationEmpty').mockReturnValue(false);
  jest.spyOn(component,'isSomeRelationIncomplete').mockReturnValue(true);
  jest.spyOn(component,'showErrorMessage').mockImplementation();

  component.saveProductJSON(true);
})
it('showErrorMessage',()=>{
  component.showErrorMessage('','');
})
  it('getApiData ',()=>{
    component.getApiData ('','','2')
  })
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

  it('getProductOld',()=>{
    let product= {
      initialParameters: new FormArray([]),
      policyData: new FormArray([]),
      coverages: new FormArray([]),
      servicePlans: new FormArray([]),
      riskTypes: new FormArray([]),
      taxesCategories: new FormArray([]),
      technicalControls: new FormArray([]),
      modificationTechnicalControls: new FormArray([]),
      clauses: new FormArray([]),
      accumulation: new FormArray([]),
      conceptReservation: new FormArray([]),
      claimData: new FormArray([]),
      claimTechnicalControls: new FormArray([]),
      modificationTypes: new FormArray([])
      };

    const spy= jest.spyOn(component,'setFields').mockImplementation();
    component.getProductOld(product);
    //expect(spy).toBeCalled();
  });

  it('getProductOld when product is null',()=>{
    let product= new FormGroup({});

    component.getProductOld(product);
  })
  it('getProductCanonical',()=>{
    let product= {
      mdfctnPrcss: new FormArray([]),
      cnclltnPrcss: new FormArray([]),
      rnsttmntPrcss: {},
      rnwlPrcss:{},
      prdctDpndncy: new FormArray([]),
      prvwDt: new FormArray([])
      };
    jest.spyOn(component,'setFields').mockReturnValue(new FormGroup({}));
    jest.spyOn(component,'addControlField').mockImplementation();
    component.getProductCanonical(product);
    //expect(spy).toBeCalled();

  });

  it('validatemModificationTypes',()=>{
    let product= {
      modificationTypes: new FormArray([
        new FormGroup({
          id:new FormControl(1),
          visibleNonModificableData: new FormControl(true),
          code: new FormControl("a")
        }),
        new FormGroup({
          id:new FormControl(2),
          visibleNonModificableData: new FormControl(true),
          code: new FormControl("b")
        })
      ])
      };

      component.modificationTypes= new FormArray([
        new FormGroup({
          id:new FormControl(1),
          visibleNonModificableData: new FormArray([
            new FormGroup({
              code: new FormControl("abc")
            })
          ]),
          code: new FormControl("a")
        })
      ])
      jest.spyOn(component,'setFields').mockImplementation();
    component.validatemModificationTypes(product);
  })

  it('validatePrvwDt',()=>{
    component.prvwDt= new FormGroup({ })
    component.validatePrvwDt();
  });
  it('downloadFile',()=>{
    const expectedResponse = { dataHeader:{code: 200}, body: { Product: {productJson:'id=1' }} };

    jest.spyOn(httpClient,'get').mockReturnValue(of(expectedResponse));
    component.downloadFile('productest');
  })
  it('downloadFile when code is not 200',()=>{
    const expectedResponse = { dataHeader:{code: 100}, body: { Product: {productJson:'id=1' }} };

    jest.spyOn(httpClient,'get').mockReturnValue(of(expectedResponse));
    component.downloadFile('productest');
  })
  it('registerFormEvent',()=>{
    let formInstance: any= [
      new FormArray( [new FormGroup({
        id: new FormControl(1)
      })
    ])
    ];
    jest.spyOn(component,'saveProduct').mockImplementation();
    component.registerFormEvent(formInstance);
  })
});
