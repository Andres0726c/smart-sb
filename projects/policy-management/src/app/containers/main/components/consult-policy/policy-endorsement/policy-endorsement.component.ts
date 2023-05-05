import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    rowsPerPage: number = 5;
    visibleDialog: boolean = false;
    observationValue: string;
    selectedPolicyEndorsement: any;

    constructor(
        public ref: DynamicDialogRef, 
        public config: DynamicDialogConfig,
        public consultPolicyService: ConsultPolicyService
      ) {
        this.observationValue = "";
      }

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

          this.consultPolicyService.getPolicyEndorsementByPolicyNumber(this.config.data.policyNumber).subscribe({
            next: (res: ResponseDTO<PolicyEndorsement[]>) => {
      
              if (res.dataHeader.code && (res.dataHeader.code === 200)) {
                this.policyEndorsement = res.body;
              } else {
                this.policyEndorsement = [];
              }
              this.loading = false;
              if (this.policyEndorsement.length <= this.rowsPerPage) {
                this.paginator = false
              } else {
                this.paginator = true;
              }
            },
            error: (error: ResponseErrorDTO) => {
              console.error('error', error);
              this.loading = false;
              this.policyEndorsement = [];
              this.paginator = false;
            },
          });
    }

    viewObservations(rowPolicyEndorsement:PolicyEndorsement) {
        this.visibleDialog = true;
        this.observationValue = rowPolicyEndorsement.observation == null ? "" : rowPolicyEndorsement.observation;
    }

    close() {
        this.ref.close(true)
    }

    closeObservation() {
        this.visibleDialog = false;
    }

}