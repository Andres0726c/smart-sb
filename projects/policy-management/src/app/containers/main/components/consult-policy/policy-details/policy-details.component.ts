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
  petData: any=
    {
    petType:"",
    petBrand:""
    };
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService) { }

  ngOnInit(): void {
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe({
      next: (res) => {
        if (res.body) {
          this.policy = res.body

          let dataRisk = this.policy.productFactory.nmContent?.riskTypes[0].complementaryData[1].fields;

          let petTypeLst = JSON.parse(dataRisk.find((f:any) => f.businessCode=== "TIPO_MASCOTA")?.domainList.valueList);
          let petBrandLst = JSON.parse(dataRisk.find((f:any) => f.businessCode=== "RAZA")?.domainList.valueList);

          this.petData={
            petType: petTypeLst.find((x:any)=>x.code === this.policy.complementaryData.petType)?.description,
            petBrand: petBrandLst.find((x:any)=>x.code === this.policy.complementaryData.petBrand)?.description,
          }

         
        }
        this.isLoading = false
      },
      error: (err) => this.isLoading = false,
    });
  }

  close() {
    this.ref.close(true)
  }

}
