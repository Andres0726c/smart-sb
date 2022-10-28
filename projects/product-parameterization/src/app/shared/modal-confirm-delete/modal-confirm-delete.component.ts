import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-confirm-delete',
  templateUrl: './modal-confirm-delete.component.html',
  styleUrls: ['./modal-confirm-delete.component.scss']
})
/**
 * Component to confirm deleting an element
 * @param data variable to show the msg of the modal
 * @return true if the user presses accept, false if the user presses cancel 
 */
export class ModalConfirmDeleteComponent implements OnInit {
  message: string = ""
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      img: string,
      message:string,
      subMessage?: string
    }
  ) { }

  ngOnInit(): void {
    // ngOnInit
  }
}
