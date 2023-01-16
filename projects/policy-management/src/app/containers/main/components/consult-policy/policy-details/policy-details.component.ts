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

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService) { }

  ngOnInit(): void {
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe((res) => {
      if (res.body) {
        this.policy = res.body
        let dataRisk = this.policy.productFactory.nmContent?.riskTypes[0].complementaryData[1].fields;

        this.petData = {
          petType: this.findDescription(dataRisk, 'TIPO_MASCOTA', this.policy.complementaryData.petType),
          petBrand: this.findDescription(dataRisk, 'RAZA', this.policy.complementaryData.petBrand),
          petAge: this.findDescription(dataRisk, 'EDAD_MASCOTA', this.policy.complementaryData.petAge)
        }

       
      }
      this.isLoading = false
    });
  }

  findDescription(dataRisk: any, businessCode: string, code: string) {
    const field = dataRisk.find((f: any) => f.businessCode === businessCode);
    if(!field) {
      return 'No aplica';
    }
    const valueList = JSON.parse(field.domainList.valueList);
    const value = valueList.find((x: any) => x.code === code);
    return value ? value.description : 'No aplica';
  }

  close() {
    this.ref.close(true)
  }

}
