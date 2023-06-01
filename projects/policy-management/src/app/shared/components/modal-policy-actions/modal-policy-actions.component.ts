import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsService } from './services/modal-policy-actions.service';
import { ConsultPolicyService } from '../../../containers/main/components/consult-policy/services/consult-policy.service';
import {ConfirmationService} from 'primeng/api';
import { ProductService } from '../../../core/services/product/product.service';

@Component({
  selector: 'modal-policy-actions',
  templateUrl: './modal-policy-actions.component.html',
  styleUrls: ['./modal-policy-actions.component.scss'],
  providers: [ConfirmationService],
})
export class ModalPolicyActionsComponent implements OnInit {
  formProcess: FormGroup;
  causes: any[] = []
  premium: any;
  messageError = false;
  isDateValid = true;
  policies: any;
  paymentMethod: string = '';
  premiumData: any = null;
  cancellationCsCd: any[] = []
  reinstatementCsCd: any[] = []
  isCancellable = false;


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public modalAPService: ModalPolicyActionsService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public consultPolicyService: ConsultPolicyService,
    public productService: ProductService,
    private confirmationService: ConfirmationService,
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

  ngOnInit(){
    this.getPremiumData(this.config.data.policy);
    this.consultPoliciesById(this.config.data.policy.idPolicy);
  }

  getPremiumData(policy: any) {
    this.premiumData = null;
    this.productService.getPremiumData(policy.policyNumber, policy.endorsementNumber).subscribe((res: any) => {
      this.premiumData = res.body;
    });
  }

  consultPoliciesById(id: number){
      this.consultPolicyService.getPolicyById(id).subscribe(
        {
          next:(policies) => {
            this.paymentMethod = policies.body.payment.method;
            this.cancellationCsCd = policies.body.productFactory.nmDefinition.prdct?.cnclltnPrcss?.cnclltnCsCd;
            this.reinstatementCsCd = policies.body.productFactory.nmDefinition.prdct?.rnsttmntPrcss?.rnsttmntCsCd;
            this.isCancellable = policies.body.productFactory.nmDefinition.prdct?.cnclltnPrcss?.isCncllblIncptnDt;
            this.getCauses(this.config.data.process);
          },
          error: (errors) =>{
            console.error("Error_Getting_Service_Response:",errors);
          }
        }
      );
  }

  getCauses(applicationProcess: string){
    this.modalAPService.getCauses(applicationProcess)
    .subscribe( causes => {

      if(applicationProcess == "Cancelación"){
        this.causes = causes?.body?.filter((item: { businessCode: string; }) =>
          this.cancellationCsCd?.includes(item.businessCode)
        )
      }
      else if(applicationProcess == "Rehabilitación"){
        this.causes = causes?.body?.filter((item: { businessCode: string; }) =>
          this.reinstatementCsCd?.includes(item.businessCode)
        )
      }else{
        this.causes = causes.body;
      }

      });
    }

  /*getPremium(idPolicy: any, deletionDate: any){

    this.modalAPService.getPremium(idPolicy, deletionDate)
    .subscribe( premium => {
      this.premium = premium.body;
    });
  }*/

  /**
   * Method for calculate ammount to return, based on selected process date, expiration date and premium value
   * @param premiumValue
   * @param processDate
   * @param expirationDate
   */
  getPremiumReturnValue(premiumValue: any, processDate: any, expirationDate: any){
    expirationDate = new Date(expirationDate).toISOString();
    processDate = new Date(processDate).toISOString();
    this.modalAPService.getPremiumReturnValue(premiumValue, processDate, expirationDate)
    .subscribe( premium => {
      this.premium = premium.body.value;
    });
  }

  /**
   * Method for calculate ammount to return, based on selected process date
   * @param inceptionDate policy start date
   * @param expirationDate policy end date
   * @param processDate selected process date
   */
  /*getAmountToReturn(inceptionDate: any, expirationDate: any, processDate: any) {
    inceptionDate = new Date(inceptionDate);
    expirationDate = new Date(expirationDate);
    processDate = new Date(processDate);
    const policyDays = Math.round((expirationDate - inceptionDate) / (1000 * 60 * 60 * 24));
    const diffDays = Math.round((expirationDate - processDate) / (1000 * 60 * 60 * 24));
    const premium = this.premiumData ? Number(this.premiumData.premiumEndValue) : 0;
    const dayValue = premium / policyDays;
    this.premium = this.premiumData ? Number((dayValue * diffDays).toFixed(2)): null;
  }*/

  cancelPolicy() {
    this.modalAPService.getExistsPreviousRenewalByIdPolicy(this.config.data.policy.idPolicy).subscribe((res: any) => {
      if (res.dataHeader.code === 200) {
        if (res.body.exists) {
          this.confirmationService.confirm({
            header: '¿Está seguro de cancelar la póliza?',
            message: `
                <div class="flex justify-center pt-5 pb-3">
                    <img src="smartcore-commons/assets/styles/material-theme/icons/picto-alert.svg" alt="icon-warning">
                </div>
                <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl">
                  <p class="w-full text-center">
                    La póliza tiene un movimiento pendiente.
                  </p>
                </div>
              `,
            accept: () => {
              this.cancelPolicyConfirm();
            }
          });
        }else{
          this.cancelPolicyConfirm();
        }
      }
    })

  }

  cancelPolicyConfirm(){
    if (this.formProcess.valid) {
      if(this.formProcess.get('processDate')?.value){
      this.modalAPService
        .postCancelPolicy(this.config.data.policy ,this.formProcess.value)
        .subscribe((resp: any) => {

          if(resp.dataHeader.code != 500){
            this.ref.close(true)
            if (resp.body.message === "Cancelación exitosa") {
              this.showSuccess('success', resp.body.message, 'La póliza ha sido cancelada');
            } else {
              this.showSuccess('success', resp.body.message, 'La cancelación fue agendada y se hará efectiva en la fecha seleccionada');
            }

          } else  {
              this.messageError = true;
              this.showSuccess('error', 'Error al cancelar', resp.dataHeader.status);
          }
        }
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
    this.isDateValid = true;
    const date = new Date( new Date(this.formProcess.get('processDate')?.value).toDateString());
    const inceptionDate = new Date( new Date(this.config.data.policy.inceptionDate).toDateString());
    const expirationDate = new Date (new Date(this.config.data.policy.expirationDate).toDateString());

    const [withoutTime] = date.toISOString().split('T');
    if (this.formProcess.get('processDate')?.value && date >= inceptionDate && date <= expirationDate) {
      this.getPremiumReturnValue(this.premiumData.premiumEndValue, withoutTime, expirationDate);
    } else {
      this.formProcess.get('immediate')?.setValue(0);
      this.formProcess.get('applicationProcess')?.setValue(this.config.data.process);
      this.premium = null;
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
      detail: msg,
      contentStyleClass: "message-succes-alert"
    });
  }
}
