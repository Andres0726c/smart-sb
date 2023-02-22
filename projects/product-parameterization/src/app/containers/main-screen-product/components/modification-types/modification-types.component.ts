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

  showCommercialPlans:boolean=false;
  showCommercialPlansTypes:boolean=false;
  constructor(private productService:ProductService,public dialogService: DialogService) { }

  ngOnInit(): void {
  }
  
  openToAdd(){

  }
  changeViewCommercial() {
    this.showCommercialPlans = !this.showCommercialPlans;
    if(this.showCommercialPlansTypes)
    this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  }
  changeViewCommercialTypes() {
    this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
    if(this.showCommercialPlans)
    this.showCommercialPlans = !this.showCommercialPlans;

  }
}
