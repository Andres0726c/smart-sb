import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModifyPolicyComponent } from './modify-policy.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';

describe('ModifyPolicyComponent', () => {
  let component: ModifyPolicyComponent;
  let fixture: ComponentFixture<ModifyPolicyComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  let router: Router;


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
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('policyDataControls', () => {
    let policyNumber = component.formPolicy.controls['policyNumber']; 
    let group: any = component.fb.array([]);


    component.getFieldsControls(group);
    expect(policyNumber).toBeFalsy(); 
    component.getGroupsControls(group);
    expect(policyNumber).toBeFalsy(); 
    component.getFieldsControlss(group);
    expect(policyNumber).toBeFalsy(); 
    
    component.addControls(group);
    expect(policyNumber).toBeFalsy(); 


    
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


    let idProduct = 7;
    const spy = jest.spyOn(productService, 'getProductById').mockReturnValue(of(res));
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    const spy3 = jest.spyOn(component, 'fillRiskData').mockImplementation();

    component.getProduct(idProduct)
    expect(spy).toBeCalled();
  });
  it('getPolicy', () => {
    const res: ResponseDTO<any> = {
      body: ['policy'],
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
    let idPolicy = 100;
    const spy = jest.spyOn(productService, 'findByIdPolicy').mockReturnValue(of(res));
    const spy2 = jest.spyOn(component, 'mapData').mockImplementation();
    const spy3 = jest.spyOn(component, 'getProduct').mockImplementation();
    component.getPolicy();
    expect(spy).toBeCalled();
  });

  it('fillRiskData',()=>{
    let riskTypes:any="";
    let risksArrayData: any = component.fb.array([]);
    component.fillRiskData(riskTypes);
  });

  it('saveModification',()=>{
  component.saveModification();
  });
});
