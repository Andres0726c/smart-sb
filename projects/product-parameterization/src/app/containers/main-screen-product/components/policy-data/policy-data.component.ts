import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss']
})
export class PolicyDataComponent implements OnInit {

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
  }

}
