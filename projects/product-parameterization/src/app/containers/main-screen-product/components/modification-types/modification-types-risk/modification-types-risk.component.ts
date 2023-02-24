import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

interface OptionsCommercialP {
  name: string;
  key: string;
}
interface Coverages {
  id: number;
  required: boolean;
}
interface BusinessPlans {
  code: string;
  coverages: Coverages[];
  description: string;
  name: string;
  servicePlans: Coverages[];
  athrzdOprtn?: OptionsCommercialP[];
}

@Component({
  selector: 'refactoring-smartcore-mf-modification-types-risk',
  templateUrl: './modification-types-risk.component.html',
  styleUrls: ['./modification-types-risk.component.scss'],
})
export class ModificationTypesRiskComponent implements OnInit {
  @Output() addBranch  =new EventEmitter<BusinessPlans[]>();
  @Input() indexServicePlan:number=0; 
  @Input() indexRiskType:number=0;
  items = [{ label: 'Mascotas' }, { label: 'Planes comerciales' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;
  showBranch:BusinessPlans[]=[];
  tableData: BusinessPlans[] = [];
  athrzdOprtn: OptionsCommercialP[] = [
    { name: 'Reemplazar', key: 'RMP' },
    { name: 'Modificar', key: 'MDF' },
  ];
  // "athrzdOprtn": ["RMP","MDF"]
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.indexRiskType);
    this.tableData =
      this.productService.getProductObject().riskTypes[0].businessPlans;
  }

  changeView() {}

  changeCheck() {

    this.addBranch.emit(this.tableData);
  }

  
}
