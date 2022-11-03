import { Component, OnInit } from '@angular/core';
import { Policy } from 'projects/policy-management/src/app/core/interfaces/policy';

@Component({
  selector: 'app-modal-renewal',
  templateUrl: './modal-renewal.component.html',
  styleUrls: ['./modal-renewal.component.scss'],
})
export class ModalRenewalComponent {
  val: string = '';
  policy!: Policy
}
