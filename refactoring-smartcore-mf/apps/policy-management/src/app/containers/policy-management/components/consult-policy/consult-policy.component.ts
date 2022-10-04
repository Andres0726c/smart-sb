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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consult-policy',
  templateUrl: './consult-policy.component.html',
  styleUrls: ['./consult-policy.component.scss'],
  providers: [MessageService],
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
  es: any;

  constructor(
    public consultPolicyService: ConsultPolicyService,
    public fb: FormBuilder,
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
      { label: 'Modificar', icon: 'pi pi-fw pi-pencil', disabled: true },
      {
        label: 'Anular/Cancelar',
        icon: 'pi pi-fw pi-ban',
        disabled: false,
        command: (event: any, row: any) => {
          this.formDate.reset();
          this.formDate.get('causeType')?.disable();
          this.formDate.get('observation')?.disable();
          this.showCancellationDialog = true;
          console.log('policy', this.selectedPolicy);
        },
      },
      { label: 'Rehabilitar', icon: 'pi pi-fw pi-lock-open', disabled: true },
      { label: 'Renovar', icon: 'pi pi-fw pi-refresh', disabled: true },
      { label: 'Ver detalle', icon: 'pi pi-fw pi-eye', disabled: true },
    ];

    this.causes = [
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

    this.es = {
      firstDayOfWeek: 1,

      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],

      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],

      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],

      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],

      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],

      today: 'Hoy',

      clear: 'Borrar',
    };
  }

  doSome() {
    console.log('policy', this.selectedPolicy);
  }

  search(filters: FilterPolicy) {
    filters.pageNumber = 0;
    this.filters = Object.assign(this.filters, filters);
    if (this.filters.startDate) {
      let date = new Date(this.filters.startDate);
      this.filters.startDate = date.toISOString();
    }
    this.consultPolicies(this.filters);
  }

  nextPage(event: LazyLoadEvent) {
    let page: number = 0;
    if (event.first && event.rows) {
      page = Math.floor(event.first / event.rows);
    }
    this.filters.pageNumber = page;
    this.consultPolicies(this.filters);
  }

  consultPolicies(filters: FilterPolicy) {
    this.consultPolicyService.getPolicies(filters).subscribe({
      next: (res: ResponseDTO<PolicyBrief[]>) => {
        if (res.dataHeader.code && (res.dataHeader.code = 200)) {
          this.policies = res.body;
          this.totalRecords = res.dataHeader.totalRecords;
        } else {
          console.log('FALLO EN LA BUSQUEDA');
        }
      },
      error: (error: ResponseErrorDTO) => console.error('error', error),
    });
  }

  verifyDate() {
    const date = new Date(
      this.formDate.get('processDate')?.value
    ).toISOString();
    const inceptionDate = new Date(
      this.selectedPolicy?.inceptionDate
    ).toISOString();
    const expirationDate = new Date(
      this.selectedPolicy?.expirationDate
    ).toISOString();
    console.log('fecha actual', date);
    console.log('inceptionDate', inceptionDate);
    console.log('expirationDate', expirationDate);

    if (
      this.formDate.get('processDate')?.value &&
      date >= inceptionDate &&
      date <= expirationDate
    ) {
      this.formDate.get('causeType')?.enable();
      this.formDate.get('observation')?.enable();
    } else {
      this.formDate.get('causeType')?.disable();
      this.formDate.get('observation')?.disable();
    }
  }

  disableButton() {
    if (this.selectedPolicy) {
      const date = new Date(
        this.formDate.get('processDate')?.value
      ).toISOString();
      const inceptionDate = new Date(
        this.selectedPolicy?.inceptionDate
      ).toISOString();
      const expirationDate = new Date(
        this.selectedPolicy?.expirationDate
      ).toISOString();
      return !(
        this.formDate.valid &&
        this.formDate.get('processDate')?.value &&
        date >= inceptionDate &&
        date <= expirationDate
      );
    } else {
      return true;
    }
  }

  cancelPolicy() {
    console.log('selected Policy', this.selectedPolicy);
    console.log('formDate', this.formDate);

    if (this.formDate.valid) {
      this.consultPolicyService
        .cancelDate(this.selectedPolicy, this.formDate.value)
        .subscribe((resp) => {
          console.log('respuesta', resp);
        });
      this.showCancellationDialog = false;
      return this.showSuccess();
    } else {
      return false;
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
