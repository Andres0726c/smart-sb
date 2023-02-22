import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

interface OptionsCommercialP {
  name: string;
  key: string;
}
interface IdCoverages {
  id: number;
  required: boolean;
}
interface Coverages {
businessRules:any;
claimReservation:any[];
clauses:any[];
complementaryData:any[];
deductibles:[];
description:string;
events:any;
id:number;
name:string;
payRollData:any[];
rates:[];
waitingTime:any; 
optionsCommercialP?: OptionsCommercialP[];
}

@Component({
  selector: 'refactoring-smartcore-mf-commercial-plan-type',
  templateUrl: './commercial-plan-type.component.html',
  styleUrls: ['./commercial-plan-type.component.scss']
})
export class CommercialPlanTypeComponent implements OnInit {
  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: 'Plan básico' }
  ];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;

  tableData: Coverages[] = [];
  optionsCoverages: OptionsCommercialP[] = [
    { name: 'Remover', key: 'R' },
    { name: 'Añadir', key: 'A' },
    { name: 'Modificar', key: 'M' },
  ];
  tableData1:any[]=[];
  idCoverages:IdCoverages[]=[];

  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    
    //this.tableData = this.productService.getProductObject().servicePlans;
    this.idCoverages=this.productService.getProductObject().riskTypes[0].businessPlans[0].coverages;
    for(let coverage of this.idCoverages){
      this.tableData.push(this.productService.getCoverageById(coverage.id))
    }
  console.log( this.tableData)
}

  changeCheck() {
    console.log(this.tableData);
  }
}
