import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface options {
  id: number;
  value: [];
}

interface Coverages {
  description: string;
  id: number;
  name: string;
  cvrgDtGrp: any;
  athrzdOprtn: any;
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
  dataCoverage :any;
  Coverageflag:boolean=false;

  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: this.titleBussinesPlan },
  ];
  tableDataService: any[] = [];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;
  showBranch: any[] = [];
  tableData: Coverages[] = [];
  dataAux: any;
  disabled: boolean = true;
  product: any;
  risk: any;
  optionCoverage: any = [];
  athrzdOprtnCoverages: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
    { name: 'Modificar', key: 'MDF' },
  ];
  athrzdOprtnService: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
  ];

  dataAthrzdOprtn: any = [];

  constructor(public productService: ProductService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.addDataTable();
    console.log(this.getcoverages(8));
    console.log(this.getcoveragesPln(this.data))
    console.log(this.getcoveragesPln(this.data)
    .controls.find((x: { value: { id: number } }) => x.value.id === 8))
    // this.dataAthrzdOprtn = this.tableData.map(d => ({id : d.id, athrzdOprtn: d.athrzdOprtn.value}))
    this.tableData = this.tableData.map((d) => {
      // delete athrzdOprtnCopy;
      return {
        ...d,
        athrzdOprtnCopy: d.athrzdOprtn.value,
      };
    });

    this.tableDataService = this.tableDataService.map((d) => {
      // delete athrzdOprtnCopy;
      return {
        ...d,
        athrzdOprtnCopy: d.athrzdOprtn.value,
      };
    });

  }

  getAllFields() {
    let res: any[] = [];

    for (const group of this.productService.policyData?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAll() {
    let res: any[] = [];
    for (const group of this.complementaryDataControls?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAllRisk() {
    let res: any[] = [];

    for (const group of this.getRiskArraydById(2).getRawValue()) {
      res = res.concat(group.fields);
    }

    return res;
  }

  
  getcmmrclPln(id: number) {
    return (<FormArray>(
      this.policyDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('cmmrclPln')
    )) as FormArray;
  }
  getcoveragesPln(id: string) {
    return <FormArray>this.getcmmrclPln(2)
      .controls.find((x: { value: { code: string } }) => x.value.code === id)
      ?.get('coverages');
    //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }
  getcoverages(id: number) {
  
    return <FormArray>this.getcoveragesPln(this.data)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('cvrgDtGrp');
      // ({key})=>key==="RMP"
    //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }

  get complementaryDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )) as FormArray;
  }

  get policyDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }

  getRiskArrayByIdModify(id: number) {
    return <FormArray>(
      this.policyDataControls.controls
        .find((x) => x.value.id === 2)
        ?.get('rskTypDtGrp')
    );
  }

  getRiskArraydById(id: number) {
    return <FormArray>(
      this.productService.riskTypes.controls
        .find((x: { value: { id: number } }) => x.value.id === 2)
        ?.get('complementaryData')
    );
  }

  getGroupArrayByIdModify(id: number) {
    return <FormArray>this.getRiskArrayByIdModify(2)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('fields');
    //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.addDataTable(changes['data'].currentValue);
  }
  addDataTable() {
    let dataRisk: any = [];
    dataRisk = this.policyDataControls.value[0].cmmrclPln;

    // dataRisk=[{}];
    // console.log(disableAux);
    console.log(dataRisk);
    for (let data of dataRisk) {
      console.log(data);
      if (data.code == this.data) {
        dataRisk = data;
        console.log(data.name);
        this.titleBussinesPlan=data.name;
      }
    }
    console.log(dataRisk);

    // console.log(x);

    // console.log(this.policyDataControls.value[0].cmmrclPln)
    // if(disableAux.name==)

    console.log(dataRisk.coverages);
    this.tableData.push(...dataRisk.coverages);
    console.log(this.tableData);

    this.tableDataService.push(...dataRisk.servicePlans);
  }
  getDataCoverages(id: number, position: any) {
    return (<FormArray>this.productService.coverages).controls
      .find((x) => x.value.id === id)
      ?.get(position);
  }
  getServicesPlan(id: number, position: any) {
    return (<FormArray>this.productService.servicePlans).controls
      .find((x) => x.value.id === id)
      ?.get(position);
  }

  changeCheck(id: any, event: any) {
    const data = this.tableData.find((d) => d.id == id);
    if (data) {
      data.athrzdOprtn.value = event.checked;
    }
    console.log(data);
    console.log(this.tableData);
  }

  changeCheckServices(id: any, event: any) {
    const data = this.tableDataService.find((d) => d.id == id);
    if (data) {
      data.athrzdOprtn.value = event.checked;
    }
    console.log(data);
    console.log(this.tableData);
  }

  activeButton(data: any) {
    let btn: boolean, result = data.athrzdOprtn.value;
    result = result.find((d:any ) => d === 'MDF');
    result? (btn = false) : (btn = true);
    return btn;
  }

  openToAdd(level: any){

    
  }

  editData(data: any) {

    if(data){
      this.Coverageflag=true;
    }else{ this.Coverageflag=false;}
    
    console.log(this.getcoveragesPln(this.data));
    console.log(this.getcoverages(data.id));
    console.log(data)
    console.log(this.policyDataControls);

  }
}
