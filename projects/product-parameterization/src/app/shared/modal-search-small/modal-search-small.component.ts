import { Component, OnInit, Inject, ViewChild, HostListener} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchModal, search, tableColumns } from '../../core/model/SearchModal.model';
import { InitialParametersService } from '../../../app/containers/initial-parameters/services/initial-parameters.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { lastValueFrom } from 'rxjs';
import { ProductService } from '../../services/product.service';

export interface SearchParameters {
  code: string;
  columns: tableColumns[];
  list: ElementTableSearch[];
  data?: ElementTableSearch[];
  parameter?: string;
  title?:string;
  subtitle?:string;
  multiSelect?: boolean;
}

@Component({
  selector: 'app-modal-search-small',
  templateUrl: './modal-search-small.component.html',
  styleUrls: ['./modal-search-small.component.scss']
})
export class ModalSearchSmallComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('modalSearchTable') modalSearchTable!: MatTable<any>;

  search = '';
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  sortColumn='0'; //sort remoto
  sortDirection='0';

  modal!: SearchModal;
  isLoading = false;
  reloadFirstRemotePage = false;
  recallFilter = true;

  displayedColumns: string[] = ['select', 'name', 'description'];
  dataSource = new MatTableDataSource<ElementTableSearch>([]);
  dataSourceBk = new MatTableDataSource<ElementTableSearch>([]);
  selection = new SelectionModel<ElementTableSearch>(true, []);
  arrayData: ElementTableSearch[] = [];
  arrayDataBk: ElementTableSearch[] = [];
  flagServiceError: boolean = false;

  constructor (
    public dialogRef: MatDialogRef<ModalSearchSmallComponent>,
    public initialParametersServices: InitialParametersService,
    public productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: SearchParameters
  ) { }

  /**
   * Funcion inicial del formulario modal que carga la data del servicio que segun se necesita consultar utilizando el modelo
   * local llamado ElementTableSearch
   */
  async ngOnInit() {
    try {
      this.modal = search.filter((item: SearchModal) => item.code === this.data.code)[0];



      // seteamos columnas por default
      this.modal.columns = [
        { name: 'name', header: 'Nombre', displayValue: [''] },
        { name: 'description', header: 'Descripción', displayValue: [''] },
      ];
      if(this.modal.sortField){this.sortColumn=this.modal.sortField; }
      if(this.modal.sortDirectionField){this.sortDirection=this.modal.sortDirectionField; }

      //seteamos las columnas que llegan como parámetro
      if (this.data.columns) {
        this.modal.columns = this.data.columns;
      }

      this.displayedColumns = ['select'];
      for (let element of this.modal.columns) {
        if (element.header) this.displayedColumns.push(element.name);
      }

      // seteamos el título
      if (this.data.title) {
        this.modal.title = this.data.title;
      }

      // seteamos el subtítulo
      if (this.data.subtitle) {
        this.modal.subtitle = this.data.subtitle;
      }

      // seteamos las columnas
      if (this.data.columns) {
        this.modal.columns = this.data.columns;
      }

      // seteamos el multiselect
      if (this.data.multiSelect !== undefined) {
        this.modal.multiSelect = this.data.multiSelect;
      } else {
        this.modal.multiSelect = true;
      }

      // seteamos el selection model
      this.selection = new SelectionModel<ElementTableSearch>(this.modal.multiSelect, []);


      // llamamos a la carga de datos
      await this.loadData('0', this.currentPage, this.pageSize,this.sortColumn,this.sortDirection)
    } catch (error) {
      this.flagServiceError = true;

    }
  }

  ngAfterViewInit() {
    // seteamos el paginador
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Función que permite realizar la petición a los microservicios para obtener los datos correspondientes
   * @param page número de la pagina a consultar
   * @param pageSize número de elementos por página
   */
  async loadData(search: string, page: number, pageSize: number, sortColumn:string, sortDirection:string, modificationType?: string) {
    try {
      let res: any;
      let selectedIds = '0';
      this.isLoading = true;
      this.dataSource.data = [];

      if(this.data.list.length > 0) {
        for (let sel of this.data.list) {
          selectedIds += `,${sel.id}`;
        }
      }

      if (!this.data.data) {
        if (this.modal.remotePaginator) {

          if (this.data.parameter) {
            res = await lastValueFrom(this.productService.getApiData(this.modal.service, this.data.parameter + `/${page}/${pageSize}/${selectedIds}/${sortColumn}/${sortDirection}`, search));

          } else {
            
            res = await lastValueFrom(this.productService.getApiData(this.modal.service, `${page}/${pageSize}/${selectedIds}/${sortColumn}/${sortDirection}`, search));

          }

        } else {
          res = await lastValueFrom(this.productService.getApiData(this.modal.service));

        }
      } else {
        res = { body: this.data.data };

      }

      if (res.body) {
        await this.setData(res);
        this.flagServiceError = false;
      }

      this.isLoading = false;
    } catch(error) {
      this.flagServiceError = true;

    }
  }

  /**
   * Method that check the service information and set all the array in the table
   * @param res variable with the rest data informaton
   */
  async setData(res: any) {
    if (Array.isArray(res.body)) {
      this.addToElementData(res.body);
    } else {
      this.addToElementData([res.body]);
    }

    if (!this.data.data && res.dataHeader.hasErrors === false) {
      if (res.dataHeader.totalRecords) {
        this.totalSize = res.dataHeader.totalRecords;
      } else {
        this.totalSize = res.body.length;
      }
    }

    await this.insertDataToTable();

    if (this.data.data) {
      this.paginator.length = this.totalSize;
    } else {
      if (this.modal.remotePaginator) {
        setTimeout(() => {
          this.paginator.length = this.totalSize;
        });
      } else {
        setTimeout(() => {
          this.paginator.length = this.totalSize - this.data.list.length;
        });
      }

    }

  }

  /**
   * Method to set the rest data in the element data
   * @param res variable with the array data
   */
  addToElementData(res: any[]) {
    this.arrayData = []
    res.forEach((element: any) => {
      let obj: any = { id: element.id };

      this.modal.columns?.forEach((col: any) => {
        obj[col.name] = this.setFieldValue(element, col.displayValue);
      });

      if (this.arrayData.findIndex(x => x.id === obj.id) === -1) {
        this.arrayData.push(obj);
        this.arrayDataBk.push(obj);
      }

    });
  }

  /**
   * Method that insert the information in mat table datasource
   */
  async insertDataToTable() {
    if (this.modal.remotePaginator) {
      this.dataSource.data = [...this.arrayData];
      this.dataSourceBk.data = [...this.arrayDataBk];

    } else {
      this.dataSource.data = this.arrayData.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      )

      this.dataSourceBk.data = this.arrayDataBk.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      )
    }
  }

  @HostListener('matSortChange', ['$event'])
    sortChange(e:any) {
    // save cookie with table sort data here
    console.log(e);
  }

  setFieldValue(element: any, valueArray: string []) {
    let value = '';
      for (let item of valueArray) {
      if(!isNaN(Number(item))) {
        return item;
      } else if (item === 'element') {
        return element;
      }

      if(item in element){
        value += element[item];
      }else{
        value += item;
      }
     
    }

    if(value === "null"){
       value='';
    }
    return value;
  }

  getDetailColumn(element: any, colName: string) {
    if(colName.includes('.')) {
      const key1 = colName.split('.')[0];
      const key2 = colName.split('.')[1];
      return element.element[key1][key2];
    } else {
      return element[colName];
    }
  }

  /*
  Method return all the elements selected
  */
  addElements() {
    return this.removeDuplicates(this.selection.selected, 'id');
  }

  /**
   * Method that delete all the elements repeated in the array
   * @param originalArray variable that has the array with the values
   * @param prop variable that has the identifier from the object in the array
   */
   removeDuplicates(originalArray:any, prop:string) {
      let newArray = [];
      let lookupObject:any  = {};
      let i;
      for(i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
      return newArray;
  }

  async pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;

    if (this.modal.remotePaginator) {
      if (this.search.trim().toLowerCase().length >= 3) {
        await this.loadData(this.search, this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
      } else {
        await this.loadData('0', this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
      }

      setTimeout(() => {
        this.paginator.length = this.totalSize;
        this.paginator.pageIndex = this.currentPage;
      });
    }
  }

  /*
  Method to close the dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /* Metodos de selección */
  getDatasourceRow(row: ElementTableSearch): ElementTableSearch {
    return this.dataSourceBk.data.find(x => x.id === row.id) as ElementTableSearch;
  }

  isRowSelected(row: ElementTableSearch) {
    return this.selection.isSelected(this.getDatasourceRow(row))
  }

  toggleSelection(checked: boolean, row: ElementTableSearch) {
    if (checked) {
      this.selectRow(row);
    } else {
      this.deselectRow(row);
    }
  }

  selectRow(row: ElementTableSearch) {
    this.selection.select(this.getDatasourceRow(row));
  }

  deselectRow(row: ElementTableSearch) {
    this.selection.deselect(this.getDatasourceRow(row));
  }

  isAllSelected() {

    const numSelected = this.selection.selected.length;
    const displayedRows = this.dataSource.connect().value.length;
    let isAllSelected = (numSelected === displayedRows);

    if (isAllSelected) {
      isAllSelected = this.isAllDisplayedSelected();
    }

    return isAllSelected;
  }

  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;

    if (this.selection.selected.length === 0 || this.dataSource.filteredData.length === 0) {
      return false;
    }

    for(let element of this.dataSource.connect().value) {
      if (!this.isRowSelected(element)) {
        isAllDisplayedSelected = false;
        return isAllDisplayedSelected;
      }
    }
    return isAllDisplayedSelected;
  }

  isSomeDisplayedSelected(): boolean {
    let pageSize = this.dataSource.filteredData.length;
    let countSelected = 0;

    pageSize = pageSize <= 5 ? pageSize : 5;

    for(let element of this.dataSource.connect().value) {
      if (this.isRowSelected(element)) {
        countSelected++;
      }
    }

    return countSelected > 0 && countSelected < pageSize;
  }

  masterToggle() {
    this.isAllDisplayedSelected() ?
      this.deselectRows() :
      this.selectRows();
  }

  deselectRows() {
    const itemsToBeUnselected = this.dataSource.connect().value;
    itemsToBeUnselected.forEach((element: ElementTableSearch) => {
      this.deselectRow(element);
    });
  }

  selectRows() {
    const currentlyDisplayedRows = this.dataSource.connect().value;

    currentlyDisplayedRows.forEach((element: ElementTableSearch) => {
      this.selectRow(element);
    });
  }
  /* Métodos de selección */

  //funtion to search and filter table
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim().toLowerCase().length >= 3) {
      if (this.modal.remotePaginator) {
        this.reloadFirstRemotePage = true;
        this.currentPage = 0;
        await this.loadData(filterValue, this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
        setTimeout(() => {
          this.paginator.length = this.totalSize;
          this.paginator.pageIndex = this.currentPage;
        });
      } else {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    } else {
      if (this.modal.remotePaginator && this.reloadFirstRemotePage) {
        this.reloadFirstRemotePage = false;
        this.currentPage = 0;
        await this.loadData('0', this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
        setTimeout(() => {
          this.paginator.length = this.totalSize;
          this.paginator.pageIndex = this.currentPage;
        });
      } else if (!this.modal.remotePaginator){
        this.dataSource.filter = '';
        this.paginator.length = this.totalSize;
        this.paginator.pageIndex = this.currentPage;
      }
    }
  }

  /**
   * Metodo para ordenar los elementos de la tabla en los modales
   * @param
   * @returns
   */
   async sortData(sort: any) {

     const obj = JSON.parse(sort.active);

     if (this.modal.remotePaginator) {

        if(sort.direction === ''){
          this.sortColumn = "0";
          this.sortDirection = "0";
        }else{
            this.sortColumn = obj.dbColumnName;
            this.sortDirection = sort.direction;
        }

        if (this.search.trim().toLowerCase().length >= 3) {
          await this.loadData(this.search, this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
        } else {
          await this.loadData('0', this.currentPage, this.pageSize,this.sortColumn, this.sortDirection);
        }

        setTimeout(() => {
          this.paginator.length = this.totalSize;
          this.paginator.pageIndex = this.currentPage;
        });

     }else{

      let data = this.dataSource.data;

      data.sort((a:any, b:any) => {
        return sort.direction === 'asc' ? (a[obj.name] || '').toLowerCase().localeCompare((b[obj.name] || '').toLowerCase()) : (b[obj.name] || '').toLowerCase().localeCompare((a[obj.name] || '').toLowerCase());
      });

      this.dataSource.data = data;
     }


  }

  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
