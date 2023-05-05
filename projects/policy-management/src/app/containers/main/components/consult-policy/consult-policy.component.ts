import {
  ResponseDTO,
  ResponseErrorDTO,
} from './../../../../core/interfaces/commun/response';
import { PolicyBrief } from './../../../../core/interfaces/policy';
import { ConsultPolicyService } from './services/consult-policy.service';
import { FilterPolicy } from './interfaces/consult-policy';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ModalPolicyActionsComponent } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/modal-policy-actions.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { Router } from '@angular/router';
import { PolicyRenewalComponent } from '../policy-renewal/policy-renewal.component';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { Menu } from 'primeng/menu';
import { CognitoService } from 'commons-lib';

@Component({
  selector: 'app-consult-policy',
  templateUrl: './consult-policy.component.html',
  styleUrls: ['./consult-policy.component.scss'],
  providers: [MessageService, DialogService],
})
export class ConsultPolicyComponent implements OnDestroy {
  @ViewChild('menu') menu!: Menu;
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

  premiumData: any = {};

  loading: boolean = false;
  loadingMenu: boolean = false;
  moduleAcess:any;

  constructor(
    public consultPolicyService: ConsultPolicyService,
    public productService: ProductService,
    public fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    public router: Router,
     private cognitoService: CognitoService
  ) {
    this.formDate = fb.group({
      processDate: fb.control(null, Validators.required),
      idCause: fb.control(null),
      causeType: fb.control(null, Validators.required),
      observation: fb.control(null, Validators.maxLength(2000)),
    });

    this.cols = [
      { header: 'Producto' },
      { header: 'Póliza' },
      { header: 'Póliza externo' },
      { header: 'Tomador' },
      { header: 'Inicio vigencia' },
      { header: 'Fin vigencia' },
      { header: 'Estado' },
      { header: 'Acciones' },
    ];

    this.items = [
      {
        label: 'Modificar',
        icon: 'pi pi-fw pi-pencil',
        command: (event: any, row: any) => {
          this.getPolicyClaimStatus();
        }
      },
      {
        label: 'Cancelar',
        icon: 'pi pi-fw pi-ban',
        command: (event: any, row: any) => {
          this.formDate.reset();
          this.formDate.get('causeType')?.disable();
          this.formDate.get('observation')?.disable();
          this.showModal(ModalPolicyActionsComponent, 'Cancelación', this.selectedPolicy, 'Cancelar Póliza');
        },
      },
      {
        label: 'Rehabilitar', icon: 'pi pi-fw pi-lock-open',
        command: (event: any, row: any) => {
          this.formDate.reset();
          this.formDate.get('causeType')?.disable();
          this.formDate.get('observation')?.disable();
          this.showModal(ModalPolicyActionsComponent, 'Rehabilitación', this.selectedPolicy, 'Rehabilitar');
        },
      },
      {
        label: 'Renovar', icon: 'pi pi-fw pi-refresh',
        command: (event: any, row: any) => {
          this.getPolicy();
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

  ngOnInit(): void {
    this.cognitoService
      .getUser()
      .then((value) => {
        this.moduleAcess = value.attributes['custom:moduleAccess']?.split(",");
      })
  }

   getModule(nameModule: any) {
     return this.moduleAcess.find((x: any) => x === nameModule) ? true : false;
   }



  visibleItem(){
    if (this.moduleAcess){
    this.items.find((x: any) => x.label === 'Modificar').visible = this.getModule('Modificar')
    this.items.find((x: any) => x.label === 'Cancelar').visible = this.getModule('Cancelar')
    this.items.find((x: any) => x.label === 'Renovar').visible = this.getModule('Renovar')
    this.items.find((x: any) => x.label === 'Rehabilitar').visible = this.getModule('Rehabilitar')
     }
  }

  disabledOption(label:string,status:boolean) {
    this.items.find((x: any) => x.label === label).disabled = status;
  }

  disabledItem(status: string) {
    switch (status) {
      case 'Activa':
       this.disabledOption('Modificar', false)
       this.disabledOption('Cancelar', false)
       this.disabledOption('Rehabilitar', true)
       this.disabledOption('Renovar', true)
       this.disabledOption('Ver detalle', false)
        //this.items[0].disabled = false;
        //this.items[1].disabled = false;
        //this.items[2].disabled = true;
        //this.items[3].disabled = true; //Se deshabilita por PaP
        //this.items[4].disabled = false;
        break;
      case 'Rechazada':
      case 'Provisoria':
        this.disabledOption('Modificar', true)
        this.disabledOption('Cancelar', true)
        this.disabledOption('Rehabilitar', true)
        this.disabledOption('Renovar', true)
        this.disabledOption('Ver detalle', true)
        /*this.items[0].disabled = true;
        this.items[1].disabled = true;
        this.items[2].disabled = true;
        this.items[3].disabled = true; //Se deshabilita por PaP
        this.items[4].disabled = true;*/
        break;
      case 'Cancelada':
        this.disabledOption('Modificar', true)
        this.disabledOption('Cancelar', true)
        this.disabledOption('Rehabilitar', false)
        this.disabledOption('Renovar', true)
        this.disabledOption('Ver detalle', false)
        /*this.items[0].disabled = true;
        this.items[1].disabled = true;
        this.items[2].disabled = false;
        this.items[3].disabled = true;
        this.items[4].disabled = false;*/
        break;
    }
  }

  

  showModal(component: any, process: string, policy: any, buttonAction: any, width?: string, height?: string, mxHeight?: string) {
    const ref = this.dialogService.open(component, {
      data: {
        process: process,
        policy: policy,
        buttonAction: buttonAction
      },
      header: process,
      modal: true,
      dismissableMask: true,
      width: width ?? '60%',
      height: height ?? 'auto',
      contentStyle: { 'max-height': mxHeight ?? '600px', overflow: 'auto' },
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

  showModalConsulDetails() {
    this.dialogService.open(PolicyDetailsComponent, {
      data: {
        idPolicy: this.selectedPolicy.idPolicy,
        policy: this.selectedPolicy
      },
      header: 'Consulta detalle póliza',
      modal: true,
      dismissableMask: true,
      width: '100%',
      styleClass: 'w-full sm:w-4/5 md:w-3/5',
      contentStyle: { 'max-height': '600px', 'overflow': 'auto', 'padding-bottom': '0px' },
      baseZIndex: 10000,
    })
  }

  getPolicy() {
    this.loading = true;
    this.productService.findPolicyDataById(this.selectedPolicy.policyNumber, 0).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        const policy = res.body;
        if (new Date(policy.plcy.plcyDtGrp.datos_basicos['FEC_FIN_VIG_POL']) > new Date(this.selectedPolicy.expirationDate)) {
          this.showSuccess('error', 'Proceso pendiente', 'La póliza tiene un endoso pendiente');
        } else {
          this.showModal(PolicyRenewalComponent, 'Renovación', { policyBasic: this.selectedPolicy, policyData: policy }, 'Renovar', '96%', '100%', '100%');
        }
      } else {
        this.showSuccess('error', 'Error interno', 'Por favor intente nuevamente');
      }
      this.loading = false;
    });
  }

  getPolicyClaimStatus() {
    this.loading = true;
    this.productService.modificationPolicyClaimStatus(this.selectedPolicy.policyNumber).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.router.navigate(
          [`/polizas/modificar/${this.selectedPolicy?.idProduct}`],
          { state: { policy: this.selectedPolicy } }
        );
      } else {
        this.showSuccess('error', 'Error al modificar', res.dataHeader.status);
      }
      this.loading = false;
    });
  }

  showSuccess(status: string, title: string, msg: string) {
    this.messageService.add({
      severity: status,
      summary: title,
      detail: msg
    });
  }

  ngOnDestroy(): void {
    // Cerramos todas las modales al cambiar de componente
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
