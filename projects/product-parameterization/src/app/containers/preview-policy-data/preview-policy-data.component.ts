import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-preview-policy-data',
  templateUrl: './preview-policy-data.component.html',
  styleUrls: ['./preview-policy-data.component.scss']
})
export class PreviewPolicyDataComponent implements OnInit {

  
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastMessage: MatSnackBar,
    public productService: ProductService,
  ) { 

  }

  ngOnInit(): void {
    //empty
  }

}
