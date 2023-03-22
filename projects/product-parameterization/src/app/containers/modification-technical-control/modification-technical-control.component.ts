import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-modification-technical-control',
  templateUrl: './modification-technical-control.component.html',
  styleUrls: ['./modification-technical-control.component.scss']
})
export class ModificationTechnicalControlComponent {

  applicationLevel: string = 'Póliza';

  constructor(
    public productService: ProductService
  ) {}

}
