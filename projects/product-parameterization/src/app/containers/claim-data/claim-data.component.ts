import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-claim-data',
  templateUrl: './claim-data.component.html',
  styleUrls: ['./claim-data.component.scss']
})
export class ClaimDataComponent implements OnInit {
  
  constructor(
    public service: ProductService
  ) { }

  ngOnInit(): void {
    //
  }

}
