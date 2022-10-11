import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConsultPolicyService } from '../../../../../../../apps/policy-management/src/app/containers/policy-management/components/consult-policy/services/consult-policy.service';

@Component({
  selector: 'refactoring-smartcore-mf-modal-policy-actions',
  templateUrl: './modal-policy-actions.component.html',
  styleUrls: ['./modal-policy-actions.component.scss'],
})
export class ModalPolicyActionsComponent implements OnInit {
  formProcess: FormGroup;
  causes = [
    {
      type: 'Seleccione',
      description: null,
    },
    {
      idCause: 1,
      type: 'Anulación',
      description: 'Por parte del usuario',
    },
    {
      idCause: 2,
      type: 'Cancelación',
      description: 'Por parte del cliente',
    },
  ];

  selectedPolicy: any = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public consultPolicyService: ConsultPolicyService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    console.log('config', config)
    this.formProcess = fb.group({
      processDate: fb.control(null, Validators.required),
      idCause: fb.control(null),
      causeType: fb.control(null, Validators.required),
      observation: fb.control(null, Validators.maxLength(2000))
    });
  }

  ngOnInit(): void {
    console.log('');   
  }

  verifyDate() {
    const date = new Date(
      this.formProcess.get('processDate')?.value
    ).toISOString();
    const inceptionDate = new Date(
      this.selectedPolicy?.inceptionDate
    ).toISOString();
    const expirationDate = new Date(
      this.selectedPolicy?.expirationDate
    ).toISOString();
    console.log('fecha actual', date);
    console.log('inceptionDate', inceptionDate);
    console.log('expirationDate', expirationDate);

    if (
      this.formProcess.get('processDate')?.value &&
      date >= inceptionDate &&
      date <= expirationDate
    ) {
      this.formProcess.get('causeType')?.enable();
      this.formProcess.get('observation')?.enable();
    } else {
      this.formProcess.get('causeType')?.disable();
      this.formProcess.get('observation')?.disable();
    }
  }

  disableButton() {
    if (this.selectedPolicy) {
      const date = new Date(
        this.formProcess.get('processDate')?.value
      ).toISOString();
      const inceptionDate = new Date(
        this.selectedPolicy?.inceptionDate
      ).toISOString();
      const expirationDate = new Date(
        this.selectedPolicy?.expirationDate
      ).toISOString();
      return !(
        this.formProcess.valid &&
        this.formProcess.get('processDate')?.value &&
        date >= inceptionDate &&
        date <= expirationDate
      );
    } else {
      return true;
    }
  }

  cancelPolicy() {
    console.log('selected Policy', this.selectedPolicy);
    console.log('formDate', this.formProcess);

    if (this.formProcess.valid) {
      this.consultPolicyService
        .cancelDate(this.selectedPolicy, this.formProcess.value)
        .subscribe((resp) => {
          console.log('respuesta', resp);
        });
      this.showModal();
      return this.showSuccess();
    } else {
      return false;
    }
  }

  showModal() {
    const ref = this.dialogService.open(ModalPolicyActionsComponent, {
      data: {
        process: 'Opcion',
        policy: this.selectedPolicy
      },
      header: 'Proceso',
      modal: true,
      dismissableMask: true,
      width: '60%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    ref.onClose.subscribe((res: any) =>{
        if (res) {
            console.log('Modal cerrado')
        }
    });
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
