import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PolicyEndorsement } from "projects/policy-management/src/app/core/interfaces/policy";
import { ConsultPolicyService } from "../services/consult-policy.service";

@Component({
    selector: 'app-policy-endorsement',
    templateUrl: './policy-endorsement.component.html',
    styleUrls: ['./policy-endorsement.component.scss']
  })
  export class PolicyEndorsementComponent implements OnInit {
    cols: any[] = [];
    policyEndorsement: PolicyEndorsement[] = [];
    loading: boolean = true;
    totalRecords: number = 0;
    first: number = 0;

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
          //this.consultPolicyService.getPolicyEndorsement()
    }

    viewObservations() {
        
    }

    close() {
        this.ref.close(true)
    }

}