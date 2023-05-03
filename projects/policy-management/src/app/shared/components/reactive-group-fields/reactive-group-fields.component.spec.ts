import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from '../../../core/services/product/product.service';
import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';
import { of } from 'rxjs';
import exp from 'constants';

describe('ReactiveGroupFieldsComponent', () => {
  let component: ReactiveGroupFieldsComponent;
  let fixture: ComponentFixture<ReactiveGroupFieldsComponent>;
  let productService: ProductService;
  let dialogService1: DialogService;
  let messageService: MessageService;
  let formBuilderMock = new FormBuilder();
  let field: any ={value : {
    businessCode: "CIU_TDB",
    code: { businessCode: "CIU_TDB" },
    value: {id:'05002', name:'Abejorral'},
    test: false,
    initializeRule:  [{
      argmntLst: [
        { name: "date", value: "FECHA_EMISION" }],
      cdBusinessCode: "RVL_CIU_RGO",
      cdRuleType: "Validación",
      code: { name:'Validar ciudad', version: 1 },
      description: 'Validar ciudad',
      endPoint: "/emisor/v1/city/locationValidate",
      id: 16,
      name: 'Validar ciudad',
      urlBs: "https://jpl0rkfluj.execute-api.us-east-1.amazonaws.com/stage"

    }],
    validateRule: [{
      argmntLst: [
        { name: "date", value: "FECHA_EMISION" }],
      cdBusinessCode: "RVL_CIU_RGO",
      cdRuleType: "Validación",
      code: { name:'Validar ciudad', version: 1 },
      description: 'Validar ciudad',
      endPoint: "/emisor/v1/city/locationValidate",
      id: 16,
      name: 'Validar ciudad',
      urlBs: "https://jpl0rkfluj.execute-api.us-east-1.amazonaws.com/stage"

    }]
  }
}

  let policy = {
    prdct: "mascotadaviviendadiciembre",
    vldtyPrd: "vldtyPrd",
    cmpny: { "idntfctnNmbr": "860002180", "idntfctnTyp": "7" },
    cntry: "CO",
    dstrbtnChnnl: "8",
    extrnlTrnsctnPlcy: null,
    insrncLn: "22",
    plcy: {
      chngActvtyTyp: "EMI_ORI",
      endrsmntNmbr: "0",
      mnPlcyNmbr: "0",
      plcyNmbr: "100000000000469",
      rqstNmbr: "482",
      plcyDtGrp: {
        datos_basicos: {
          CDAD_OCURRENCIA_SINIES: "19001",
          COD_AGENTE: "12345",
          CORREO_PERSO_CONTAC: "opcion3@hotmail.com",
          DEPAR_COL: "05",
          FECHA_EMISION: "2022-11-30T12:53:00-05:00",
          FEC_FIN_VIG_POL: "2023-06-30T12:53:00-05:00",
          FEC_INI_VIG_POL: "2022-12-31T12:53:00-05:00",
          MONEDA: "COP",
          NRO_ID_TOMADOR: "91077808",
          OBSERVACIONES: "Esto es una observacion",
          PERIODO_FACT: "4",
          PRODUCTOS: "mascotadaviviendadiciembre",
          TIPO_DOC_TOMADOR: "CC"
        },
        gd002_datosdeldebito:{CIU_TDB: "05001",CORREO_PERSO_CONTAC: "ejemplito@example.com",DIR_TDB: "cra 15 #8-10",DTO_CUO_POL: "3",DTO_ENF_POL: "enf_dvv",DTO_VTC_POL: "202511",MEDIO_PAGO: "mep_tcr",METODO_PAGO: "MPG_EFT",NOM_TDB: "Diego Carvajal",NRO_CUENTA: "6087543124",NRO_ID_TDB: "106158765",TEL_TDB: "3109876540",TPO_ID_TDB: "CD"}
      },
      rsk: {
        1: {
          rskDtGrp: {
            datos_basicos: {
              APE_ASEG: "CORDOBA",
              CPOS_RIES: "05030",
              NOM_ASEG: "JUAN",
              NRO_ID_ASEGURADO: "91077808",
              TIPO_DOC_ASEGURADO: "CC"
            },
            gd002_datosmascota:{
              EDAD_MASCOTA: "4",NOMBRE_MASCOTA: "Michi",RAZA: "31",TIPO_MASCOTA: null
            }
          }
        }
      }
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ReactiveGroupFieldsComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ReactiveFormsModule,
        FormBuilder,
        ProductService,
        DialogService,
        MessageService,
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

    fixture = TestBed.createComponent(ReactiveGroupFieldsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    dialogService1 = TestBed.inject(DialogService);
    messageService = TestBed.inject(MessageService);


    component.group = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl(test),
        fields: new FormArray([])
      })
    ]);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('valid', () => {
    //let spy =component.va();
    //expect(spy).toBeUndefined();
  })

  it('showModal', () => {
    let title: any = "title", message: string = "hola";
    component.showModal(title, field, message);
  });
  describe('executeRule', () => {
    it('datos_basicos', () => {
      component.policy = policy;
      let groupName: any = { value: { id: 1, name: "Datos básicos", code: "datos_basicos" } };
      let show = true;
      // const spy1 = jest.spyOn(productService, 'executeRule').mockReturnValue(of(res));
      const spy3 = jest.spyOn(component, 'addControls').mockImplementation();
      const spy2 = jest.spyOn(component, 'getRule').mockImplementation();
      const spy = component.executeRule(field, groupName, show);
      console.log(spy3);
      //expect(spy1).toBeCalled();
      //expect(spy2).toBeCalled();
      expect(spy).toBeDefined();

    });

    it('datos_basicosRisk', () => {
      component.policy = policy;
      let groupName: any = { value: { id: "gd002_datosdeldebito", name: "Datos del débito", code: "gd002_datosdeldebito" } };
      let show = true;
      // const spy1 = jest.spyOn(productService, 'executeRule').mockReturnValue(of(res));
      const spy3 = jest.spyOn(component, 'addControls').mockImplementation();
      const spy2 = jest.spyOn(component, 'getRule').mockImplementation();
      const spy = component.executeRule(field, groupName, show);
      console.log(spy3);
      //expect(spy1).toBeCalled();
      //expect(spy2).toBeCalled();
      expect(spy).toBeDefined();

    });

  });

  describe('getRule',()=>{

 
    it('getRuleTrue',()=>{
      component.policy=policy;
      let res={body:"",dataHeader:{code: 200,currentPage: 0,errorList: [],hasErrors: false,status: "OK",totalPage: 0,totalRecords: 0}}
      const spy1 = jest.spyOn(productService, 'executeRule').mockReturnValue(of(res));
      let spy=component.getRule(field,'validacion',false);
      expect(spy1).toBeCalled();
      expect(spy).toBeUndefined();
  
    });
    it('getRuleError',()=>{
      component.policy=policy;
      let res={body:null,dataHeader:{code: 200,currentPage: 0,errorList: [{errorCode: "1000",errorDescription: "Not data found"}],hasErrors: false,status: "OK",totalPage: 0,totalRecords: 0}}
      const spy1 = jest.spyOn(productService, 'executeRule').mockReturnValue(of(res));
      let spy=component.getRule(field,'validacion',true);
      expect(spy1).toBeCalled();
      expect(spy).toBeUndefined();
    });
  
  });

 
});
