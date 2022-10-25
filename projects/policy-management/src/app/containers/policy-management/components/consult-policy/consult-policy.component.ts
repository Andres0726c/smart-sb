import {
  ResponseDTO,
  ResponseErrorDTO,
} from './../../../../core/interfaces/commun/response';
import { PolicyBrief } from './../../../../core/interfaces/policy';
import { ConsultPolicyService } from './services/consult-policy.service';
import { FilterPolicy } from './interfaces/consult-policy';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsComponent } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/modal-policy-actions.component';
import { ModalRenewalComponent } from 'projects/policy-management/src/app/containers/policy-management/components/consult-policy/modal-renewal/modal-renewal.component';

@Component({
  selector: 'app-consult-policy',
  templateUrl: './consult-policy.component.html',
  styleUrls: ['./consult-policy.component.scss'],
  providers: [MessageService, DialogService],
})
export class ConsultPolicyComponent {
  policies: PolicyBrief[] = [];
  cols: any[] = [];
  filters: FilterPolicy = {
    idCompany: 3,
    pageNumber: 0,
    pageSize: 5,
    notElements: '0',
    sortColumn: 'idProduct',
    sortDirection: 'desc',
    holderdocumentType: '',
    holderdocumentNumber: '',
    holderName: '',
    insuredDocumentType: '',
    insuredDocumentNumber: '',
    insuredName: '',
    policyNumber: '',
    idProduct: '',
    startDate: '',
  };

  items: any[] = [];
  showCancellationDialog = false;
  selectedPolicy: any = null;
  causes: any[] = [];
  cancellationDate!: Date;
  formDate!: FormGroup;
  totalRecords: number = 0;
  first: number = 0;
  es: any;

  loading: boolean = false;

  constructor(
    public consultPolicyService: ConsultPolicyService,
    public fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    this.formDate = fb.group({
      processDate: fb.control(null, Validators.required),
      idCause: fb.control(null),
      causeType: fb.control(null, Validators.required),
      observation: fb.control(null, Validators.maxLength(2000)),
    });

    // this.msgs1 = [
    //   {severity:'success', summary:'Success', detail:'Message Content'},
    // ];

    // this.selectedPolicy = {
    //   inceptionDate: '01/10/2022',
    //   expirationDate: '05/10/2022',
    //   idPolicy: 1,
    // }
    // this.formDate.get('processDate')?.setValue('04/10/2022')
    // this.formDate.get('idCause')?.setValue(1)
    // this.formDate.get('causeType')?.setValue('Anulación')
    // this.formDate.get('observation')?.setValue('anulado por el cliente')
    // this.cancelPolicy();

    this.cols = [
      { header: 'Producto' },
      { header: 'Póliza' },
      { header: 'Tomador' },
      { header: 'Inicio vigencia' },
      { header: 'Fin vigencia' },
      { header: 'Estado' },
      { header: 'Acciones' },
    ];

    this.items = [
      { label: 'Modificar', icon: 'pi pi-fw pi-pencil' },
      {
        label: 'Cancelar',
        icon: 'pi pi-fw pi-ban',
        command: (event: any, row: any) => {
          this.formDate.reset();
          this.formDate.get('causeType')?.disable();
          this.formDate.get('observation')?.disable();
          this.showModal('Cancelación', this.selectedPolicy, 'Cancelar Póliza');
        },
      },
      {
        label: 'Rehabilitar', icon: 'pi pi-fw pi-lock-open',
        command: (event: any, row: any) => {
          this.formDate.reset();
          this.formDate.get('causeType')?.disable();
          this.formDate.get('observation')?.disable();
          this.showModal('Rehabilitación', this.selectedPolicy, 'Rehabilitrar');
        },
      },
      {
        label: 'Renovar', icon: 'pi pi-fw pi-refresh',
        command: (event: any, row: any) => {
          this.showModalRenewal('Renovación', this.selectedPolicy, 'Renovar');
        }
      },
      {
        label: 'Ver detalle', icon: 'pi pi-fw pi-eye',
        command: (event: any, row: any) => {
          this.showModalRenewal('Consulta detalle', this.selectedPolicy, 'Renovar');
        }
      },
    ];
  }

  disabledItem(status: string) {
    switch (status) {
      case 'Activa':
        this.items[0].disabled = false;
        this.items[1].disabled = false;
        this.items[2].disabled = true;
        this.items[3].disabled = false;
        this.items[4].disabled = false;
        break;

      case 'Cancelada':
        this.items[0].disabled = true;
        this.items[1].disabled = true;
        this.items[2].disabled = false;
        this.items[3].disabled = true;
        this.items[4].disabled = false;
        break;
    }
  }

  showModal(process: string, policy: any, buttonAction: any) {
    const ref = this.dialogService.open(ModalPolicyActionsComponent, {
      data: {
        process: process,
        policy: policy,
        buttonAction: buttonAction
      },
      header: process,
      modal: true,
      dismissableMask: true,
      width: '60%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.consultPolicies(this.filters);
      }
    });
  }

  search(filters: FilterPolicy) {
    filters.pageNumber = 0;
    this.totalRecords = 0;
    this.first = 0;
    this.filters = Object.assign(this.filters, filters);
    if (filters.startDate) {
      const date = new Date(filters.startDate);
      date.setHours(-5)
      this.filters.startDate = date.toISOString();
    }
    this.consultPolicies(this.filters);
  }

  nextPage(event: LazyLoadEvent) {
    if (this.policies.length) {
      let page: number = 0;
      if (event.first && event.rows) {
        page = Math.floor(event.first / event.rows);
      }
      this.filters.pageNumber = page;
      this.consultPolicies(this.filters);
    }
  }

  consultPolicies(filters: FilterPolicy) {
    this.loading = true;
    this.consultPolicyService.getPolicies(filters).subscribe({
      next: (res: ResponseDTO<PolicyBrief[]>) => {

        if (res.dataHeader.code && (res.dataHeader.code = 200)) {
          this.policies = res.body;
          this.totalRecords = res.dataHeader.totalRecords;
        } else {
          this.policies = [];
        }
        this.loading = false;
      },
      error: (error: ResponseErrorDTO) => {
        console.error('error', error);
        this.loading = false;
      },
    });
  }

  clearSearch() {
    this.policies = [];
    this.totalRecords = 0;
  }

  showModalRenewal(process: string, policy: any, buttonAction: any) {
    const ref = this.dialogService.open(ModalRenewalComponent, {
      data: {
        process: process,
        policy: policy,
        buttonAction: buttonAction
      },
      header: process,
      modal: true,
      dismissableMask: true,
      width: '80%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((res: boolean) => {
      if (res) {
        this.consultPolicies(this.filters);
      }
    });
  }
}
