import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'refactoring-smartcore-mf-modal-form-role',
  templateUrl: './modal-form-role.component.html',
  styleUrls: ['./modal-form-role.component.scss'],
})
export class ModalFormRoleComponent implements OnInit {
  modal!: any;

  constructor(
    public ref: DynamicDialogRef,
    public dataSourceModal: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.modal = this.dataSourceModal;
    console.log(this.modal);
  }
}