import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Component({
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
  providers: [DialogService],
})
/**
 * traversal component to handle confirmation when removing elements
 */
export class ModalDeleteComponent implements OnInit {
  modal!: any;

  /**
   * contructor empty
   * @param ref 
   * @param dataSourceModal 
   */
  constructor(
    public ref: DynamicDialogRef,
    public dataSourceModal: DynamicDialogConfig
  ) {
    //contructor
  }

  /**
   * capture the data that comes in the call to the modal
   */
  ngOnInit(): void {
    this.modal = this.dataSourceModal.data;
  }

  /**
   * return true value on close the modal
   */
  accept() {
    this.ref.close(true);
  }
}
