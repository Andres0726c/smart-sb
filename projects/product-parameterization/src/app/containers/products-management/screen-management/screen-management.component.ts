import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-screen-management',
  templateUrl: './screen-management.component.html',
})
export class ScreenManagementComponent implements OnInit {
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (
      (Object.keys(this.productService.productBk).length > 0 && !this.productService.noProductChanges(this.productService.productBk, this.productService.getProductObject()))
      ||
      (Object.keys(this.productService.productBk).length === 0 && this.productService.initialParameters.get('insuranceLine')?.value) 
    ) {
      event.returnValue = confirm("Changes you made may not be saved.");
    }
  }

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
}
