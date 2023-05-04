import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'refactoring-smartcore-mf-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.scss'],
})
export class ModalRoleComponent implements OnInit {
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
