import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

interface OptionsCoverages {
  name: string;
  key: string;
}
interface IdCoverages {
  id: number;
  required: boolean;
}
interface Coverages {
  businessRules: any;
  claimReservation: any[];
  clauses: any[];
  complementaryData: any[];
  deductibles: [];
  description: string;
  events: any;
  id: number;
  name: string;
  payRollData: any[];
  rates: [];
  waitingTime: any;
  athrzdOprtnCoverages?: OptionsCoverages[];
}

@Component({
  selector: 'refactoring-smartcore-mf-commercial-plan-type',
  templateUrl: './commercial-plan-type.component.html',
  styleUrls: ['./commercial-plan-type.component.scss'],
})
export class CommercialPlanTypeComponent implements OnInit {
  @Input() titleBussinesPlan: string = '';
  @Input() coverages: boolean = false;
  @Input() bussinesPlans: boolean = false;

  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: this.titleBussinesPlan },
  ];
  tableDataService: any[] = [];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;
  showBranch: Coverages[] = [];
  tableData: Coverages[] = [];
  disabled: boolean = true;
  athrzdOprtnCoverages: OptionsCoverages[] = [
    { name: 'Remover', key: 'RMP' },
    { name: 'Añadir', key: 'A' },
    { name: 'Modificar', key: 'MDF' },
  ];
  athrzdOprtnService: OptionsCoverages[] = [
    { name: 'Remover', key: 'RMP' },
    { name: 'Añadir', key: 'A' },
  ];
  idCoverages: IdCoverages[] = [];
  idServicePlans: IdCoverages[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    //this.tableData = this.productService.getProductObject().servicePlans;
    this.idCoverages =
      this.productService.getProductObject().riskTypes[0].businessPlans[0].coverages;
    for (let coverage of this.idCoverages) {
      this.tableData.push(this.productService.getCoverageById(coverage.id));
    }
    this.idServicePlans =
      this.productService.getProductObject().riskTypes[0].businessPlans[0].servicePlans;
    for (let servicePlans of this.idServicePlans) {
      this.tableDataService.push(
        this.productService.getServicePlanById(servicePlans.id)
      );
    }
    console.log(this.tableData);
  }

  changeCheck(i: number) {
    console.log('i: ', i);
    for (let bussines of this.tableData) {
      const result = bussines.athrzdOprtnCoverages?.find(({ name }) => name === 'Modificar'), exist = this.showBranch.find(({ name }) => name === bussines.name);
      if (result && !exist) {
        this.showBranch.push(bussines);
      }
      if (!result && exist) {
        const i = this.showBranch.findIndex(
          ({ name }) => name === bussines.name
        );
        this.showBranch.splice(i, 1);
      }
    }
    console.log(this.tableData);
  }
  changeCheckServices() {
    console.log(this.tableDataService);
  }
  activeButton(data: Coverages) {
    let btn:boolean;
    const result = data.athrzdOprtnCoverages?.find(({ key }) => key === 'MDF');
    result ? (btn = false) : (btn = true);
    return btn;
  }
  editData(data: Coverages){
    console.log(data)
  }
}
