import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ConsultPolicyService } from '../services/consult-policy.service';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {
  message: Message = { severity: 'success', summary: 'Success', detail: 'Message Content' }
  isLoading = true;
  policy!: Policy
  constructor(public config: DynamicDialogConfig, public consultPolicyService: ConsultPolicyService,) { }

  ngOnInit(): void {
    this.consultPolicyService.getPolicyById(this.config.data.idPolicy).subscribe({
      next: (res) => {
        if (res.body) {
          this.policy = res.body
          
        } else {

        }
        this.isLoading = false
      },
      error: (err) => this.isLoading = false,
    });
  }

}
