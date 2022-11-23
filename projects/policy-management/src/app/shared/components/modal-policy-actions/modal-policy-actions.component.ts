import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';
import { ConsultPolicyService } from '../../../containers/main/components/consult-policy/services/consult-policy.service';
import { PolicyBrief } from '../../../core/interfaces/policy';
import { ResponseDTO } from '../../../core/interfaces/commun/response';
import { FilterPolicy } from '../../../containers/main/components/consult-policy/interfaces/consult-policy';

@Component({
  selector: 'modal-policy-actions',
  templateUrl: './modal-policy-actions.component.html',
  styleUrls: ['./modal-policy-actions.component.scss'],
})
export class ModalPolicyActionsComponent implements OnInit {
  formProcess: FormGroup;
  causes: any[] = []
  premium: any;
  messageError = false;
  isDateValid = true;
  policies: any;
  paymentMethod: string = '';


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public modalAPService: ModalPolicyActionsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public consultPolicyService: ConsultPolicyService
  ) {
    this.formProcess = fb.group({
      processDate: fb.control(null),
      rehabilitationDate: fb.control(null),
      causeType: fb.control(null, Validators.required),
      immediate:fb.control(0),
      applicationProcess: fb.control(this.config.data.process),
      checked: fb.control(false),
      observation: fb.control(null, Validators.maxLength(2000))
    });
    if (this.config.data.policy.endorsementInceptionDate) {
      this.formProcess.get('rehabilitationDate')?.setValue(new Date(this.config.data.policy.endorsementInceptionDate));
    }
  }

  ngOnInit(): void {
    this.getCauses(this.config.data.process);
    this.consultPoliciesById(this.config.data.policy.idPolicy)    
  }

  consultPoliciesById(id: number) {
  this.consultPolicyService.getPolicyById(id).subscribe( policies => {
    console.log(policies);
    
    this.paymentMethod = policies.body.payment.method;
  });
  }

  getCauses(applicationProcess: string){
    this.modalAPService.getCauses(applicationProcess)
    .subscribe( causes => {
      this.causes = causes.body;
      });
    }

  getPremium(idPolicy: any, deletionDate: any){

    this.modalAPService.getPremium(idPolicy, deletionDate)
    .subscribe( premium => {      
      this.premium = premium.body;
    });
  }

  cancelPolicy() {

    if (this.formProcess.valid) {
      if(this.formProcess.get('processDate')?.value){
      this.modalAPService
        .postCancelPolicy(this.config.data.policy ,this.formProcess.value)
        .subscribe((resp: any) => {

          if(resp.dataHeader.code != 500){
            this.ref.close(true)
            this.showSuccess('success', 'Cancelación Exitosa', 'La póliza ha sido cancelada');
          } else  {
              this.messageError = true;
              this.showSuccess('error', 'Error al cancelar', resp.dataHeader.status);
          }
        },
        // (error) => {
        //   this.messageError = true;
        //   this.showSuccess('error', 'Error al cancelar', error.error.dataHeader.status);
        // }
        );
      } else {
        this.messageError = true;
        this.showSuccess('error', 'Error al cancelar', 'Seleccione una fecha válida');
      }
    }
  }

  rehabilitatePolicy() {
    if (this.formProcess.valid) {
      if (this.formProcess.get('rehabilitationDate')?.value) {
        this.modalAPService
          .postRehabilitation(this.config.data.policy, this.formProcess.value)
          .subscribe({
            next: (resp: any) => {
              if (resp.dataHeader.code != 500) {
                this.ref.close(true)
                this.showSuccess('success', 'Rehabilitación exitosa', 'La póliza ha sido rehabilitada');
              } else {
                this.messageError = true;
                this.showSuccess('error', 'Error al rehabilitar', resp.dataHeader.status);
              }
            },
            error: (exception: any) => {
              this.messageError = true;
              this.showSuccess('error', 'Error al rehabilitar', exception.error.dataHeader ? exception.error.dataHeader.status : exception.message);
            }
          });
      } else {
        this.messageError = true;
        this.showSuccess('error', 'Error al rehabilitar', 'Por favor seleccione una fecha válida');
      }
    }
  }

    verifyDate() {

    const date = new Date(this.formProcess.get('processDate')?.value).toISOString();
    const inceptionDate = new Date(this.config.data.policy.inceptionDate).toISOString();
    const expirationDate = new Date(this.config.data.policy.expirationDate).toISOString();

    if (this.formProcess.get('processDate')?.value && date >= inceptionDate && date <= expirationDate) {
      this.getPremium(this.config.data.policy.idPolicy, date)
    } else {
      this.formProcess.get('immediate')?.setValue(0);
      this.formProcess.get('applicationProcess')?.setValue(this.config.data.process)
      this.isDateValid = false;
    }
  }

  verifyCheck() {
    
    if(this.formProcess.get('checked')?.value === true){
      this.formProcess.get('processDate')?.setValue(new Date(this.config.data.policy.inceptionDate))
      this.formProcess.get('processDate')?.disable();
      this.formProcess.get('immediate')?.setValue(1);
      this.verifyDate();
    } else{
      this.formProcess.get('processDate')?.enable();
      this.formProcess.get('immediate')?.setValue(0);
    }
  }

  showSuccess(status: string, title: string, msg: string) {
    this.messageService.add({
      severity: status,
      summary: title,
      detail: msg
    });
  }
}
