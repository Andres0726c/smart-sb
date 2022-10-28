import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';

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


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
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
    this.getCauses(this.config.data.process); 
  }

  getCauses(applicationProcess: string){
    this.modalAPService.getCauses(applicationProcess)
    .subscribe( causes => {      
      this.causes = causes.body;
      } )
    }

  getPremium(){
    this.modalAPService.getPremium()
    .subscribe( premium => {
      this.premium = premium.body;
    } )
  }

  cancelPolicy() {
console.log('processValue', this.formProcess.value);

    if (this.formProcess.valid) {
      this.modalAPService
        .postCancelPolicy(this.config.data.policy ,this.formProcess.value)
        .subscribe((resp: any) => {
          console.log('polizas', this.config.data.policy);
          console.log('formulario', this.formProcess.value);
          
          if(resp.dataHeader.code != 500){
            this.ref.close(true)
            this.showSuccess('success', 'Cancelación Exitosa', 'La póliza ha sido cancelada');
          } else  {
              this.messageError = true;
              return this.showSuccess('error', 'Error al cancelar', resp.dataHeader.status);
          }
        }, 
        // (error) => {        
        //   this.messageError = true;
        //   this.showSuccess('error', 'Error al cancelar', error.error.dataHeader.status);
        // }
        );
    }
  }

  rehabilitatePolicy(){
    if(this.formProcess.valid) {
      this.modalAPService
        .postRehabilitation(this.config.data.policy, this.formProcess.value)
        .subscribe((resp: any) => {
          if(resp.dataHeader.code != 500){
            this.ref.close(true)
            this.showSuccess('success', 'Rehabilitación exitosa', 'La póliza ha sido rehabilitada');   //revisar estos retornos y el envío de post
          } else {
              this.messageError = true;
              return this.showSuccess('error', 'Error al rehabilitar', resp.dataHeader.status);
          }  
        },
        //  (error) => {          
        //   this.messageError = true;
        //   this.showSuccess('error', 'Error al rehabilitar', error.error.dataHeader.status);
        // }
        );
    }
  }

    verifyDate() {
    const date = new Date(
      this.formProcess.get('processDate')?.value
    ).toISOString();
    const inceptionDate = new Date(
      this.config.data.policy.inceptionDate
    ).toISOString();
    const expirationDate = new Date(
      this.config.data.policy.expirationDate
    ).toISOString();

    if (this.formProcess.get('processDate')?.value && date >= inceptionDate && date <= expirationDate) {
      this.formProcess.get('causeType')?.enable();
      this.formProcess.get('observation')?.enable();
    } else {
      this.formProcess.reset()
      this.formProcess.get('immediate')?.setValue(1);
      this.formProcess.get('applicationProcess')?.setValue(this.config.data.process)
      this.formProcess.get('causeType')?.disable();
      this.formProcess.get('observation')?.disable();
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
