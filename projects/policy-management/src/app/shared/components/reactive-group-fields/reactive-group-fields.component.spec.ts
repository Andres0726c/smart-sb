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

describe('ReactiveGroupFieldsComponent', () => {
  let component: ReactiveGroupFieldsComponent;
  let fixture: ComponentFixture<ReactiveGroupFieldsComponent>;
  let productService: ProductService;
  let dialogService1: DialogService;
  let messageService: MessageService;
  let formBuilderMock = new FormBuilder();
  let field:any = new FormControl();
  field.value= {
    businessCode: "FECHA_EMISION",
    code: { businessCode: "FECHA_EMISION" },
    value: "2022-11-21T00:00:00-05:90",
    test:false,
    initializeRule:[{
      argmntLst:[
        {name:'period', value: 'PERIODO_FACT'},
        {name:'startDate', value: 'FEC_INI_VIG_POL'}],
      cdBusinessCode:"RIN_FFV_POL",
      cdRuleType:"Inicialización",
      code:{name:"Generar fecha de final de vigencia",version:1},
      description:"Generar fecha de final de vigencia",
      endPoint:"/emisor/v1/expirationDate/initExpirationDate",
      id:20,
      name:"Generar fecha de final de vigencia",
      urlBs:"https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev"

  }],
    validateRule:[{
      argmntLst:[
        {name:"date", value:"FECHA_EMISION"}],
      cdBusinessCode:"RVL_FEM_POL",
      cdRuleType:"Validación",
      code:{name:"Validar fecha de emision de la póliza",version:1},
      description:"Validar fecha de emision de la póliza",
      endPoint:"/emisor_orquestador/v1/issueDate/validate",
      id:7,
      name:"Validar fecha de emision de la póliza",
      urlBs:"https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev"

    }]
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
        }
      },
      rsk: {
        1: {
          rskTyp: "2",
          rskDtGrp: {
            datos_basicos: {
              APE_ASEG: "CORDOBA",
              CPOS_RIES: "05030",
              NOM_ASEG: "JUAN",
              NRO_ID_ASEGURADO: "91077808",
              TIPO_DOC_ASEGURADO: "CC"
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

  it('valid',()=>{
    let spy =component.valid();
    expect(spy).toBeUndefined();
  })

  it('showModal',()=>{
    let title:any="title",message: string="hola";
    component.showModal(title,field,message);
  });

  it('executeRule', () => {
    component.policy=policy;
    let res={
      body:{
        message:" ",
        status:true,
        value:null
      },
      dataHeader:{
        code:200,
        currentPage:0,
        errorList:[],
        hasErrors:false,
        status:"OK"
        }
    }
    let  groupName: any = {
        value: {
          id: 1,
          name: "Datos básicos",
          code: "datos_basicos"
        }
      };

     let show = true;
    // const spy1 = jest.spyOn(productService, 'executeRule').mockReturnValue(of(res));
     const spy3= jest.spyOn( component,'addControls').mockImplementation();
    // const spy2=jest.spyOn(component,'showModal').mockImplementation();
    const spy= component.executeRule(field, groupName, show);
    console.log(spy3);
    //expect(spy1).toBeCalled();
    //expect(spy2).toBeCalled();
    expect(spy).toBeUndefined();

  });


});
