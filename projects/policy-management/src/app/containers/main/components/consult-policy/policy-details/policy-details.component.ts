import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ConsultPolicyService } from '../services/consult-policy.service';
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

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService) { }

  ngOnInit(): void {
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
            petBrand: this.findDescription(dataRisk, 'RAZA', this.policy.complementaryData.petBrand),
            petAge: this.findDescription(dataRisk, 'EDAD_MASCOTA', this.policy.complementaryData.petAge)
          }
        } catch (error) {
          console.error('Ha ocurrido un error al procesar los datos, por favor intente nuevamente');
        }
      }
      this.isLoading = false;
    });
  }

  findDescription(fieldsArray: any, businessCode: string, code: string) {
    const field = fieldsArray.find((f: any) => f.businessCode === businessCode);
    if(!field) {
      return 'No aplica';
    }
    const valueList = JSON.parse(field.domainList.valueList);
    const value = valueList.find((x: any) => x.code === code);
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

}
