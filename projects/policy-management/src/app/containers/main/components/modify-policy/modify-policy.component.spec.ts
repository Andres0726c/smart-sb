import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModifyPolicyComponent } from './modify-policy.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { ConsultPolicyService } from '../consult-policy/services/consult-policy.service';

describe('ModifyPolicyComponent', () => {
  let component: ModifyPolicyComponent;
  let fixture: ComponentFixture<ModifyPolicyComponent>;
  let productService: ProductService;
  let consultPolicyService: ConsultPolicyService;
  let formBuilderMock = new FormBuilder();
  let router: Router;

  let policies = [
    {
      idProduct: 126,
      productName: 'ProductoEmision',
      company: 'SEGUROS COMERCIALES BOLÍVAR S.A.',
      idPolicy: 18,
      policyNumber: '100000000000033',
      requestNumber: '37',
      insuranceLine: 'Hogar',
      inceptionDate: '2022-05-08T12:53:00-05:00',
      expirationDate: '2022-05-08T12:53:00-05:00',
      policyStatus: 'Activa',
      holderDocument: '1131345121',
      holderTypeDocument: '1',
      holderName: 'holderName',
      insuredDocument: '1131345121',
      insuredTypeDocument: '1',
      insuredName: 'insuredName',
    },
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ModifyPolicyComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ProductService,
        FormBuilder,
        ConsultPolicyService,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
      ]

    })
      .compileComponents();


    fixture = TestBed.createComponent(ModifyPolicyComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    consultPolicyService = TestBed.inject(ConsultPolicyService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancelModification', () => {
    const spy = jest.spyOn(router, 'navigate').mockImplementation();
    component.cancelModification()
    expect(spy).toBeCalled();
  });

  it('getProduct', () => {

    const res: ResponseDTO<Product> = {
      body: {
        id: 7,
        nmName: "nombre",
        dsDescription: "descripcion",
        nmHashCode: 3000
      },
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      },
    };

    let isLoading = false;
    let idProduct = 7;
    const spy = jest.spyOn(productService, 'getProductById').mockReturnValue(of(res));
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    const spy3 = jest.spyOn(component, 'fillRiskData').mockImplementation();
    component.policyDataControls;
    component.riskTypesControls;
    component.getProduct(idProduct)
    expect(spy).toBeCalled();
  });
  it('getPolicy', () => {
    const res: ResponseDTO<any> = {
      body: [policies],
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      },
    };
    let isLoading = true;
    let idPolicy = policies[0].idPolicy;

    const spy = jest.spyOn(productService, 'findByIdPolicy').mockReturnValue(of(res));
    const spy2 = jest.spyOn(component, 'mapData').mockImplementation();
    const spy3 = jest.spyOn(component, 'getProduct').mockImplementation();
    component.getPolicy();
    expect(spy).toBeCalled();
  });

  it('fillRiskData', () => {
    let riskTypes: any = [{
      id: 1,
      code: { businessCode: "aaa" },
      name: "abc",
      description: "abcd",
      complementaryData: {
        id: 1,
        name: "string",
        code: "string",
        fields: [],
      },
      businessPlans: []
    }];
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    component.fillRiskData(riskTypes);
    expect(spy2).toBeCalled();
  });

  it('saveModification', () => {
    let group: any = component.fb.array([]);
    component.getFieldsControls(group);
    component.getGroupsControls(group);
    component.getFieldsControlss(group);
    component.addControls(group);
    component.saveModification();
  });


  it('fillGroupData', () => {

    let riskTypes = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        { code: { businessCode: "abc" } }]
    }];

    let groupFG = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        {
          code: { businessCode: "abc" },
          dataTypeGui: 'List box'
        }]
    }];
    let groupFG1 = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        {
          code: { businessCode: "abc" },
          dataTypeGui: 'List box',
          options: [{
            id: undefined,
            name: undefined
          }],
          type: "Text box",
          value: null
        }]
    }];
    const spy = component.fillGroupData(groupFG, riskTypes);
    expect(spy.value).toEqual(groupFG1);
  });

  it('mapData',()=>{
    let riskTypes = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        { code: { businessCode: "abc" } }]
    }];

    let response=[
      { name: 'id', value: 7 },
      { name: 'code', value: 7 },
      { name: 'name', value: 'abc' },
      { name:'fields',value:[{code: { businessCode: "abc" }}]}
  ];
    const spy=component.mapData(riskTypes);
    expect(spy).toEqual(response);
  })
});
