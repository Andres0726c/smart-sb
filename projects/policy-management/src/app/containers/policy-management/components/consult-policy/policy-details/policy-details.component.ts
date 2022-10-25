import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PolicyBrief } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ConsultPolicyService } from '../services/consult-policy.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  policy!: PolicyBrief
  constructor(public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService,) { }

  ngOnInit(): void {
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe({
      next: (res)=>this.policy = res.body,
      error: (err)=> err,
    })
  }

}
