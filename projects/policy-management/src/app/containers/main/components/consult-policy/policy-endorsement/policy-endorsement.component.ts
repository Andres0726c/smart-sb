import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PolicyEndorsement } from "./../../../../../core/interfaces/policy";
import { ConsultPolicyService } from "../services/consult-policy.service";
import { ResponseDTO, ResponseErrorDTO } from "./../../../../../core/interfaces/commun/response";

@Component({
    selector: 'app-policy-endorsement',
    templateUrl: './policy-endorsement.component.html',
    styleUrls: ['./policy-endorsement.component.scss']
  })
  export class PolicyEndorsementComponent implements OnInit {
    cols: any[] = [];
    policyEndorsement: PolicyEndorsement[] = [];
    loading: boolean = true;
    paginator: boolean = true;
    rowsPerPage = 5;

    constructor(
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig, 
        public dialogService: DialogService,
        public consultPolicyService: ConsultPolicyService
      ) { }

    ngOnInit(): void {
        this.cols = [
            { header: 'Período' },
            { header: 'Endoso' },
            { header: 'Movimiento' },
            { header: 'Emitido' },
            { header: 'Vigencia' },
            { header: 'Estado' },
            { header: 'Acciones' },
          ];
          this.policyEndorsement = [
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "0",
                applicationprocess: "Emisión",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Activo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            },
            {
                turnOverPeriod:"Mensual",
                endorsementNumber: "1",
                applicationprocess: "Cancelación",
                issueDate: "2022-10-20 09:58:42.771",
                inceptionDate:"2022-10-20 09:58:42.771",
                expirationDate:"2022-12-31 12:53:00.000",
                status: "Inactivo",
                observation: ""
            }
          ];
          //this.policyEndorsement = [];
          if (this.policyEndorsement.length <= this.rowsPerPage) {
            this.paginator = false
          }
          this.loading = false;
          /*this.consultPolicyService.getPolicyEndorsementByPolicyNumber(this.config.data.policyNumber).subscribe({
            next: (res: ResponseDTO<PolicyEndorsement[]>) => {
      
              if (res.dataHeader.code && (res.dataHeader.code = 200)) {
                this.policyEndorsement = res.body;
              } else {
                this.policyEndorsement = [];
              }
              this.loading = false;
              if (this.policyEndorsement.length <= this.rowsPerPage) {
                this.paginator = false
              }
            },
            error: (error: ResponseErrorDTO) => {
              console.error('error', error);
              this.loading = false;
              if (this.policyEndorsement.length <= this.rowsPerPage) {
                this.paginator = false
              }
            },
          });*/
    }

    viewObservations() {
        
    }

    close() {
        this.ref.close(true)
    }

}