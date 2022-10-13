import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConsultPolicyService } from '../../../../../../../apps/policy-management/src/app/containers/policy-management/components/consult-policy/services/consult-policy.service';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';

@Component({
  selector: 'refactoring-smartcore-mf-modal-policy-actions',
  templateUrl: './modal-policy-actions.component.html',
  styleUrls: ['./modal-policy-actions.component.scss'],
})
export class ModalPolicyActionsComponent implements OnInit {
  formProcess: FormGroup;
  causes: any[] = []

  selectedPolicy: any = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public consultPolicyService: ConsultPolicyService,
    public modalAPService: ModalPolicyActionsService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    console.log('config', config)
    this.formProcess = fb.group({
      processDate: fb.control(null),
      causeType: fb.control(null, Validators.required),
      immediate:fb.control(1),
      applicationProcess: fb.control(this.config.data.process),
      observation: fb.control(null, Validators.maxLength(2000))
    });
  }

  ngOnInit(): void {
    console.log(''); 
    this.getCauses(this.config.data.process); 
  }

  getCauses(applicationProcess: string){
    this.modalAPService.getCauses(applicationProcess)
    .subscribe( causes => {
      console.log('causas', causes);
      
      this.causes = causes.body;
      } )
    }

  disableButton() {
      return !(this.formProcess.valid)
    } 

  cancelPolicy() {

    if (this.formProcess.valid) {
      this.modalAPService
        .postCancelPolicy(this.config.data.policy ,this.formProcess.value)
        .subscribe((resp) => {
          console.log('cancelar', resp);
        });
      
      return this.showSuccess();
    } else {
      return false;
    }
  }

  rehabilitatePolicy(){
    if(this.formProcess.valid) {
      this.modalAPService
        .postRehabilitation(this.config.data.policy, this.formProcess.value)
        .subscribe((resp) => {
          console.log('rehabilitar', resp);
          
        })
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Anulación exitosa',
      detail: 'Se ha anulado la póliza',
    });
  }
}
