import { Component, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

@Component({
  selector: 'app-modify-tabs-data',
  templateUrl: './modify-tabs-data.component.html',
  styleUrls: ['./modify-tabs-data.component.scss']
})
export class ModifyTabsDataComponent  {

  @Input() modifyData!: FormGroup; 
  @Input() riskData: any;
  @Input() policyData: any;
  @Input() formData!: FormGroup;
  



  constructor(
    public productService: ProductService,
  ) { 

  }

  
      
}