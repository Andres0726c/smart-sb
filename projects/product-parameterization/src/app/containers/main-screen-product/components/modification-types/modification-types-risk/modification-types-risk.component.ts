import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-modification-types-risk',
  templateUrl: './modification-types-risk.component.html',
  styleUrls: ['./modification-types-risk.component.scss']
})
export class ModificationTypesRiskComponent implements OnInit {
  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: 'Plan premium' }
  ];
  home = { icon: 'pi pi-home', routerLink: '/' };
  tableData =[];
  breadcrumb:any;
  showCommercialPlans:boolean=false;
  selectedCategories: any[] = ['Technology', 'Sports'];
  categories: any[] = [{name: 'Reemplazar', key: 'A'}, {name: 'Modificar', key: 'M'}];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.selectedCategories = this.categories.slice(1,3);
    console.log(this.selectedCategories)
  }
  changeView(){
    this.tableData=this.productService.getProductObject().servicePlans;
    this.showCommercialPlans=!this.showCommercialPlans;
  }

  checked: boolean = false;
  
  public changeCheck() {
    console.log(this.categories);
    console.log(this.categories ? "Checked" : "Unchecked");
  }

}
