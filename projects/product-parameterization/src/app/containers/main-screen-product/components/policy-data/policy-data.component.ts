import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss']
})
/**
 * Component that handles the chield component data-fields-management
 */
export class PolicyDataComponent{

  /**
   * contructor empty
   * @param productService 
   */
  constructor(
    public productService: ProductService
  ) { }

}
