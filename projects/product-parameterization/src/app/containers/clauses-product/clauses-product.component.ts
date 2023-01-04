import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-clauses-product',
  templateUrl: './clauses-product.component.html',
  styleUrls: ['./clauses-product.component.scss']
})
export class ClausesProductComponent implements OnInit {

  constructor(
    public service: ProductService
  ) { }

  ngOnInit(): void {
    console.log("")
  }

}
