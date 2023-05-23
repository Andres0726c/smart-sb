import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  ResponseDTO,
} from './../../../../core/interfaces/commun/response';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FilterPolicy } from './interfaces/consult-policy';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { FormArray,
  FormBuilder,
  FormGroup,
  FormsModule
   } from '@angular/forms';
import { ConsultPolicyComponent } from './consult-policy.component';
import { ConsultPolicyService } from './services/consult-policy.service';
import { ModalPolicyActionsComponent } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/modal-policy-actions.component';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('ConsultPolicyComponent', () => {
  let component: ConsultPolicyComponent;
  let consultPolicyService: ConsultPolicyService;
  let productService: ProductService;
  let fixture: ComponentFixture<ConsultPolicyComponent>;
  let ref: DialogService;
  let router: Router;
  beforeEach(async () => {
    consultPolicyService = ConsultPolicyService.prototype;
    ref = DialogService.prototype

    TestBed.configureTestingModule({
      imports: [HttpClientModule,FormsModule,RouterTestingModule.withRoutes([]),],
      declarations: [],
      providers: [
        DialogService,
        ConsultPolicyComponent,
        MessageService,
        FormBuilder,
        { provide: DynamicDialogRef,
          useValue: { onClose: of(true) } },
          {
            provide: FormArray,
            useValue: {},
          },
          {
            provide: FormGroup,
            useValue: {},
          },
          { provide: Location, useValue: {path:'/polizas/modificar/1'} },

      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(ConsultPolicyComponent);
    component = fixture.componentInstance;
    productService = fixture.debugElement.injector.get(ProductService);
    router = TestBed.inject(Router);

    const res = {
      "body": {
        "prdct": "producto_seguro_mascota",
        "plcy": {
            "rqstNmbr": "406",
            "plcyNmbr": "100000000000393",
            "mnPlcyNmbr": "0",
            "endrsmntNmbr": "0",
            "chngActvtyTyp": "EMI_ORI",
            "plcyDtGrp": {
                "datos_basicos": {
                    "MONEDA": "COP",
                    "COD_AGENTE": "ABC123",
                    "PERIODO_FACT": "1",
                    "FECHA_EMISION": "2022-11-11T12:53:00-05:00",
                    "OBSERVACIONES": "Esto es una observacion",
                    "NRO_ID_TOMADOR": "123458676",
                    "FEC_FIN_VIG_POL": "2023-01-31T12:53:00-05:00",
                    "FEC_INI_VIG_POL": "2022-11-01T12:53:00-05:00",
                    "TIPO_DOC_TOMADOR": "CC",
                    "NOMBRE_DEL_AGENTE": "José Gallego",
                    "NOMBRE_DEL_TOMADOR": "Jorge Bermudez"
                },
                "gd002_datosdedebito": {
                    "METODO_PAGO": "MPG_EFT"
                }
            },
            "rsk": {
                "1": {
                    "rskTyp": "2",
                    "rskDtGrp": {
                        "datos_basicos": {
                            "RAZA": "A",
                            "EDAD_MASCOTA": "10",
                            "TIPO_MASCOTA": "1",
                            "NOMBRE_MASCOTA": "Luna"
                        },
                        "gd002_datosasegurado": {
                            "APE_ASEG": "Echeverry",
                            "NOM_ASEG": "Pablo Andrés",
                            "CPOS_RIES": "05030",
                            "NRO_ID_ASEGURADO": "55551121",
                            "TIPO_DOC_ASEGURADO": "CC"
                        }
                    }
                }
            }
        }
      },
      "dataHeader": {
          "code": 200,
          "status": "OK",
          "errorList": [],
          "hasErrors": false,
          "currentPage": 0,
          "totalPage": 0,
          "totalRecords": 0
      }
    };

    jest.spyOn(productService, 'findPolicyDataById').mockReturnValue(of (res));
    jest.spyOn(productService, 'modificationPolicyClaimStatus').mockReturnValue(of (res));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search with start date', () => {
    let filters: FilterPolicy = component.filters;
    filters.startDate = '12/30/2022';

    component.search(filters);
    expect(component.filters.startDate).toEqual('2022-12-30T00:00:00.000Z');
  });

  it('nextPage', () => {
    component.policies = [
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
    let event: LazyLoadEvent = {
      first: 5,
      rows: 5,
    };
    component.nextPage(event);
    expect(component.filters.pageNumber).toEqual(1);
  });

  it('clearSearch', () => {
    component.clearSearch()
    expect(component.policies).toEqual([])
    expect(component.totalRecords).toEqual(0)
  })

  it('consult success', fakeAsync(() => {
    const response: ResponseDTO<string[]> = {
      body: ['test'],
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
    jest
      .spyOn(consultPolicyService, 'getPolicies')
      .mockReturnValueOnce(of(response));
    component.consultPolicies(component.filters);
    expect(component.policies).toEqual(['test']);
  }));


  it('consult error 400', fakeAsync(() => {
    const response: ResponseDTO<string[]> = {
      body: [],
      dataHeader: {
        code: 400,
        status: 'OK',
        errorList: [],
        hasErrors: false,
        currentPage: 9,
        totalPage: 22,
        totalRecords: 106,
      },
    };
    jest
      .spyOn(consultPolicyService, 'getPolicies')
      .mockReturnValueOnce(of(response));

    component.consultPolicies(component.filters);
    expect(component.policies).toEqual([]);
  }));
  it('visibleItem',()=>{
    component.moduleAcess=true;
    const spy=jest.spyOn(component, 'getModule').mockReturnValue(true);
    component.visibleItem();
    expect(spy).toBeCalled();

  })
it('getModuleTrue',()=>{
  component.moduleAcess=['Consultar', 'Modificar', 'Rehabilitar', 'Renovar', 'Cancelar', 'Parametrizar'];
  expect(component.getModule('Modificar')).toBeTruthy();
});

it('getModuleFalse',()=>{
  component.moduleAcess=['Consultar','Rehabilitar', 'Renovar', 'Cancelar', 'Parametrizar'];
  expect(component.getModule('Modificar')).toBeFalsy();
});

  it('visibleItemFalse',()=>{
    component.moduleAcess=false;
    const spy=jest.spyOn(component, 'getModule').mockReturnValue(true);
    component.visibleItem();
    expect(spy).toBeDefined();
  })


  describe('command item',()=>{
    it('navigate to "consult" to /modificar',() => {
      component.selectedPolicy={idProduct:1};
      const spy = jest.spyOn(router, 'navigate').mockImplementation();
      component.items[0].command();
      expect(spy).toBeCalled();
    });
    it('command Cancelar',()=>{
      expect(component.items[1].command()).toBeUndefined();
    });

    it('command Rehabilitar',()=>{
      expect(component.items[2].command()).toBeUndefined();
    });
    
    it('command Ver detalle',()=>{
      const spy = jest.spyOn(component, 'showModalConsulDetails').mockImplementation();
      component.items[4].command();
      expect(spy).toBeCalled();
    });
  })


  it('disable items (Provisoria)', () => {
    component.disabledItem('Provisoria')
    expect(component.items[0].disabled).toBeTruthy();
  });
  it('disable items (Rechazada)', () => {
    expect(component.disabledItem('Rechazada')).toBeUndefined();
  });

  it('disable items (Activa)', () => {
    component.disabledItem('Activa')
    expect(component.items[0].disabled).toBeFalsy();
  });

  it('disable items (Cancelada)', () => {
    component.disabledItem('Cancelada')
    expect(component.items[0].disabled).toBeTruthy();
  });

  it('disable items (Rechazada)', () => {
    component.disabledItem('Rechazada')
    expect(component.items[0].disabled).toBeTruthy();
  });

  it('disable items (Provisoria)', () => {
    component.disabledItem('Provisoria')
    expect(component.items[0].disabled).toBeTruthy();
  });

  it('show modal consult', () => {
    component.selectedPolicy = { idPolicy: 1 }
    const refOpenSpy = jest.spyOn(ref, 'open')
    component.showModalConsulDetails();
    expect(refOpenSpy).toHaveBeenCalled();
  });

  it('show modal cancelacion/rehabilitación', () => {
    component.selectedPolicy = { idPolicy: 1 }
    const refOpenSpy = jest.spyOn(ref, 'open')
    component.showModal(ModalPolicyActionsComponent, 'Cancelacion/Rehabilitación', component.selectedPolicy, 'test')
    expect(refOpenSpy).toHaveBeenCalled();
  });

  it('getPolicyClaimStatus ok', () => {
    component.selectedPolicy = { idPolicy: 1, policyNumber: 123};
    expect(component.getPolicyClaimStatus()).toBeUndefined();
  });

  it('getPolicyClaimStatus else', () => {
    component.selectedPolicy = { dPolicy: 1, policyNumber: 123 };
    const res = { dataHeader: { code: 500 } };
    jest.spyOn(productService, 'modificationPolicyClaimStatus').mockReturnValue(of (res));
    expect(component.getPolicyClaimStatus()).toBeUndefined();
  });

  it('getDaneCodeD', () => {
    const daneCodeD = '05';
    const service = fixture.debugElement.injector.get(ConsultPolicyService);
    const response: ResponseDTO<any[]> = {
      body: [{
        propertiesPolicyData: {
          gd002_datosdeldebito: {
            DEPAR_COL: daneCodeD,
            CIU_TDB: null
          }
        }
      }],
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
    jest.spyOn(service, 'getPolicyById').mockReturnValue(of (response));

    expect(component.getDaneCode(1)).toBeUndefined();
    expect(component.getCity(daneCodeD)).toBeUndefined();
  });
  it('getDaneCodeC', () => {
    const daneCodeC = '05001';
    const service = fixture.debugElement.injector.get(ConsultPolicyService);
    const response: ResponseDTO<any[]> = {
      body: [{
        propertiesPolicyData: {
          gd002_datosdeldebito: {
            DEPAR_COL: null,
            CIU_TDB: daneCodeC
          }
        }
      }],
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
    jest.spyOn(service, 'getPolicyById').mockReturnValue(of (response));

    expect(component.getDaneCode(1)).toBeUndefined();
    expect(component.getCity(daneCodeC)).toBeUndefined();
  });

  it('getCity', () => {
    const service = fixture.debugElement.injector.get(ProductService);
    const spy1 = jest.spyOn(service, 'getApiData').mockReturnValueOnce(of('city/findByState', '', '05'));
    component.getCity('05');
    expect(spy1).toHaveBeenCalledTimes(1);
  });
});
