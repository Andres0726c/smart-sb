import { Component, OnInit, Input,EventEmitter,Output,OnChanges,SimpleChanges } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  athrzdOprtn?: [];
}

@Component({
  selector: 'refactoring-smartcore-mf-modification-types-risk',
  templateUrl: './modification-types-risk.component.html',
  styleUrls: ['./modification-types-risk.component.scss'],
})
export class ModificationTypesRiskComponent implements OnInit,OnChanges {
  @Output() addBranch  =new EventEmitter<BusinessPlans[]>();
  @Input() riskType:string='';
  @Input() titleRisk:string='';
  @Input() titleCommercialPlan='';
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
  constructor(public productService: ProductService, public fb: FormBuilder) {}

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
    return (<FormArray>this.policyDataControls.controls.find(x => x.value.id === 2)?.get('rskTypDtGrp'));
  }

  getRiskArraydById(id: number) {
    return (<FormArray>this.productService.riskTypes.controls.find((x: { value: { id: number; }; }) => x.value.id === 2)?.get('complementaryData'));
  }

  getGroupArrayByIdModify(id: number) {
    return <FormArray>(
      this.getRiskArrayByIdModify(2).controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('fields')
    );
  }


  ngOnInit(): void {
    this.tableData=this.policyDataControls.value[0].cmmrclPln;
  }
  ngOnChanges(changes: SimpleChanges){
  }


  changeCheck() {

    for(let bussines of this.tableData){
      const result= bussines.athrzdOprtn?.find((key:any)=>key==="MDF"), 
      result1=bussines.athrzdOprtn?.find((key:any)=>key==="RMP"),
      exist= this.showBranch.find(({name})=>name===bussines.name);
      if(result!=undefined && exist==undefined){
        this.showBranch.push(bussines);    
      }
      if((result==undefined && exist!=undefined)){
        const i= this.showBranch.findIndex(({name})=>name===bussines.name);
        this.showBranch.splice(i,1);
      }
      if(result1!=undefined){
        this.addBranch.emit(this.tableData);
      }
    } 
      if(this.showBranch){
        this.addBranch.emit(this.showBranch);
      }else{
        this.addBranch.emit([]);
      }
  }
}
