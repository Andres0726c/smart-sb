import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnyMxRecord } from 'dns';
import { ResponseDTO, ResponseErrorDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
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
  
  @Input() modifyData!: FormGroup; //= new FormArray([], [Validators.required]);
  @Input() dataType = '';
  @Input() Data:any;

  Fields: any;

  constructor(
    public productService: ProductService,
    public fb: FormBuilder
  ) {
   
  }

  ngOnInit(): void {
   
    //this.initializeData();
   
    
  }

  get policyData(): FormArray {
    return this.modifyData.get('policyData') as FormArray
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

  get test():FormArray {
    return this.Data as FormArray;
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

 

  // initializeData() {
    
  //   this.productService.getProductById(this.modifyData).subscribe({
  //     next: (res: ResponseDTO<Product>) => {
  //       if (res.dataHeader.code && res.dataHeader.code == 200) {
  //         this.product = res.body;
  //         console.log(this.product);
  //         this.Params();
  //       } else {
  //         this.product = {
  //           id: 0,
  //           nmName: '',
  //           dsDescription: '',
  //           nmHashCode: 0,
  //           nmContent: undefined,
  //         };
  //         console.log('else');
  //       }
  //       error: (error: ResponseErrorDTO) => {
  //         console.error('error', error);
  //       };
  //     },
  //   });
  // }

  // Params(){
  //  this.Fields = this.product.nmContent?.policyData[0];
  //   console.log(this.Fields);
  // }

}
