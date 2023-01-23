import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { of } from 'rxjs';
import { PolicyDetailsComponent } from './policy-details.component';

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
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;

    const response: ResponseDTO<any> = {
      body: {
        servicePlan: {
          name: 'test'
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