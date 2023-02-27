import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-preview-policy-data',
  templateUrl: './preview-policy-data.component.html',
  styleUrls: ['./preview-policy-data.component.scss']
})
export class PreviewPolicyDataComponent implements OnInit {
  
  constructor(
    public service: ProductService
  ) { 
    //
  }

  ngOnInit(): void {
    //
  }

}
