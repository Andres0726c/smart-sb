import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-hidden-view',
  templateUrl: './hidden-view.component.html',
  styleUrls: ['./hidden-view.component.scss']
})
export class HiddenViewComponent implements OnInit {
  applicationLevel: string = 'Reclamación';

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    //
  }

}
