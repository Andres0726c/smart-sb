import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ElementTableSearch } from '../../../../../core/model/ElementTableSearch.model';
import { ProductService } from '../../../../../services/product.service';
import { ModalSearchComponent } from '../../../../../shared/modal-search/modal-search.component';
import { ModalDeleteComponent } from 'libs/commons-lib/src/lib/components/modal-delete/modal-delete.component';

@Component({
  selector: 'refactoring-smartcore-mf-deductibles',
  templateUrl: './deductibles.component.html',
  styleUrls: ['./deductibles.component.scss'],
  providers: [DialogService],
})
/**
 * Component to handle deductibles in coverages
 */
export class DeductiblesComponent implements OnInit {
  @ViewChild('modalSearchTable') modalSearchTable!: Table;
  @Input() formDeductibles: any = new FormArray([], [Validators.required]);

  dataSource: any[] = [];
  columns: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ];
  selectedElement: ElementTableSearch[] = [];

  /**
   * Constructor empty
   * @param dialogService
   * @param productService
   * @param fb
   */
  constructor(
    public dialogService: DialogService,
    public productService: ProductService,
    public fb: FormBuilder
  ) {
    //contructor
  }

  /**
   * Method to initialize data source for table
   */
  ngOnInit() {
    this.dataSource = this.deductibleControls.value;
  }

  /**
   * Method to gets the deductible that enter in @input
   */
  get deductibleControls(): FormArray {
    return this.formDeductibles;
  }

  /**
   * method that opens the deductibles modal
   */
  openToAdd() {
    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmName'],
        dbColumnName: ['nmname'],
      },
      {
        field: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription'],
        dbColumnName: ['dsdescription'],
      },
    ];

    const dialogRef = this.dialogService.open(ModalSearchComponent, {
      data: {
        code: 'deductibleDataControls',
        list: this.formDeductibles.value,
        columns: columns,
      },
      showHeader: false,
      width: '550px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.addDeductible(res);
    });
  }

  /**
   * method that according to the response of the modal adds elements to table
   * @param deductibles
   */
  addDeductible(deductibles: ElementTableSearch[]) {
    if (deductibles) {
      for (let deductible of deductibles) {
        this.formDeductibles.push(this.fb.group({ ...deductible }));
      }
      this.dataSource = this.deductibleControls.value;
    }
  }

  /**
   * get detail column
   * @param element
   * @param colName
   * @returns
   */
  getDetailColumn(element: any, colName: string) {
    if (colName.includes('.')) {
      const key1 = colName.split('.')[0];
      const key2 = colName.split('.')[1];
      return element.element[key1][key2];
    } else {
      return element[colName];
    }
  }

  /**
   * method that removes deductibles selected
   */
  removeDeductible() {
    let dialogRef = this.dialogService.open(ModalDeleteComponent, {
      data: {
        message: `¿Está seguro de querer desasociar los deducibles seleccionados?`,
      },
      showHeader: false,
      width: '400px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.removeConfirmation(res);
    });
  }

  /**
   * Remove when res is true
   */
  removeConfirmation(res: any) {
    if (res) {
      for (let select of this.selectedElement) {
        this.formDeductibles.removeAt(
          this.formDeductibles.value.indexOf(select)
        );
      }
      this.dataSource = this.formDeductibles.value;
      this.selectedElement = [];
    }
  }

  /**
   * method that allows filter deductibles by name or description
   * @param event
   * @param filterType
   */
  applyFilter(event: Event, filterType: string) {
    let searchVal = (event.target as HTMLInputElement).value;
    if (searchVal.trim().toLocaleLowerCase().length >= 3) {
      this.modalSearchTable.filterGlobal(searchVal, filterType);
    } else {
      this.modalSearchTable.filterGlobal('', filterType);
    }
  }
}
