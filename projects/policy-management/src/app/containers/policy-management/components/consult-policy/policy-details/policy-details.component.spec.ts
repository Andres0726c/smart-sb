import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { of } from 'rxjs';
import { ConsultPolicyService } from '../services/consult-policy.service';

import { PolicyDetailsComponent } from './policy-details.component';

describe('PolicyDetailsComponent', () => {
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

  it('ngOnInit', fakeAsync(() => {

    const response: ResponseDTO<any> = {
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
      .spyOn(consultPolicyService, 'getPolicyById')
      .mockReturnValueOnce(of(response));
    component.ngOnInit();
    expect(component.policy).toEqual(['test']);
  }));


  it('close modal', () => {
    const refCloseSpy = jest.spyOn(ref, 'close')
    component.close()
    expect(refCloseSpy).toHaveBeenCalled();
  });

});
