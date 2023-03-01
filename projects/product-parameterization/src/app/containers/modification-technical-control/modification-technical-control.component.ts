import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../../../policy-management/src/app/core/services/product/product.service';

@Component({
  selector: 'app-modification-technical-control',
  templateUrl: './modification-technical-control.component.html',
  styleUrls: ['./modification-technical-control.component.scss']
})
export class ModificationTechnicalControlComponent {

  modificationTechnicalControlsData: any = new FormArray<any>([]);

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastMessage: MatSnackBar,
    public productService: ProductService
  ) {

  }

  openToAdd() {}
}
