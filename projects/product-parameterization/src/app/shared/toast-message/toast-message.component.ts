import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export enum STATES {
  success = 'success',
  error = 'error',
  info = 'info',
  warning = 'warning',
}

export interface DataToast {
  status: STATES;
  title: string;
  msg: string;
}
interface ClassIcon {
  class: string;
  icon: string;
}
@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
})
/**
 * Popup notification component with message
 */
export class ToastMessageComponent implements OnInit {
  //* Defines the class and icon to use when rendering the component
  status: { [key: string]: ClassIcon } = {
    success: { class: 'success', icon: 'fa-check-circle' },
    error: { class: 'error', icon: 'fa-times-circle' },
    info: { class: 'info', icon: 'fa-info-circle' },
    warning: { class: 'warning', icon: 'fa-exclamation-triangle' },
  };

  constructor(
    private snackBarRef: MatSnackBarRef<ToastMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: DataToast
  ) {}

  ngOnInit(): void {
    //ngOnInit
  }

  dismiss = () => {
    this.snackBarRef.dismiss();
  };
}
