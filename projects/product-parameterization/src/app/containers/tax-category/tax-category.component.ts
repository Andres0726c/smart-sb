import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from '../../shared/toast-message/toast-message.component';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ElementReturn } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-tax-category',
  templateUrl: './tax-category.component.html',
  styleUrls: ['./tax-category.component.scss'],
})
/**
 * Component to work in tax categories association
 * @author BrahyanArteaga-SB
 */
export class TaxCategoryComponent implements OnInit {
  //*Tax categories to be shown in the main table
  taxCategories = new FormArray([]);
  //*Columns to be shown in the main table
  displayedColumns: string[] = ['name', 'description', 'actions'];
  //*Data to be shown in the main table
  dataSource = new MatTableDataSource<any>(this.productService.taxesCategories.value);

  //*It allows you to get instances of native elements, directives, and components that are in the template itself.
  @ViewChild('taxesTable') taxesTable!: MatTable<ElementTableSearch>;
  //*It allows you to get instances of native elements, directives, and components that are in the template itself.
  @ViewChild('paginatorTaxes') paginatorTaxes!: MatPaginator;

  /**
   * It is done dependency injection for implement MatDialog and use modal or popup, 
   * also of MatSnackBar for use the SnackBar or notifications, productService for use of the service 
   * and fb for the handling and construction of form
   * @param dialog 
   * @param toastMessage 
   * @param productService 
   * @param fb 
   */
  constructor(
    public dialog: MatDialog,
    public toastMessage: MatSnackBar,
    public productService: ProductService,
    public fb: FormBuilder
  ) {}

  /**
   * The data source used for the table containing the associated tax categories is initialized 
   * and the paginator is initialized
   */
   ngOnInit(): void {
    console.log("")
  }
  
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.productService.taxesCategories.value);
    this.dataSource.paginator = this.paginatorTaxes;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.productService.taxesCategories.value);
  }

  
  /**
   * Function that allows to open the transversal modal, which at the same time makes the request 
   * to the server where getting and show all the tax categories and allows to associate them 
   * to the datasource
   */
  openToAdd() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription'],
        dbColumnName:['dsdescription']
      },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'taxesCategories',
        columns: columns,
        list: this.productService.taxesCategories.value,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((response: ElementReturn[]) => {
      if (response) {
        this.addItem(response);
      }
    });
  }

  /**
   * Function that adds the selected tax categories in the modal to the datasource 
   * after clicking the Add button, showing a successful association notification
   * @param elements 
   */
  addItem(elements: ElementReturn[]){
    let element: ElementTableSearch;
    for (let object of elements){
      element = {
        id : object.id,
        name : object.name,
        description : object.description,
      };
      this.productService.taxesCategories.push(this.fb.control(element));
    }
    this.dataSource = new MatTableDataSource<any>(this.productService.taxesCategories.value);
    this.dataSource.paginator = this.paginatorTaxes;
    this.taxesTable?.renderRows();
    
    let dataToast: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg: 'Las categorías de impuesto fueron asociadas correctamente',
    };
    this.toastMessage.openFromComponent(ToastMessageComponent, {
      data: dataToast,
    });
  }

  /**
   * Function that deletes elements from the datasource 
   * and at the same time deletes from the main table
   * @param element 
   */
  deleteItem(element: any){
    
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:'¿Está seguro de querer desasociar la categoría de impuesto seleccionada?'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productService.taxesCategories.removeAt(this.productService.taxesCategories.value.indexOf(element));
        this.dataSource = new MatTableDataSource<any>(this.productService.taxesCategories.value);
        this.dataSource.paginator = this.paginatorTaxes;
        this.taxesTable?.renderRows();

      }
    });
  }

  /**
   * Function that allows you to filter or search for elements in the table
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Returns the instance of successful association.
   * @returns instance DataToast
   */
  getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    };
  };
}
