import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { ModalSearchComponent } from '../modal-search/modal-search.component';
import { ModalDeleteComponent } from 'libs/commons-lib/src/lib/components/modal-delete/modal-delete.component';

@Component({
  selector: 'refactoring-smartcore-mf-clauses-shared',
  templateUrl: './clauses-shared.component.html',
  styleUrls: ['./clauses-shared.component.scss'],
})
/**
 * transverse component to handle parameterization of clauses
 */
export class ClausesSharedComponent implements OnInit {
  @Input() formClauses: any = new FormArray([]);
  @Input() layoutType: string = 'child';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() emptyText: string = '';
  @Input() emptySubText: string = '';
  @Input() messageText: string = '';

  @ViewChild('modalSearchTable') modalSearchTable!: Table;

  dataSource: any[] = [];
  columns: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'description', header: 'Descripción' },
  ];
  selectedElement: ElementTableSearch[] = [];
  nameInuranceLine: any = [];
  displayModalDetail: boolean = false;

  nameClause: string = '';
  detailClause: string = '';

  /**
   * contructor empty
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
   * method that gets clauses form that comes in @input
   */
  get clausesControls(): FormArray {
    return this.formClauses;
  }

  /**
   * method that initialize datasource that is used in table html
   */
  ngOnInit() {
    this.dataSource = this.clausesControls.value;
    if (!this.productService.ramo) {
      this.getDataInsuranceLine();
    }
  }

  /**
   * method that allows filter clauses by name or description
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

  /**
   * method that opens the clauses modal
   */
  openToAdd() {
    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmName'],
        dbColumnName: ['nmName'],
      },
      {
        field: 'description',
        header: 'Descripción',
        displayValue: ['description'],
        dbColumnName: ['description'],
      },
      { field: 'details', displayValue: ['legalText'] },
    ];

    const dialogRef = this.dialogService.open(ModalSearchComponent, {
      data: {
        code: 'clausesControls',
        list: this.formClauses.value,
        columns: columns,
        parameter,
      },
      showHeader: false,
      width: '550px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.addClause(res);
    });
  }

  /**
   * method that according to the response of the modal adds elements to table
   * @param clauses
   */
  addClause(clauses: ElementTableSearch[]) {
    if (clauses) {
      for (let clause of clauses) {
        this.formClauses.push(this.fb.group({ ...clause }));
      }
      this.dataSource = this.clausesControls.value;
    }
  }

  /**
   * method that removes clauses selected
   */
  removeClause() {
    let dialogRef = this.dialogService.open(ModalDeleteComponent, {
      data: {
        message: `¿Está seguro de querer desasociar las cláusulas seleccionadas?`,
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
        this.formClauses.removeAt(this.formClauses.value.indexOf(select));
      }
      this.dataSource = this.formClauses.value;
      this.selectedElement = [];
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
   * opens the clause detail
   * @param rowData
   */
  openDetail(rowData: any) {
    this.nameClause = rowData.name;
    this.detailClause = this.prepareData(rowData.details);

    this.displayModalDetail = true;
  }

  /**
   * closes the clause detail
   */
  closeModalDetail() {
    this.displayModalDetail = false;
  }

  /**
   * method that does request for get insurance line data
   */
  getDataInsuranceLine = async () => {

    try {
      let res!: any;
      res = await lastValueFrom(
        this.productService.getApiData(
          'insuranceLine/findByCompany',
          this.productService.companyId
        )
      );
      if (res.dataHeader.hasErrors === false) {
        this.nameInuranceLine = res.body;
        this.nameInuranceLine = this.nameInuranceLine.filter(
          (x: { id: any }) =>
            x.id ==
            this.productService.initialParameters?.get('insuranceLine')?.value
        );
        this.productService.ramo = this.nameInuranceLine[0].nmName;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
    }
  };

  /**
   * method that prepare clause data for view his detail
   * @param detail
   * @returns
   */
  prepareData(detail: string) {
    detail = detail.replace(/\\n/g, '<br />');
    detail = detail.replace(/\\t/g, '&nbsp;');
    detail = detail.replace(/&nbsp[;]?/gi, '');
    return detail;
  }
}
