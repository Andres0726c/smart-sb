import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

@Component({
  selector: 'app-modify-data',
  templateUrl: './modify-data.component.html',
  styleUrls: ['./modify-data.component.scss']
})
export class ModifyDataComponent implements OnInit {
  product: Product = {
    id: 0,
    nmName: '',
    dsDescription: '',
    nmHashCode: 0,
    nmContent: undefined,
  };
  
  @Input() modifyData!: FormGroup;
  @Input() dataType = '';
  @Input() Data:any;

  Fields: any;

  constructor(
    public productService: ProductService,
    public fb: FormBuilder
  ) {
   
  }

  ngOnInit(): void {
    //empty
  }



  get dataTypeControls(): FormArray {
    if (this.dataType === 'policyData'){
      
    return this.modifyData.get(this.dataType) as FormArray;
    }
    else if (this.dataType === 'riskData'){
    
      return (<FormArray>this.modifyData.get(this.dataType))?.controls[0].get('complementaryData') as FormArray
    }
    else{
      let p:any = new FormArray([])
      return p as FormArray
    }
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

}
