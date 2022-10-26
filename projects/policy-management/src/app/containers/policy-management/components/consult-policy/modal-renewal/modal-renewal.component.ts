import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';
import { ConsultPolicyService } from '../services/consult-policy.service';

@Component({
  selector: 'app-modal-renewal',
  templateUrl: './modal-renewal.component.html',
  styleUrls: ['./modal-renewal.component.scss'],
})
export class ModalRenewalComponent implements OnInit {
  val: string = '';
  policy!: Policy

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    public consultPolicyService: ConsultPolicyService
  ) {}

  ngOnInit(): void {
    this.policy = this.config.data.policy;
    console.log(this.policy);
    
  }

  cancelRenewal() {
    this.ref.close();
  }
}
