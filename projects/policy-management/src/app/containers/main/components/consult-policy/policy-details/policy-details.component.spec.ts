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


  it('close modal', () => {
    expect(component.close()).toBeUndefined();
  });

});

/*describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let consultPolicyService: ConsultPolicyService;
  let ref: DynamicDialogRef;
  let fixture: ComponentFixture<PolicyDetailsComponent>;

  beforeEach(async () => {
    consultPolicyService = ConsultPolicyService.prototype;
    ref = DynamicDialogRef.prototype
    TestBed.configureTestingModule({
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
    });
    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('close modal', () => {
    const refCloseSpy = jest.spyOn(ref, 'close')
    component.close()
    expect(refCloseSpy).toHaveBeenCalled();
  });

});*/
