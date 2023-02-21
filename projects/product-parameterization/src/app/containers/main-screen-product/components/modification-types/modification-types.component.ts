import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'refactoring-smartcore-mf-modification-types',
  templateUrl: './modification-types.component.html',
  providers:[DialogService],
  styleUrls: ['./modification-types.component.scss']
})
export class ModificationTypesComponent implements OnInit {

  constructor(private productService:ProductService,public dialogService: DialogService) { }

  ngOnInit(): void {
  }
  // openToAdd(): void {

  //   const columns = [
  //     { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
  //     { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
  //     { name: 'element', displayValue: ['element'] },
  //   ];
    
  //   let parameter =
  //     this.productService.initialParameters?.get('insuranceLine')?.value !== null
  //       ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
  //       : '0';
      
  //   const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
  //     data: {
  //       code: 'riskTypeDataControls',
  //       columns: columns,
  //       list: this.productService.riskTypes.value,
  //       parameter,
  //     },
  //     panelClass: 'custom-dialog-container',
  //   });
  //   dialogRef.afterClosed().subscribe((res) => {
  //     if (this.productService.riskTypes.length == 0) {
  //       this.addRiskType(res);
  //       this.index = 0;
  //       this.selectedRiskType = this.riskTypeGroup;
  //     } else {
  //       this.addRiskType(res);
  //     }
  //   });
  // }
  openToAdd(){

  }

}
