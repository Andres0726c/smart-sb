import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Menu } from 'primeng/menu';
import { ResponseDTO, ResponseErrorDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { PolicyBrief } from 'projects/policy-management/src/app/core/interfaces/policy';
import { FilterPolicyFailed } from './interfaces/consult-policy-failed';
import { PolicyFailedDetailsComponent } from './policy-failed-details/policy-failed-details.component';
import { SyncPolicyFailedService } from './services/sync-policy-failed.service';

@Component({
  selector: 'refactoring-smartcore-mf-sync-policy-failed',
  templateUrl: './sync-policy-failed.component.html',
  styleUrls: ['./sync-policy-failed.component.scss'],
  providers: [MessageService, DialogService],
})
export class SyncPolicyFailedComponent implements OnInit {

  @ViewChild('menu') menu!: Menu; 
  cols: any[] = [];
  items: any[] = [];
  selectedPolicy: any = null;
  formDate!: FormGroup;
  totalRecords: number = 0;
  es: any;
  policies: PolicyBrief[] = [];
  loading: boolean = false;
  loadingMenu: boolean = false;

  filters: FilterPolicyFailed = {
    smartCorePolicyNumber: null,
    tronPolicyNumber: null,
    process: null,
    date: null,
    subprocess: null,
  };

  constructor(
    public syncPolicyFailedService: SyncPolicyFailedService,
    public fb: FormBuilder,
    public dialogService: DialogService,
    public messageService: MessageService,
    public router: Router
  ) { 

    this.formDate = fb.group({
      processDate: fb.control(null, Validators.required),
      idCause: fb.control(null),
      causeType: fb.control(null, Validators.required),
      observation: fb.control(null, Validators.maxLength(2000)),
    });
    
    this.cols = [
      { header: 'Proceso' },
      { header: 'Producto' },
      { header: 'Póliza' },
      { header: 'Nro. de póliza externo' },
      { header: 'Tomador' },
      { header: 'Asegurado' },
      { header: 'Fecha de envío' },
      { header: 'Estado' },
      { header: 'Acciones' },
    ];

    this.items = [
      { 
        label: 'Reenviar', 
        icon: 'pi pi-fw pi-sync',
        command: () => {
          this.sendDataPoliciesFailed(this.selectedPolicy);
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

  sendDataPoliciesFailed(dataPolicies: any){
    this.loading = true;
    this.syncPolicyFailedService.postSendDataPoliciesFailed(dataPolicies).subscribe({
      error: (error: ResponseErrorDTO) => {
        console.error('error', error);
        this.loading = false;
      },
    });
    this.loading = false;
    this.policies = [];
  }

  consultPolicies(filters: FilterPolicyFailed) {
    this.loading = true;
    this.syncPolicyFailedService.postPoliciesFailed(filters).subscribe({
      next: (res: ResponseDTO<PolicyBrief[]>) => {

        if (res.dataHeader.code && (res.dataHeader.code = 200)) {
          this.policies = res.body;
          this.totalRecords = res.body.length;
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

  search(filters: FilterPolicyFailed) {
    this.filters = Object.assign(this.filters, filters);
    this.consultPolicies(this.filters);
  }

  clearSearch() {
    this.policies = [];
  }

  showModalConsulDetails(){
    this.dialogService.open(PolicyFailedDetailsComponent,{
      data: {
        policy: this.selectedPolicy
      },
      header: 'Consulta detalle póliza fallida',
      modal: true,
      dismissableMask: true,
      width: '100%',
      styleClass:'w-full sm:w-4/5 md:w-3/5',
      contentStyle: { 'max-height': '600px', 'overflow': 'auto', 'padding-bottom': '0px'},
      baseZIndex: 10000,
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Cerramos todas las modales al cambiar de componente
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

  homologateProcess(process: any) {
    var map: { [key: number]: string; } = {
      261 : "Emisión",
      281 : "Modificación",
      351 : "Cancelación",
      441 : "Renovación",
      401 : "Rehabilitación"
    };

    return map[process];
  }
}
