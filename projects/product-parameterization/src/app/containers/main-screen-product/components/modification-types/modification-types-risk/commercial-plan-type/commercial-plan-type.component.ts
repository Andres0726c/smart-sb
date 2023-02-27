import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  required: boolean;
  athrzdOprtnCoverages?: OptionsCoverages[];
}

@Component({
  selector: 'refactoring-smartcore-mf-commercial-plan-type',
  templateUrl: './commercial-plan-type.component.html',
  styleUrls: ['./commercial-plan-type.component.scss'],
})
export class CommercialPlanTypeComponent implements OnInit, OnChanges {
  @Input() titleBussinesPlan: string = '';
  @Input() data: string = '';
  @Input() bussinesPlans: boolean = false;
  @Input() riskDataCode: string = '';
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
  dataAux: any;
  disabled: boolean = true;
  product: any;
  risk: any;
  athrzdOprtnCoverages: OptionsCoverages[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
    { name: 'Modificar', key: 'MDF' },
  ];
  athrzdOprtnService: OptionsCoverages[] = [
    { name: 'Remover', key: 'RMP' },
    { name: 'Añadir', key: 'ADD' },
  ];
  idCoverages: IdCoverages[] = [];
  idServicePlans: IdCoverages[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.addDataTable(changes['data'].currentValue);
  }
  addDataTable( riskCode: string) {
    let dataRisk:any = localStorage.getItem(riskCode);
    dataRisk = JSON.parse(dataRisk);
    for (let data of dataRisk) {
      console.log(data.code == this.data);
      if (data.code == this.data) {
        dataRisk = data;
      }
    }
    this.fillTableData(dataRisk);
  }


  fillTableData(data: any) {
    this.tableData = [];
    this.tableDataService = [];
    let idCoverages = data.coverages,
      idServicePlans = data.servicePlans;
    for (let coverage of idCoverages) {
      coverage = this.productService.getCoverageById(coverage.id);
      coverage.required = idCoverages.find(
        (data: any) => data.id === coverage.id
      );
      this.tableData.push(this.productService.getCoverageById(coverage.id));
    }

    for (let servicePlans of idServicePlans) {
      this.tableDataService.push(
        this.productService.getServicePlanById(servicePlans.id)
      );
    }
    console.log(this.tableData);
  }
  onDisabled() {}
  changeCheck(data: any) {
    console.log(data);
  }
  changeCheckServices() {
    console.log(this.tableDataService);
  }
  activeButton(data: Coverages) {
    let btn: boolean;
    const result = data.athrzdOprtnCoverages?.find(({ key }) => key === 'MDF');
    result ? (btn = false) : (btn = true);
    return btn;
  }
  editData(data: Coverages) {
    console.log(data);
  }
}
