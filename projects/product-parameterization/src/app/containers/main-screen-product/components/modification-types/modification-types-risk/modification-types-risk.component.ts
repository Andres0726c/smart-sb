import { Component, OnInit } from '@angular/core';
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
  optionsCommercialP?: OptionsCommercialP[];
}

@Component({
  selector: 'refactoring-smartcore-mf-modification-types-risk',
  templateUrl: './modification-types-risk.component.html',
  styleUrls: ['./modification-types-risk.component.scss'],
})
export class ModificationTypesRiskComponent implements OnInit {
  items = [{ label: 'Mascotas' }, { label: 'Planes comerciales' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;

  tableData: BusinessPlans[] = [];
  optionsCommercialP: OptionsCommercialP[] = [
    { name: 'Reemplazar', key: 'R' },
    { name: 'Modificar', key: 'M' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.tableData =
      this.productService.getProductObject().riskTypes[0].businessPlans;
  }

  changeView() {}

  changeCheck() {
    console.log(this.tableData);
  }
}
