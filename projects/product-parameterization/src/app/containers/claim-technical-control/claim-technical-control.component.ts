import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-claim-technical-control',
  templateUrl: './claim-technical-control.component.html',
  styleUrls: ['./claim-technical-control.component.scss']
})
export class ClaimTechnicalControlComponent implements OnInit {
  applicationLevel: string = 'Reclamación';

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    //
  }

}
