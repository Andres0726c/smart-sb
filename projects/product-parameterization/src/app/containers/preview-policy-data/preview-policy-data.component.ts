import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';

@Component({
  selector: 'app-preview-policy-data',
  templateUrl: './preview-policy-data.component.html',
  styleUrls: ['./preview-policy-data.component.scss']
})
export class PreviewPolicyDataComponent implements OnInit {

  previewPolicyData: any = new FormArray<any>([]);
  
  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
  ) { 

  }

  ngOnInit(): void {
    //
  }

  openToAdd() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['dsDescription'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'],dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'complementaryDataControls',
        parameter: '22',
        columns: columns,
        list: this.productService.policyData.value,
      },

      panelClass: 'custom-dialog-container',
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (this.previewPolicyData == 0) {
        /* this.addModificationType(res);
        this.index = 0;
        this.selectedModificationType = this.modificationTypeGroup; */
      } else {
        /* this.addModificationType(res); */
      }
    });
  }

}
