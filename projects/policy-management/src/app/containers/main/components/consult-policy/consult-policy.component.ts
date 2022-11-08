import {
  ResponseDTO,
  ResponseErrorDTO,
} from './../../../../core/interfaces/commun/response';
import { PolicyBrief } from './../../../../core/interfaces/policy';
import { ConsultPolicyService } from './services/consult-policy.service';
import { FilterPolicy } from './interfaces/consult-policy';
import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsComponent } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/modal-policy-actions.component';
import { ModalRenewalComponent } from 'projects/policy-management/src/app/containers/main/components/consult-policy/modal-renewal/modal-renewal.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';

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

  formTest!: FormGroup;

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

    this.formTest = fb.group({
      policyData: fb.array([
        fb.group({
          id: 1,
          name: 'Grupo 1',
          fields: fb.array([
            fb.group({
              label: 'campo 1',
              value: 'prueba'
            }),
            fb.group({
              label: 'campo 2',
              value: 'prueba valor 2'
            })
          ])
        }),
        fb.group({
          id: 2,
          name: 'Grupo 2',
          fields: fb.array([
            fb.group({
              label: 'campo 3',
              value: 'prueba valor 3'
            }),
            fb.group({
              label: 'campo 4',
              value: 'prueba valor 4'
            }),
            fb.group({
              label: 'campo 5',
              value: 'prueba valor 5'
            })
          ])
        }),
        fb.group({
          id: 3,
          name: 'Grupo 3',
          fields: fb.array([
            fb.group({
              label: 'campo 6',
              value: 'prueba valor 6'
            }),
            fb.group({
              label: 'campo 7',
              value: 'prueba valor 7'
            }),
            fb.group({
              label: 'campo 8',
              value: 'prueba valor 8'
            }),
            fb.group({
              label: 'campo 9',
              value: 'prueba valor 9'
            })
          ])
        })
      ])
    });

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
          //this.showModalRenewal('Renovación', this.selectedPolicy, 'Renovar');
        }
      },
      {
        label: 'Ver detalle', icon: 'pi pi-fw pi-eye',
        command: () => {
          this.showModalConsulDetails();
        }
      },
    ];
  }

  get policyDataControls(): FormArray {
    return this.formTest.get('policyData') as FormArray;
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
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

  // showModalRenewal(process: string, policy: any, buttonAction: any) {
  //   let policyRes;
  //   this.consultPolicyService.getPolicyById(policy.idPolicy).subscribe({
  //     next: (res) => {
  //       if (res.dataHeader.code && (res.dataHeader.code = 200)) {
  //         policyRes = res.body;
  //         this.totalRecords = res.dataHeader.totalRecords;

  //         const ref = this.dialogService.open(ModalRenewalComponent, {
  //           data: {
  //             process: process,
  //             policy: policyRes,
  //             buttonAction: buttonAction
  //           },
  //           header: process,
  //           modal: true,
  //           dismissableMask: true,
  //           width: '80%',
  //           contentStyle: { 'max-height': '600px', overflow: 'auto' },
  //           baseZIndex: 10000,
  //         });

  //       } 
  //     },
  //     error: (error: ResponseErrorDTO) => {
  //       console.error('error', error);
  //     },
  //   });
  // }

  showModalConsulDetails(){
    this.dialogService.open(PolicyDetailsComponent,{
      data: {
        idPolicy: this.selectedPolicy.idPolicy
      },
      header: 'Consulta detalle póliza',
      modal: true,
      dismissableMask: true,
      width: '100%',
      styleClass:'w-full sm:w-4/5 md:w-3/5',
      contentStyle: { 'max-height': '600px', 'overflow': 'auto', 'padding-bottom': '0px'},
      baseZIndex: 10000,
    })
  }
}
