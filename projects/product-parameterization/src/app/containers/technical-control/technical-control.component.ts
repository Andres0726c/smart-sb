import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-technical-control',
  templateUrl: './technical-control.component.html',
  styleUrls: ['./technical-control.component.scss']
})
/**
  ** Render the association view of technical controls
*/
export class TechnicalControlComponent implements OnInit {

  applicationLevel: string = 'Póliza';

  constructor(
    public productService: ProductService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //
  }

}
