import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { ConsultPolicyService } from '../../consult-policy/services/consult-policy.service';
@Component({
  selector: 'app-policy-failed-details',
  templateUrl: './policy-failed-details.component.html',
  styleUrls: ['./policy-failed-details.component.scss'],
  providers: [MessageService, DialogService],
})
export class PolicyFailedDetailsComponent {
  component: any;
  isLoading = true;
  policy!: Policy

  constructor(
    public ref: DynamicDialogRef, 
    public dialogService: DialogService,
    public config: DynamicDialogConfig
  ) { }

  close() {
    this.ref.close(true)
  }

}
