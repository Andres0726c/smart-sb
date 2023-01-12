import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CognitoService } from 'commons-lib';
import { lastValueFrom } from 'rxjs';
import { MyErrorStateMatcher } from '../../core/error-state-matcher/error-state-matcher';
import { SearchModal } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { ModalCreateProductComponent } from '../modal-create-product/modal-create-product.component';
import { ModalEditProductService } from './services/modal-edit-product.service';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent implements OnInit {
  public formData: FormGroup;

  matcher = new MyErrorStateMatcher();
  idCompany = null;
  ramo: any = [];

  product: any = [];

  ramotable:string='';

  element: any;

  modal!: SearchModal;
  isLoading = false;
  flagServiceError = false;
  isLoadingInput: boolean = false;


  @ViewChild('productTable') productTable!: MatTable<any>;
  @ViewChild('paginatorProductTable') paginatorProductTable!: MatPaginator;

  displayedColumns: string[] = ['select', 'product', 'ramo'];
  dataSource = new MatTableDataSource<any>(this.product);
  selection = new SelectionModel<any>(false, []);
  insuranceLine!: number;
  totalRecords: number = 0;

  constructor(
    public fb: FormBuilder,
    public dialogModal: MatDialog,
    public dialog: MatDialogRef<ModalCreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public initialDataEditProduct: ModalEditProductService,
    public cognitoService: CognitoService,
    public service: ProductService
  ) {
    this.formData = this.fb.group({
      ramo: this.fb.control('', [Validators.required]),
      filter: this.fb.control('')
    });
    this.formData.get('filter')?.valueChanges.subscribe(()=>{
      this.paginatorProductTable.firstPage()
      this.applyFilter()
    })
  }

  ngOnInit(): void {
    this.getDataInsuranceLine();
  }

  getDataInsuranceLine = async (id: string = '3', serviceData: string = '') => {
    this.isLoading = true;
    try {
      let res = await lastValueFrom(
        this.initialDataEditProduct.getDataEdit(
          'insuranceLine/findByCompany',
          this.service.companyId
        )
      );
      if (res.dataHeader.hasErrors === false) {
        this.ramo = res.body;
      }
    } catch (error) {
      this.flagServiceError = true;
    }
    this.isLoading = false;
  };

  async selectInsurenceLine(id: any) {
    let nameInuranceLine = this.ramo.filter((x: { id: any }) => x.id == id);
    if (id) this.product = [];
    this.selection.clear();

    this.ramotable = nameInuranceLine[0].nmName;
    this.insuranceLine = id;

    this.isLoading = true;
    await this.getProductsSearch(this.insuranceLine);
    this.isLoading = false;
  }

  addItem(result: any) {

    let element: any;



    if (result) {

      this.product = [];
      for (let object of result.body) {

        element = {
          product: object.id,
          ramo: this.ramotable,
          productJson: object.productJson
        };
        this.product.push(element);
      }

      this.dataSource = new MatTableDataSource<any>(this.product);
    }
  }

  addProduct() {


    for (let object of this.selection.selected) {
      this.element = {
        productJson: object.productJson,
      };
    }
    this.service.getProduct(this.element.productJson);



    this.onNoClick();
    this.router.navigate(['productos/parametrizador/parametros-generales']);

  }

  getProductsSearch = async (id: number, search: string = '0', page:number=0) => {

    if (search == '') search = '0';
    try {
      let res = await lastValueFrom(
        this.initialDataEditProduct.getDataEdit(
          'product/findByInsuranceLine',
          `${id}/${page}/5/${search}`
        )
      );
      if (res.dataHeader.hasErrors === false) {
        this.addItem(res);
        this.totalRecords = res.dataHeader.totalRecords
      }
    } catch (error) {
      this.flagServiceError = true;
    }
  };

  async applyFilter(page:number=0){
    this.isLoadingInput = true;
    const filter = this.formData.value.filter
    await this.getProductsSearch(this.insuranceLine,filter,page);
    this.isLoadingInput = false;
  }

  changePage(event: PageEvent){
   this.applyFilter(event.pageIndex)
  }

  /**
   * Evento que cierra el modal..
   */
  onNoClick(): void {
    this.dialog.close();
  }

  /**
   * Determina si el valor ingresado en campo de la instacia form tiene error de validaci\u00f3n.
   * @param formControlName identificador del input con el valor a validar.
   * @param errorName       identificador del error que se despliega.
   * @returns TRUE si hay error en la validaci\u00f3n, FALSE en caso contrario.
   */
  public hasError(formControlName: string, errorName: string) {
    return this.formData.controls[formControlName].hasError(errorName);
  }

  /**
   * Metodo para ordenar los elementos de la tabla en los modales
   * @param sort
   * @returns
   */
    sortData(sort: Sort) {
      let data = this.dataSource.data;

      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';

        switch (sort.active) {
          case 'product':
            return isAsc ? a.product.toLowerCase().localeCompare(b.product.toLowerCase()) : b.product.toLowerCase().localeCompare(a.product.toLowerCase());
            // return this.compare(a.product.toLowerCase(), b.product.toLowerCase(), isAsc);
          case 'ramo':
            return isAsc ? a.ramo.toLowerCase().localeCompare(b.ramo.toLowerCase()) : b.ramo.toLowerCase().localeCompare(a.ramo.toLowerCase());
            // return this.compare(a.ramo.toLowerCase(), b.ramo.toLowerCase(), isAsc);
          default:
            return 0;
        }
      });

      this.dataSource.data = data;
    }

    compare(a: any, b: any, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    addModal(){

      for (let object of this.selection.selected) {
        this.element = {
          productJson: object.productJson,
        };
      }

        this.dialogModal.open(ModalCreateProductComponent, {
          width: '578px', height: '580px', panelClass: 'modal',
          data: { name: "copy", product: this.element.productJson}
        });

      this.onNoClick();

    }

}
