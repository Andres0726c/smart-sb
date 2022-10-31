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
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService) { }

  ngOnInit(): void {
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe({
      next: (res) => {
        if (res.body) {
          this.policy = res.body
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
