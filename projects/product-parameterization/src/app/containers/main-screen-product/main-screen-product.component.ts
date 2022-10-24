import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { ProductService } from 'src/app/services/product.service';

/*import { ModalCreateProductComponent } from '../modal-create-product/modal-create-product.component';
import { ModalEditProductComponent } from '../modal-edit-product/modal-edit-product.component';
import { ModalCompanyComponent } from '../modal-company/modal-company.component';*/

@Component({
  selector: 'app-main-screen-product',
  templateUrl: './main-screen-product.component.html',
  styleUrls: ['./main-screen-product.component.scss']
})
export class MainScreenProductComponent implements OnInit {

  
  name: string = "";
  comercialName: string = "";
  trade: string = "";

  constructor(public dialog: MatDialog, /*public productService: ProductService*/) { }

  ngOnInit(): void {
    /* Initialize product data */
    //this.productService.initializeData();
  }

  /**
   * Function to open modal for create product
   */
  openNewProductDialog(): void {
    /*this.dialog.open(ModalCreateProductComponent, {
      width: '578px', height: '580px', panelClass: 'modal',
      data: { name: this.name, comercialName: this.comercialName }
    });*/
    
  }

  /**
   * Function to open modal for edit product
   */
  openEditProductDialog(process: string): void {
    /*this.dialog.open(ModalEditProductComponent, {
      width: '578px', panelClass: 'modal',
      data: { name: this.name, trade: this.trade, processType: process }
    });*/
    
  }

  openModalCompany(): void {
    /*this.dialog.open(ModalCompanyComponent, {
      width: '578px', panelClass: 'modal',
      data: {
        name: 'Compañias'
      }
    })*/
  }
 /**
   * Function to open modal for copy product
   */
  

}
