import { Component, OnInit, Input,EventEmitter,Output,OnChanges,SimpleChanges } from '@angular/core';
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
  constructor(private productService: ProductService) {}

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    // this.items = [{ label: changes['titleRisk'].currentValue }, { label: 'Planes comerciales' }];
  if(changes['riskType'].currentValue){this.changeView(changes['riskType'].currentValue)};
  }
  changeView(riskType:string) {
    let dataRisk:any=localStorage.getItem(riskType);
    dataRisk= JSON.parse(dataRisk);
    this.tableData=dataRisk.businessPlans;
  }

  changeCheck() {

    for(let bussines of this.tableData){
      const result= bussines.athrzdOprtn?.find(({key})=>key==="MDF"), 
      result1=bussines.athrzdOprtn?.find(({key})=>key==="RMP"),
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
