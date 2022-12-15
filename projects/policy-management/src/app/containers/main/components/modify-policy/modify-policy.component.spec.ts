import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModifyPolicyComponent } from './modify-policy.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    let riskTypes = component.fb.array([]);
    component.addControls(riskTypes);
    component.getFieldsControls(riskTypes);
    component.getGroupsControls(riskTypes);
    component.saveModification();
  });


  it('fillGroupData', () => {

    let riskTypes = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        {
          code: { businessCode: "abc" },
          dataType: { guiComponent: 'List box' }
        }]
    }];

    let groupFG = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        {
          code: { businessCode: "abc" },
          dataType: { guiComponent: 'List box' },
        }]
    }];
    let groupFG1 = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        {
          code: { businessCode: "abc" },
          dataType: { guiComponent: 'List box' },
          options: [{
            id: undefined,
            name: undefined
          }],
          value: null
        }]
    }];
    const spy = component.fillGroupData(groupFG, riskTypes);
    expect(spy.value).toEqual(groupFG1);
  });

  it('mapData', () => {
    let riskTypes = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        { code: { businessCode: "abc" } }]
    }];

    let response = [
      { name: 'id', value: 7 },
      { name: 'code', value: 7 },
      { name: 'name', value: 'abc' },
      { name: 'fields', value: [{ code: { businessCode: "abc" } }] }
    ];
    const spy = component.mapData(riskTypes);
    expect(spy).toEqual(response);
  });

  it('reverseMap', () => {

    const groupData = [
      {
        plcy: {
          plcyDtGrp: [
            {
              id: 1,
              name: "Datos básicos",
              code: "datos_basicos",
              fields: [
                {
                  id: 67,
                  code: {
                    businessCode: "FEC_INI_VIG_POL",
                    version: 1
                  }
                }]
            }]
        }
      }];
    const control = component.policyDataControls;
    const spy = component.reverseMap(control, groupData);
    expect(spy).toBeUndefined();
  });
  it('transformData', () => {
    let a = [
      {
        id: 1,
        name: "Datos básicos",
        code: "datos_basicos",
        fields: [
          {
            id: 67,
            code: { businessCode: "FEC_INI_VIG_POL", version: 1 }
          }]
      }];
    component.policy = [{
      id: 1,
      name: "Datos básicos",
      code: "datos_basicos",
      plcyDtGrp: {},
      rskDtGrp: {}
    }];
    component.policy.plcy = a;
    const spy2 = jest.spyOn(component, 'reverseMap').mockImplementation();
    component.transformData();
    expect(spy2).toBeCalled();
  });
  it('getControlValue', () => {

    let dataControlsValue = [{
      id: 7,
      code: 7,
      name: 'abc',
      fields: [
        { code: { businessCode: "abc" } }]
    }];
    let businessCode = "abc";
    const spy = component.getControlValue(dataControlsValue, businessCode);
    expect(spy).toBeUndefined();
  });
  it('validateSaveButtonFalse', () => {
    let policyData = [{ name: 'MONEDA', value: 'COP' }];
    let policyDataControls1 = { value: [{ fields: [{ businessCode: "MONEDA", value: 'USD', dataType: { guiComponent: "Text box" } }] }] };
    let riskData = { name: 'MONEDA', value: 'USD' };
    let riskTypesControls = { value: { complementaryData: { fields: { businessCode: "MONEDA", value: 'COP', dataType: [{ guiComponent: "Text box" }] } } } };
    let res = false;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = jest.spyOn(component, 'validateSaveButtonRisk').mockReturnValue(res);
    const spy = component.validateSaveButton(policyData, policyDataControls1, riskData, riskTypesControls);
    expect(spy).toEqual(false);
  });

  it('validateSaveButtonTrue', () => {
    let policyData = [{ name: 'MONEDA', value: 'COP' }];
    let policyDataControls1 = { value: [{ fields: [{ businessCode: 'MONEDA', value: 'COP', dataType: { guiComponent: "Text box" } }] }] };
    let riskData = { name: 'MONEDA', value: 'COP' };
    let riskTypesControls = { value: { complementaryData: { fields: { businessCode: 'MONEDA', value: 'COP', dataType: [{ guiComponent: "Text box" }] } } } };
    let res = true;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = jest.spyOn(component, 'validateSaveButtonRisk').mockReturnValue(res);
    const spy = component.validateSaveButton(policyData, policyDataControls1, riskData, riskTypesControls);
    expect(spy).toEqual(true);
  });

  it('validateSaveButtonRiskTrue', () => {
    let riskData = [{ name: 'MONEDA', value: 'COP' }];
    let riskTypesControls = { value: [{ complementaryData: [{ fields: [{ businessCode: 'MONEDA', value: 'COP', dataType: { guiComponent: "Text box" } }] }] }] };
    let res = true;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = component.validateSaveButtonRisk(riskData, riskTypesControls);
    expect(spy1).toEqual(true);
  });

  it('validateSaveButtonRiskFalse', () => {
    let riskData = [{ name: 'MONEDA', value: 'USD' }];
    let riskTypesControls = { value: [{ complementaryData: [{ fields: [{ businessCode: 'MONEDA', value: 'COP', dataType: { guiComponent: "Text box" } }] }] }] };
    let res = false;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = component.validateSaveButtonRisk(riskData, riskTypesControls);
    expect(spy1).toEqual(false);
  });
  describe('validateGui', () => {
    it('ListBoxWithIdTrue', () => {
      let guiComponent = 'List box';
      let policy = { value: { name: 'MONEDA', id: 'COP' } };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(true);
    });
    it('ListBoxWithIdFalse', () => {
      let guiComponent = 'List box';
      let policy = { value: { name: 'MONEDA', id: 'USD' } };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(false);
    });

    it('ListBoxTrue', () => {
      let guiComponent = 'List box';
      let policy = { value: 'COP' };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(true);
    });
    it('ListBoxFalse', () => {
      let guiComponent = 'List box';
      let policy = { value: 'USD' };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(false);
    });
    it('TextBoxFalse', () => {
      let guiComponent = 'Text box';
      let policy = { value: 'USD' };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(false);
    });

    it('TextBoxTrue', () => {
      let guiComponent = 'Text box';
      let policy = { value: 'COP' };
      let data = { name: 'MONEDA', value: 'COP' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(true);
    });

    it('CalendarTrue', () => {
      let guiComponent = 'Calendar';
      let policy = { value: 'Tue Nov 01 2022 12:53:00 GMT-0500 (hora estándar de Colombia)' };
      let data = { value: '2022-11-01T12:53:00-05:00' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(true);
    });

    it('CalendarFalse', () => {
      let guiComponent = 'Calendar';
      let policy = { value: 'Tue Nov 01 2023 12:53:00 GMT-0500 (hora estándar de Colombia)' };
      let data = { value: '2022-11-01T12:53:00-05:00' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(false);
    });

  });

  it('loadData', () => {
    let url = 'identificationtype/findAllIdentification',
      rlEngnCd = 'MTR_SMT', parameters = '';
    const spy=component.loadData(url,rlEngnCd,parameters);
    const spy2 = jest.spyOn(component, 'setData').mockImplementation();
    expect(spy).toBeDefined();
  });

  it('loadDataElse', () => {
    let url = 'state/statefindbycountry/',
      rlEngnCd = 'MTR_SMT', parameters = 'CO';
    const spy=component.loadData(url,rlEngnCd,parameters);
    const spy2 = jest.spyOn(component, 'setData').mockImplementation();
    expect(spy).toBeDefined();
  });

  it('setData', () => {
    let res:any = {body:{value:'', name:''}};
    const spy=component.setData(res);
    const spy2 = jest.spyOn(component, 'addToElementData').mockImplementation();
    expect(spy).toBeDefined();
  });

  it('addToElementData', () => {
    let res:any = {body:[{code:'abc', description :'abc'},{code:'bcd', description :'bcd'}]};
    const spy=component.setData(res);
    const spy2 = jest.spyOn(component, 'addToElementData').mockImplementation();
    expect(spy).toBeDefined();
      });
});
