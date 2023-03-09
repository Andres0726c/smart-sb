import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
  ];
  idCoverages: IdCoverages[] = [];
  idServicePlans: IdCoverages[] = [];

  constructor(public productService: ProductService, public fb: FormBuilder,) {}

  ngOnInit(): void {
    //ngOnInit()
    this.addDataTable();
  }

  // getAllFields() {
  //   let res: any[] = [];

  //   for (const group of this.productService.policyData?.getRawValue()) {
  //     res = res.concat(group.fields);
  //   }
  //   return res;
  // }

  // getAll() {
  //   let res: any[] = [];
  //   for (const group of this.complementaryDataControls?.getRawValue()) {
  //     res = res.concat(group.fields);
  //   }

  //   return res;

  // }

  // getAllRisk() {


  //   let res: any[] = [];

  //   for (const group of this.getRiskArraydById(2).getRawValue()) {
  //     res = res.concat(group.fields);
  //   }

  //   return res;



  // }

  // get complementaryDataControls(): FormArray {
  //   return (<FormArray>(
  //     this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
  //   )) as FormArray;
  // }

  // // get policyDataControls(): FormArray {
  // //   return (<FormArray>(
  // //     this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
  // //   )) as FormArray;
  // // }

  // getRiskArrayByIdModify(id: number) {
  //   return (<FormArray>this.policyDataControls.controls.find(x => x.value.id === 2)?.get('rskTypDtGrp'));
  // }

  // getRiskArraydById(id: number) {
  //   return (<FormArray>this.productService.riskTypes.controls.find((x: { value: { id: number; }; }) => x.value.id === 2)?.get('complementaryData'));
  // }

  // getGroupArrayByIdModify(id: number) {
  //   return <FormArray>(
  //     this.getRiskArrayByIdModify(2).controls
  //       .find((x: { value: { id: number } }) => x.value.id === id)
  //       ?.get('fields')
  //   );
  //   //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  // }


  ngOnChanges(changes: SimpleChanges) {
    // this.addDataTable(changes['data'].currentValue);
  }
  addDataTable( ) {
    let dataRisk:any =[];
    
    // disableAux:any=this.productService.getProductObject().riskTypes[0].businessPlans;

    // dataRisk=this.policyDataControls.value[0].cmmrclPln;
    dataRisk=[{}];
    // console.log(disableAux);
    console.log(dataRisk);
    for (let data of dataRisk) {
      console.log(data.code == this.data);
      if (data.code == this.data) {
        dataRisk = data;
        // disableAux.forEach((element:any) =>{
        //   if(element.code===dataRisk.code){
        //     let coverage=element.coverages;
        //     coverage.forEach((element1:any) =>{
        //       let obj: any = { code: data.code, coverages:           required:element1.required};
        //       dataRisk.push(obj)
        //     });
        //   }
        // });
      }
    }
    // console.log(dataRisk);

      // console.log(x);
  
// console.log(this.policyDataControls.value[0].cmmrclPln)
    // if(disableAux.name==)

    this.tableData.push(dataRisk.coverages);
    this.tableDataService.push(dataRisk.servicePlans);
  }


  changeCheck(data: any) {
    console.log(data);
  }
  changeCheckServices() {
    console.log(this.tableDataService);
  }
  activeButton(data: any) {
    let btn: boolean;
    const result = data.athrzdOprtn?.find((key:any ) => key.key === 'MDF');
    result ? (btn = false) : (btn = true);
    return btn;
  }
  editData(data: any) {
    console.log(data);
  }
}
