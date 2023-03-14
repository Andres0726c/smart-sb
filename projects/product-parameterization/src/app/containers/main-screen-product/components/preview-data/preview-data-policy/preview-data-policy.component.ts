import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';

@Component({
  selector: 'refactoring-smartcore-mf-preview-data-policy',
  templateUrl: './preview-data-policy.component.html',
  styleUrls: ['./preview-data-policy.component.scss']
})
export class PreviewDataPolicyComponent implements OnInit {

  dataPolicy:any=new FormArray([]);
  contextData: any = [];

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.policyPreviewControls,"pre");
  }

  get policyPreviewControls(): FormArray {
    return (<FormArray>(
      this.productService.prvwDt?.get('plcyDtGrp')
    )) as FormArray;
  }

  getParamValuesList() {
    let list: any = [];

    for (let field of this.getAllFields()) {
      const objField = {
        id: field.businessCode,
        name: field.name
      };
      list.push(objField);
    }

    for (let field of this.contextData) {
      const objContext = {
        id: field.code,
        name: field.description
      };
      list.push(objContext);
    }

    list = list.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));
    console.log('valores: ', list);

    return list;
  }

  getAllFields() {
    let res: any[] = [];
    for(const group of this.productService.policyData.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }


  openToAdd(): void {
    
    let sendData = [];
    sendData = this.productService.policyData?.value[0].fields;
 
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['label'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
      },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: 'emissionData',
        columns: columns,
        list: [],
        data:this.productService.policyData?.value[0].fields //level==='risk'?this.getAllRisk():this.getAllFields(),
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
     // this.addItem(res, 1, true);
    });
  }
}
