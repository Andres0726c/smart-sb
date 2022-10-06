import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'refactoring-smartcore-mf-modal-policy-actions',
  templateUrl: './modal-policy-actions.component.html',
  styleUrls: ['./modal-policy-actions.component.scss'],
})
export class ModalPolicyActionsComponent implements OnInit {
  formProcess: FormGroup;
  causes = [
    {
      type: 'Seleccione',
      description: null,
    },
    {
      idCause: 1,
      type: 'Anulación',
      description: 'Por parte del usuario',
    },
    {
      idCause: 2,
      type: 'Cancelación',
      description: 'Por parte del cliente',
    },
  ];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public fb: FormBuilder
  ) {
    console.log('config', config)
    this.formProcess = fb.group({
      processDate: fb.control(null, Validators.required),
      idCause: fb.control(null),
      causeType: fb.control(null, Validators.required),
      observation: fb.control(null, Validators.maxLength(2000))
    });
  }

  ngOnInit(): void {
    //
  }
}
