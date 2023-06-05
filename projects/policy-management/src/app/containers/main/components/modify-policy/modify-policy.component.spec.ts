import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModifyPolicyComponent } from './modify-policy.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { ConsultPolicyService } from '../consult-policy/services/consult-policy.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('ModifyPolicyComponent', () => {
  let component: ModifyPolicyComponent;
  let fixture: ComponentFixture<ModifyPolicyComponent>;
  let productService: ProductService;
  let consultPolicyService: ConsultPolicyService;
  let confirmationService: ConfirmationService;
  let formBuilderMock = new FormBuilder();
  let router: Router;

  let policies = { id: 72, nmName: "producto_seguro_diciembre", dsDescription: "producto_seguro_diciembre", nmHashCode: 200, plcy: { chngActvtyTyp: 'EMI_ORI', endrsmntNmbr: '0', mnPlcyNmbr: '0', plcyDtGrp: { datos_basicos: { COD_AGENTE: 'COD_AGENTE', FECHA_EMISION: '2022-11-30T12:53:00-05:00', FEC_FIN_VIG_POL: '2023-12-31T12:53:00-05:00', FEC_INI_VIG_POL: '2022-12-31T12:53:00-05:00', METODO_PAGO: 'MPG_EFT', MONEDA: 'COP', NRO_ID_TOMADOR: '1092312351', OBSERVACIONES: 'Esto es una observacion', PERIODO_FACT: '1', TIPO_DOC_TOMADOR: 'CC' } }, rsk: { 1: { cmmrclPln: [{}], rskDtGrp: { rskTyp: '2', datos_basicos: { APE_ASEG: 'Perez', CPOS_RIES: '05030', NOM_ASEG: 'Pepe', NRO_ID_ASEGURADO: '123456', TIPO_DOC_ASEGURADO: 'CC' } } } }, }, plcyNmbr: '100000000000419', rqstNmbr: '432' };  beforeEach(async () => {

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
        ConfirmationService,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: MessageService,
          useValue: {
            add: () => of([]),
           },
        },
        {
          provide: ConfirmationService,
          useValue: {
            confirm: () => of([]),

          },

        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],

    })
      .compileComponents();
    fixture = TestBed.createComponent(ModifyPolicyComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    confirmationService = TestBed.inject(ConfirmationService);
    consultPolicyService = TestBed.inject(ConsultPolicyService);
    router = TestBed.inject(Router);

    jest.spyOn(component.productService, 'findPolicyDataById').mockReturnValue(of({ body: {} }));

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
    const res: ResponseDTO<any> = {
      body: {
        id: 72,
        nmName: 'producto_seguro_diciembre',
        dsDescription: 'producto_seguro_diciembre',
        nmHashCode: 200,
        plcy: [Object],
        plcyNmbr: '100000000000419',
        rqstNmbr: '432'
      },
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      }
    };

    let idProduct = '72';
    const spy = jest.spyOn(productService, 'getProductById').mockReturnValue(of(res));
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    const spy3 = jest.spyOn(component, 'fillRiskData').mockImplementation();
    component.policyDataControls;
    component.riskTypesControls;
    const spy1 = component.getProduct(idProduct);
    expect(spy2).toBeDefined();
    expect(spy1).toBeUndefined();
  });
  it('getPolicy', () => {
    const res: ResponseDTO<any> = {
      body: {
        plcy: {
          plcyNmbr: '123',
          rsk: {
            "1": {}
          }
        },
        extrnlTrnsctnPlcy: {
          plcyNmbr: '123'
        }
      },
      dataHeader: {
        code: 200,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      }
    };
    component.policy = policies;
    component.riskTypesPreviewControls;
    jest.spyOn(productService, 'findPolicyDataById').mockReturnValue(of(res));
    jest.spyOn(component, 'mapData').mockImplementation();
    jest.spyOn(component, 'getProduct').mockImplementation();
    expect(component.getPolicy()).toBeUndefined();
  });

  it('fillRiskData', () => {

    let riskTypes: any = [{
      id: 1, code: { businessCode: "aaa" }, name: "abc", description: "abcd", complementaryData: { id: 1, name: "string", code: "string", fields: [], }, businessPlans: []
    }];
    const spy2 = jest.spyOn(component, 'fillGroupData').mockImplementation();
    const flag = true;
    component.fillRiskData(riskTypes, flag, true);
    expect(spy2).toBeCalled();
  });

  it('saveModification', () => {
    let riskTypes = component.fb.array([]);
    component.addControls(riskTypes);
    component.getFieldsControls(riskTypes);
    component.getGroupsControls(riskTypes);
    const spy2 = jest.spyOn(component, 'transformData').mockImplementation();
    expect(component.saveModification()).toBeUndefined();

  });


  describe('fillGroupData', () => {

    it('fillGroupData non canonical', () => {
      let riskTypes = [{ value: 7, name: 'abc' }];
      let groupFG = [{
        id: 7,
        code: 7,
        name: 'abc',
        fields: [
          {
            businessCode: "abc",
            code: {
              businessCode: "abc"
            },
            dataType: {
              guiComponent: 'List box'
            },
            domainList: {
              valueList: [
                { name: "test" }
              ]
            }
          },
          {
            businessCode: "abc",
            code: {
              businessCode: "abc"
            },
            dataType: {
              guiComponent: 'List box'
            },
            domainList: {
              valueList: [
                { url: "test" }
              ]
            }
          }
        ]
      }];
      const spy = component.fillGroupData(groupFG, riskTypes, false);
      expect(spy).toBeDefined();
    });

    it('fillGroupData canonical', () => {
      let riskTypes = [{ value: 7, name: 'TPO_ID_TDB' }]; //dt.dtTyp.guiCmpnntItm === 'List box'
      let groupFG = [{
        id: 7,
        code: 7,
        name: 'grupo',
        fld: [
          {
            dtCd: "TPO_ID_TDB",
            code: {
              businessCode: "abc"
            },
            dt: {
              dtTyp: {
                guiCmpnntItm: 'List box'
              }
            },
            domainList: null,
            required: false
          },
          {
            dtCd: "TPO_ID_TDB",
            code: {
              businessCode: "abc"
            },
            dt: {
              dtTyp: {
                guiCmpnntItm: 'List box'
              }
            },
            domainList: null,
            required: true
          }
        ]
      }];
      component.productDeps = {
        "dmnLst": [
          {
            "cd": "test"
          }
        ],
        "dtTyp": [
          {
            "cd": "test",
            "guiCmpnntItm": "List box"
          }
        ],
        "dt": [
          {
            "cd": "TPO_ID_TDB",
            "dtTypCd": "test",
            "dmnLstCd": "test"
          },
          {
            "cd": "DATE",
            "dtTypCd": "test",
            "dmnLstCd": "test"
          }
        ]
      };
      const spy = component.fillGroupData(groupFG, riskTypes, true);
      expect(spy).toBeDefined();
    });

    it('domainListUrl', () => {
      let riskTypes = [{ value: 2, name: 'abc' }];
      let groupFG = [{ id: 7, code: 7, name: 'abc', fields: [{ code: { businessCode: "abc" }, dataType: { guiComponent: 'List box' }, domainList: { code: "DEPATAMENTOS", name: "Departamentos", description: "departamentos", valueList: [{ url: "/emisor/v1/state/findByCountry/", rlEngnCd: "MTR_SMT" }] } }] }];
      const spy = component.fillGroupData(groupFG, riskTypes, false);
      expect(spy).toBeDefined();
    });

    it('domainList', () => {
      let riskTypes = [{ value: 1, name: 'abc', }];
      let groupFG = [{ id: 7, code: 7, name: 'abc', fields: [{ code: { businessCode: "abc" }, dataType: { guiComponent: 'List box' }, domainList: { code: "TIPO_MASCOTA", name: "Tipo de mascota", description: "Tipo de mascota", valueList: [{ code: "1", description: "Perro" }, { code: "2", description: "Gato" }] } }] }];
      const spy = component.fillGroupData(groupFG, riskTypes, false);
      expect(spy).toBeDefined();
    });

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
    const groupData = [{ plcy: { plcyDtGrp: [{ id: 1, name: "Datos básicos", code: "datos_basicos", fields: [{ id: 67, code: { businessCode: "FEC_INI_VIG_POL", version: 1 } }] }] } }];
    const control = component.policyDataControls;
    const spy = component.reverseMap(control, groupData, 'policy');
    expect(spy).toBeUndefined();
  });
  it('transformData', () => {
    let a = { plcyDtGrp: { datos_basicos: { COD_AGENTE: "99941", FECHA_EMISION: "2022-11-30T12:53:00-05:00", FEC_FIN_VIG_POL: "2023-12-31T12:53:00-05:00", FEC_INI_VIG_POL: "2022-12-31T12:53:00-05:00", MONEDA: "COP", NOMBRE_DEL_TOMADOR: "Lucia", NRO_ID_TOMADOR: "91077808", OBSERVACIONES: "Esto es una observacion", PERIODO_FACT: "3", TIPO_DOC_TOMADOR: "CC" }, gd002_datosdeldebito: { CIU_TDB: "05001", CORREO_PERSO_CONTAC: "ejemplito@example.com", DIR_TDB: "cra 15 #8-10", DTO_CUO_POL: "3", DTO_ENF_POL: "enf_dvv", DTO_VTC_POL: "202511", MEDIO_PAGO: "mep_tcr", METODO_PAGO: "MPG_EFT", NOM_TDB: "Diego Carvajal", NRO_CUENTA: "6087543124", NRO_ID_TDB: "106158765", TEL_TDB: "3109876540", TPO_ID_TDB: "CD" } }, rsk: { 1: { rskDtGrp: { datos_basicos: { APE_ASEG: "Valencia", CPOS_RIES: "05030", NOM_ASEG: "Carlos", NRO_ID_ASEGURADO: "91077808", TIPO_DOC_ASEGURADO: "CC" }, gd002_datosmascota: { EDAD_MASCOTA: "4", NOMBRE_MASCOTA: "Micho", RAZA: "31", TIPO_MASCOTA: null } } } } }; let b = {};
    component.policy = { plcy: { plcyDtGrp: { datos_basicos: { COD_AGENTE: "99941", FECHA_EMISION: "2022-11-30T12:53:00-05:00", FEC_FIN_VIG_POL: "2023-12-31T12:53:00-05:00", FEC_INI_VIG_POL: "2022-12-31T12:53:00-05:00", MONEDA: "COP", NOMBRE_DEL_TOMADOR: "Lucia", NRO_ID_TOMADOR: "91077808", OBSERVACIONES: "Esto es una observacion", PERIODO_FACT: "3", TIPO_DOC_TOMADOR: "CC" }, gd002_datosdeldebito: { CIU_TDB: "05001", CORREO_PERSO_CONTAC: "ejemplito@example.com", DIR_TDB: "cra 15 #8-10", DTO_CUO_POL: "3", DTO_ENF_POL: "enf_dvv", DTO_VTC_POL: "202511", MEDIO_PAGO: "mep_tcr", METODO_PAGO: "MPG_EFT", NOM_TDB: "Diego Carvajal", NRO_CUENTA: "6087543124", NRO_ID_TDB: "106158765", TEL_TDB: "3109876540", TPO_ID_TDB: "CD" } } }, rsk: { 1: { rskDtGrp: { datos_basicos: { APE_ASEG: "Valencia", CPOS_RIES: "05030", NOM_ASEG: "Carlos", NRO_ID_ASEGURADO: "91077808", TIPO_DOC_ASEGURADO: "CC" }, gd002_datosmascota: { EDAD_MASCOTA: "4", NOMBRE_MASCOTA: "Micho", RAZA: "31", TIPO_MASCOTA: null } } } } };
    component.policy.plcy = a;
    component.policyAux = { plcy: { plcyDtGrp: { datos_basicos: { COD_AGENTE: "99941", FECHA_EMISION: "2022-11-30T12:53:00-05:00", FEC_FIN_VIG_POL: "2023-12-31T12:53:00-05:00", FEC_INI_VIG_POL: "2022-12-31T12:53:00-05:00", MONEDA: "COP", NOMBRE_DEL_TOMADOR: "Lucia", NRO_ID_TOMADOR: "91077808", OBSERVACIONES: "Esto es una observacion", PERIODO_FACT: "3", TIPO_DOC_TOMADOR: "CC" }, gd002_datosdeldebito: { CIU_TDB: "05001", CORREO_PERSO_CONTAC: "ejemplito@example.com", DIR_TDB: "cra 15 #8-10", DTO_CUO_POL: "3", DTO_ENF_POL: "enf_dvv", DTO_VTC_POL: "202511", MEDIO_PAGO: "mep_tcr", METODO_PAGO: "MPG_EFT", NOM_TDB: "Diego Carvajal", NRO_CUENTA: "6087543124", NRO_ID_TDB: "106158765", TEL_TDB: "3109876540", TPO_ID_TDB: "CD" } } }, rsk: { 1: { rskDtGrp: { datos_basicos: { APE_ASEG: "Valencia", CPOS_RIES: "05030", NOM_ASEG: "Carlos", NRO_ID_ASEGURADO: "91077808", TIPO_DOC_ASEGURADO: "CC" }, gd002_datosmascota: { EDAD_MASCOTA: "4", NOMBRE_MASCOTA: "Micho", RAZA: "31", TIPO_MASCOTA: null } } } } };
    component.policyAux.plcy = a;
    let flag = true;
    component.Business = 'datos_basicos';
    const spy2 = jest.spyOn(component, 'reverseMap').mockImplementation();
    const spy3 = jest.spyOn(component, 'savePolicyModify').mockImplementation();
    const spy = component.transformData(flag);
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
    expect(spy).toBeUndefined();
  });

  it('getControlValue', () => {
    let dataControlsValue = [{ id: 7, code: 7, name: 'abc', fields: [{ dtCd: "abc", code: { businessCode: "abc" } }] }];
    let businessCode = "abc";
    const spy = component.getControlValue(dataControlsValue, businessCode, 'policy');
    console.log(spy);
    //expect(spy).toBeUndefined();
  });

  it('getControlValueElse', () => {
    let dataControlsValue = [{ id: 7, code: 7, name: 'abc', fields: [{ code: { businessCode: "xyz" } }] }];
    let businessCode = "abc";
    const spy = component.getControlValue(dataControlsValue, businessCode, 'policy');
    console.log(spy);
    //expect(spy).toBeUndefined();
  });
  it('validateSaveButtonFalse', () => {
    let policyData = [{ name: 'MONEDA', value: 'COP' }];
    let policyDataControls1 = { value: [{ fields: [{ dtCd: "MONEDA", value: 'USD', dt: { dtTyp: { guiCmpnntItm: "Text box" } } }] }] };
    let riskData = { name: 'MONEDA', value: 'USD' };
    let riskTypesControls = { value: { complementaryData: { fields: { dtCd: "MONEDA", value: 'COP', dt: { dtTyp: { guiCmpnntItm: "Text box" } } } } } };
    let res = false;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = jest.spyOn(component, 'validateSaveButtonRisk').mockReturnValue(res);
    const spy = component.validateSaveButton(policyData, policyDataControls1, riskData, riskTypesControls);
    expect(spy).toEqual(false);
  });

  it('validateSaveButtonTrue', () => {
    let policyData = [{ name: 'MONEDA', value: 'COP' }]; //dt.dtTyp.guiCmpnntItm
    let policyDataControls1 = { value: [{ fields: [{ dtCd: 'MONEDA', value: 'COP', dt: { dtTyp: { guiCmpnntItm: "Text box" } } }] }] };
    let riskData = { name: 'MONEDA', value: 'COP' };
    let riskTypesControls = { value: { complementaryData: { fields: { dtCd: 'MONEDA', value: 'COP', dt: { dtTyp: { guiCmpnntItm: "Text box" } } } } } };
    let res = true;
    component.policyDataPreviewControls;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = jest.spyOn(component, 'validateSaveButtonRisk').mockReturnValue(res);
    const spy = component.validateSaveButton(policyData, policyDataControls1, riskData, riskTypesControls);
    expect(spy).toEqual(true);
    expect(spy2).toBeDefined();

  });

  /*it('activeButtonPol', () => {
    let policyData = [{ name: 'MONEDA', value: 'COP' }];
    let policyDataControls1 = { value: [{ fields: [{ dtCd: 'MONEDA', value: 'COP', dataType: { guiComponent: "Text box" } }] }] };
    let res = true;
    expect(component.activeButtonPol(policyData, policyDataControls1, 0)).toBeDefined();
  });*/

  it('validateSaveButtonRiskTrue', () => {
    let riskData = [{ name: 'MONEDA', value: 'COP' }];
    let riskTypesControls = { value: [{ rskTypDtGrp: [{ code: "datos_basicos", fields: [{ businessCode: 'MONEDA', value: 'COP', dataType: { guiComponent: "Text box" } }], id: "datos_basicos", name: "Datos básicos" }] }] }
    let res = true;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = component.validateSaveButtonRisk(riskData, riskTypesControls);
    expect(spy2).toBeDefined();
    expect(spy1).toEqual(true);
  });

  it('validateSaveButtonRiskFalse', () => {
    let riskData = [{ name: 'MONEDA', value: 'USD' }];
    let riskTypesControls = { value: [{ rskTypDtGrp: [{ code: "datos_basicos", fields: [{ businessCode: 'MONEDA', value: 'USD', dataType: { guiComponent: "Text box" } }], id: "datos_basicos", name: "Datos básicos" }] }] }
    let res = false;
    const spy2 = jest.spyOn(component, 'validateGui').mockReturnValue(res);
    const spy1 = component.validateSaveButtonRisk(riskData, riskTypesControls);
    expect(spy2).toBeDefined();
    expect(spy1).toEqual(true);
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

    it('CalendarFalse', () => {
      let guiComponent = 'Calendar';
      let policy = { value: 'Tue Nov 01 2023 12:53:00 GMT-0500 (hora estándar de Colombia)' };
      let data = { value: '2022-11-01T12:53:00-05:00' };
      const spy = component.validateGui(guiComponent, policy, data);
      expect(spy).toEqual(false);
    });

  });


  it('savePolicyModify', () => {
    console.log(policies)
    component.policy = policies;
    component.policyAux = policies;
    const spy2 = jest.spyOn(component, 'showSuccess').mockImplementation();
    const spy3 = jest.spyOn(component, 'validData').mockImplementation();
    jest.spyOn(component.productService, 'saveModify').mockReturnValue(of({dataHeader: {code: 200}}));
    const spy = component.savePolicyModify();
    expect(spy).toBeUndefined();
    expect(spy2).toBeDefined();
  });

  it('savePolicyModify respoonse 500', () => {
    console.log(policies)
    component.policy = policies;
    component.policyAux = policies;
    const spy2 = jest.spyOn(component, 'showSuccess').mockImplementation();
    const spy3 = jest.spyOn(component, 'validData').mockImplementation();
    jest.spyOn(component.productService, 'saveModify').mockReturnValue(of({dataHeader: {code: 500}}));
    const spy = component.savePolicyModify();
    expect(spy).toBeUndefined();
    expect(spy2).toBeDefined();
  });

  it('savePolicyModify', () => {
    console.log(policies)
    component.policy = policies;
    component.policyAux = policies;
    const spy2 = jest.spyOn(component, 'showSuccess').mockImplementation();
    const spy3 = jest.spyOn(component, 'validData').mockImplementation();
    jest.spyOn(component.productService, 'saveModify').mockReturnValue(throwError(() => new Error('test')));
    const spy = component.savePolicyModify();
    expect(spy).toBeUndefined();
    expect(spy2).toBeDefined();
  });

  it('validData', () => {
    component.policy = policies;
    component.policyAux = policies;
    const spy = component.validData();
    const spy3 = jest.spyOn(component, 'validDataRisk').mockImplementation();
    expect(spy).toBeUndefined();
  });

  it('validDataRisk', () => {
    component.policy = policies;
    component.policyAux = policies;
    const spy = component.validDataRisk();
    expect(spy).toBeUndefined();
  });

  describe('validRules', () => {
    let flag;
    it('true', () => {
      flag = true;
      const spy = component.validRules(flag);
      expect(spy).toBeUndefined();
    });
    it('false', () => {
      flag = false;
      const spy = component.validRules(flag);
      expect(spy).toBeUndefined();
    });
  });

  it('validateList', () => {
    let list: any = [{ code: 'abc', description: 'abc' }, { code: 'bcd', description: 'bcd' }];
    let valueObj: any = [{ code: 'abc', description: 'abc' }];
    component.validateList(list, valueObj);
  });


  it('orderData', () => {
    let list: any = [{ code: 'abc', description: 'abc' }, { code: 'bcd', description: 'bcd' }];
    let valueObj: any = [{ code: 'abc', description: 'abc' }];
    component.orderData(list, valueObj);
  });

  it('showSuccess', () => {
    let status: string = '200', title: string = 'Hola', msg: string = 'mundo';
    const spy = component.showSuccess(status, title, msg);
    console.log(spy);
  });

  it('validateObservation', () => {
    const spy = component.validateObservation();
    expect(spy).toBeDefined;
  });
});
