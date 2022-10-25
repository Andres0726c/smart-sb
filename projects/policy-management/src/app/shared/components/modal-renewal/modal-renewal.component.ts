import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-modal-renewal',
  templateUrl: './modal-renewal.component.html',
  styleUrls: ['./modal-renewal.component.scss'],
})
export class ModalRenewalComponent implements OnInit {
  val:string = '';
  policy: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.policy = this.config.data.policy;
    console.log('polixy', this.policy)
  }
}
