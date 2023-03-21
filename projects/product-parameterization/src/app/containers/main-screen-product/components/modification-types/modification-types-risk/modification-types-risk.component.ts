import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
export class ModificationTypesRiskComponent implements OnInit {
  @Output() addBranch  =new EventEmitter<BusinessPlans[]>();
  @Input() riskType:string='';
  @Input() titleRisk:string='';
  @Input() titleCommercialPlan='';
  items = [{ label: 'Mascotas' }, { label: 'Planes comerciales' }];
  home = { icon: 'pi pi-home', routerLink: '/' };
  breadcrumb: any;
  showBranch:BusinessPlans[]=[];
  tableData: any[] = [];
  test:boolean = true;
  athrzdOprtn: OptionsCommercialP[] = [
    { name: 'Reemplazar', key: 'RMP' },
    { name: 'Modificar', key: 'MDF' },
  ];
  selectedCategories: any[] = ['Modificar'];  
  group!: FormGroup;
  constructor(public productService: ProductService, public fb: FormBuilder) {}

  ngOnInit(): void {

    this.tableData.push(...this.getcmmrclPln(2).getRawValue());
    this.selectedCategories = this.athrzdOprtn.slice(1,3);

    console.log("componente Risk: ", this.policyDataControls)
  }

  get policyDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
    }

    getcmmrclPln(id: number) {
      return (<FormArray>(
        this.policyDataControls.controls
          .find((x: { value: { id: number } }) => x.value.id === id)
          ?.get('cmmrclPln')
      )) as FormArray;
    }

  
    getAthrzdOprtn(code: string) {
      return   (<FormArray>(this.getcmmrclPln(2)
        .controls.find((x: { value: { code: string } }) => x.value.code === code)
        ?.get('athrzdOprtn') )) as FormArray;
    }
  

  changeCheck(data:any,event:any) {


     if(event.checked!=''){
      this.addBranch.emit(this.tableData);
     }else{
      this.addBranch.emit([]);
    }
    this.addData(event,data);
    //let control=this.getAthrzdOprtn(data.code);
    

  }

  addData(event:any,data:any){


      if(event.checked.length!=0){
        this.getAthrzdOprtn(data.code).clear();
        for(let eventA of  event.checked){
          this.getAthrzdOprtn(data.code).push(this.fb.control(eventA));
        }
      }
      else{
        this.getAthrzdOprtn(data.code).clear(); 
      }


  }



}
