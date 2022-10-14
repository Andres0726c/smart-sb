import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ModalPolicyActionsComponent } from './modal-policy-actions.component';
import { ConsultPolicyService } from 'apps/policy-management/src/app/containers/policy-management/components/consult-policy/services/consult-policy.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('ModalPolicyActionsComponent', () => {
  let component: ModalPolicyActionsComponent;
  let consultPolicyService: ConsultPolicyService;
  let fixture: ComponentFixture<ModalPolicyActionsComponent>;

  beforeEach(async () => {
    consultPolicyService = ConsultPolicyService.prototype;
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        ModalPolicyActionsComponent,
        DynamicDialogRef,

        FormBuilder,
        ModalPolicyActionsComponent,
        DialogService,
        MessageService,
        {
          provide: DynamicDialogConfig,
          useValue: { data: { policy: {}, process: 'Anular/Cancelar' } },
        },
      ],
      imports: [HttpClientModule],
    });
    component = TestBed.inject(ModalPolicyActionsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.getCauses).toBeCalledTimes(1);
  });

  it('disableButton', () => {
    expect(component.disableButton()).toBeTruthy();
  });

  it('showSuccess', () => {
    expect(component.showSuccess()).toBeTruthy();
  });
});
