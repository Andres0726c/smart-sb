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
        productFactory: {
          nmContent: {
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