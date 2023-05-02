import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { ConsultPolicyService } from '../services/consult-policy.service';
import { PolicyEndorsementComponent } from '../policy-endorsement/policy-endorsement.component';
@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {
  component: any;
  isLoading = true;
  policy!: Policy
  petData: any = {
    petType:"",
    petBrand:"",
    petAge:""
  };
  businessPlan = 'No aplica';
  paymentType = 'No aplica';
  turnoverPeriod = 'No Aplica';
  premiumData: any = null;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig, 
    public dialogService: DialogService,
    public consultPolicyService: ConsultPolicyService,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getPremiumData(this.config.data.policy);
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe((res) => {
      if (res.body) {
        try {
          this.policy = res.body
          let product = this.policy.productFactory.nmContent;
          let dataRisk = product.riskTypes[0].complementaryData[1].fields;
          let paymentData = product.policyData[1].fields;
          let businessPlans = this.getBusinessPlans(product.riskTypes);
          let policyTurnoverPeriod = this.policy.propertiesPolicyData.datos_basicos['PERIODO_FACT'];
          let listTurnoverPeriods = JSON.parse(localStorage.getItem('turnoverperiod') || '[]');

          this.turnoverPeriod = listTurnoverPeriods.find((x: any) => x.id === policyTurnoverPeriod)?.name;
          this.businessPlan = businessPlans.find((x: any) => x.code === this.policy.servicePlan.name)?.name;
          this.paymentType = this.findDescription(paymentData, 'MEDIO_PAGO', this.policy.payment.type);

          this.petData = {
            petType: this.findDescription(dataRisk, 'TIPO_MASCOTA', this.policy.complementaryData.petType),
            petBrand: this.policy.complementaryData.petBrand? this.policy.complementaryData.petBrand : 'No Aplica',
            petAge: this.findDescription(dataRisk, 'EDAD_MASCOTA', this.policy.complementaryData.petAge)
          }
        } catch (error) {
          console.error('Ha ocurrido un error al procesar los datos, por favor intente nuevamente');
        }
      }
      this.isLoading = false;
    });
  }

  getPremiumData(policy: any) {
    this.premiumData = null;
    this.productService.getPremiumData(policy.policyNumber, policy.endorsementNumber).subscribe((res: any) => {
      this.premiumData = res.body;
    });
  }

  findDescription(fieldsArray: any, businessCode: string, code: string) {
    const field = fieldsArray.find((f: any) => f.businessCode === businessCode);
    if(!field) {
      return 'No aplica';
    }
    const valueList = JSON.parse(field.domainList.valueList);
    const value = valueList.find((x: any) => x.code.toString()===code.toString());
    return value ? value.description : 'No aplica';
  }

  getBusinessPlans(riskData: any) {
    let arrayBusinessPlans: any[] = [];
    for(let risk of riskData) {
      arrayBusinessPlans = arrayBusinessPlans.concat(risk.businessPlans)
    }

    return arrayBusinessPlans;
  }

  close() {
    this.ref.close(true)
  }

  showPolicyEndorsementModal() {
    this.close();
    this.dialogService.open(PolicyEndorsementComponent, {
      data: {
        idPolicy: this.policy.policyNumber
      },
      header: 'Consulta endosos',
      modal: true,
      dismissableMask: true,
      width: '100%',
      styleClass: 'w-full sm:w-4/5 md:w-3/5',
      contentStyle: { 'max-height': '600px', 'overflow': 'auto', 'padding-bottom': '0px' },
      baseZIndex: 10000,
    })
  }

}
