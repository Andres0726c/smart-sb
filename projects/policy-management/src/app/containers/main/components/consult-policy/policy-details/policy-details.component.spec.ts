import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { of } from 'rxjs';
import { PolicyDetailsComponent } from './policy-details.component';

const localStorageMock = (function() {
  let store: any = {};
  return {
    getItem: function(key: string | number) {
      return store[key];
    },
    setItem: function(key: string | number, value: string) {
      store[key] = value;
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string | number) {
      delete store[key];
    }
  };
})();
  
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;
  let ref: DynamicDialogRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        PolicyDetailsComponent,
        DynamicDialogRef,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { idPolicy: 1 } },
        },
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;

    const response: ResponseDTO<any> = {
      body: {
        payment: {
          method: 'test',
          type: 'test'
        },
        servicePlan: {
          name: 'test'
        },
        propertiesPolicyData: {
          datos_basicos: {
            PERIODO_FACT: '5'
          }
        },
        productFactory: {
          nmContent: {
            policyData: [
              {
                fields: [
                  {
                    businessCode: 'MEDIO_PAGO',
                    domainList: {
                      valueList: '[{"code": "mep_efe", "description": "Efectivo"}, {"code": "mep_tcr", "description": "Tarjeta de crédito"}, {"code": "mep_tbc", "description": "Transferencia bancaria"}, {"code": "mep_chq", "description": "Cheque"}, {"code": "mep_agp", "description": "Agente promotor"}, {"code": "mep_dba", "description": "Cuenta de ahorros"}, {"code": "mep_dbc", "description": "Cuenta corriente"}, {"code": "mep_lbz", "description": "Libranza"}, {"code": "mep_dvp", "description": "Daviplata"}]'
                    }
                  }

                ]
              },
              {
                fields: [
                  {
                    businessCode: 'MEDIO_PAGO',
                    domainList: {
                      valueList: '[{"code": "mep_efe", "description": "Efectivo"}, {"code": "mep_tcr", "description": "Tarjeta de crédito"}, {"code": "mep_tbc", "description": "Transferencia bancaria"}, {"code": "mep_chq", "description": "Cheque"}, {"code": "mep_agp", "description": "Agente promotor"}, {"code": "mep_dba", "description": "Cuenta de ahorros"}, {"code": "mep_dbc", "description": "Cuenta corriente"}, {"code": "mep_lbz", "description": "Libranza"}, {"code": "mep_dvp", "description": "Daviplata"}]'
                    }
                  }

                ]
              }
            ],
            riskTypes: [
              {
                businessPlans: [
                  {
                    id: 0,
                    name: 'test'
                  }
                ],
                complementaryData: [
                  {
                    fields: [
                      {
                        businessCode: 'test'
                      }
                    ]
                  },
                  {
                    fields: [
                      {
                        businessCode: 'TIPO_MASCOTA',
                        domainList: {
                          valueList: "[{ code: 1, description: 'Perro' }]"
                        }
                      },
                      {
                        businessCode: 'RAZA',
                        domainList: {
                          valueList: "[{ code: 1, description: 'Bóxer' }]"
                        }
                      },
                      {
                        businessCode: 'EDAD_MASCOTA',
                        domainList: {
                          valueList: "[{ code: 1, description: 'De 3 a 5 años' }]"
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
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
      },
    };
    jest
      .spyOn(component.consultPolicyService, 'getPolicyById')
      .mockReturnValue(of(response));

    localStorageMock.setItem('turnoverperiod', '[{"id": "5", "name": "Anual"}]');
    component.config.data.policy = {};
    jest.spyOn(component.productService, 'getPremiumData').mockReturnValue(of({dataHeader: {code: 200}, body: {}}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('findDescription', () => {
    let dataRisk = [
      {
        businessCode: 'TIPO_MASCOTA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Perro' }])
        }
      },
      {
        businessCode: 'RAZA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Bóxer' }])
        }
      }
    ];
    expect(component.findDescription(dataRisk, 'TIPO_MASCOTA', '1')).toEqual('Perro');
  });

  it('findDescription exception field', () => {
    let dataRisk = [
      {
        businessCode: 'TIPO_MASCOTA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Perro' }])
        }
      },
      {
        businessCode: 'RAZA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Bóxer' }])
        }
      }
    ];
    expect(component.findDescription(dataRisk, 'TEST', '1')).toEqual('No aplica');
  });

  it('findDescription exception', () => {
    let dataRisk = [
      {
        businessCode: 'TIPO_MASCOTA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Perro' }])
        }
      },
      {
        businessCode: 'RAZA',
        domainList: {
          valueList: JSON.stringify([{ code: '1', description: 'Bóxer' }])
        }
      }
    ];
    expect(component.findDescription(dataRisk, 'TIPO_MASCOTA', '2')).toEqual('No aplica');
  });


  it('close modal', () => {
    expect(component.close()).toBeUndefined();
  });

});