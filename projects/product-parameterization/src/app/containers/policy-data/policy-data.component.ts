import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-policy-data',
  templateUrl: './policy-data.component.html',
  styleUrls: ['./policy-data.component.scss']
})
export class PolicyDataComponent implements OnInit {
  
  constructor(
    public service: ProductService
  ) { 
    //
  }

  ngOnInit(): void {
    //
  }

}
