import { Component } from '@angular/core';
import { CognitoService } from 'commons-lib';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(
    public cognitoService: CognitoService,
    public productService: ProductService
  ) {
    this.cognitoService.getUser()
      .then((value) => {
        this.productService.companyId = String(JSON.parse(value.attributes['custom:sessionInformation']).id);
      })
  }
}
