import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { lastValueFrom, filter } from 'rxjs';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import {
  search,
  SearchModal,
  tableColumns,
} from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { Table, TableService } from 'primeng/table';
import { LazyLoadEvent, SortEvent } from 'primeng/api';

export interface SearchParameters {
  code: string;
  columns: any[];
  list: ElementTableSearch[];
  data?: ElementTableSearch[];
  parameter?: string;
  title?: string;
  subtitle?: string;
  multiSelect?: boolean;
}

@Component({
  selector: 'refactoring-smartcore-mf-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss'],
})
export class ModalSearchComponent implements OnInit {
  @ViewChild('paginator') paginator!: any;
  @ViewChild('modalSearchTable') modalSearchTable!: Table;

  search = '';
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  sortColumn = '0'; //sort remoto
  sortDirection = '0';

  modal!: SearchModal;
  isLoading = false;
  reloadFirstRemotePage = false;
  recallFilter = true;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selection = new SelectionModel<ElementTableSearch>(true, []);
  arrayData: any[] = [];
  arrayDataBk: ElementTableSearch[] = [];
  flagServiceError: boolean = false;
  data!: SearchParameters;

  selectedElement: ElementTableSearch[] = [];

  dataSource: any[] = [];
  dataSourceBk: ElementTableSearch[] = [];
  prevReqParams: any;
  prevSearch: string = '0';

  flagDataEmpty = false;
  
  constructor(
    public productService: ProductService,
    public ref: DynamicDialogRef,
    public dataSourceModal: DynamicDialogConfig
  ) {
    //
  }
  /**
   * Funcion inicial del formulario modal que carga la data del servicio que segun se necesita consultar utilizando el modelo
   * local llamado ElementTableSearch
   */
  ngOnInit() {
    this.loadModalData();
  }

  /**
   * Función que permite cargar la configuración para el tipo de elemento que se va a mostrar en la modal
   */
  loadModalData() {
    try {
      this.data = this.dataSourceModal.data;
      this.modal = search.filter(
        (item: SearchModal) => item.code === this.data.code
      )[0];

      // seteamos columnas por default
      this.modal.columns = [
        { field: 'name', header: 'Nombre', displayValue: [''] },
        { field: 'description', header: 'Descripción', displayValue: [''] },
      ];

      //seteamos las columnas que llegan como parámetro
      if (this.data.columns) {
        this.modal.columns = this.data.columns;
      }

      this.displayedColumns = ['select'];
      for (let element of this.modal.columns) {
        if (element.header) this.displayedColumns.push(element.field);
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
      this.selection = new SelectionModel<ElementTableSearch>(
        this.modal.multiSelect,
        []
      );

      if(!this.modal.remotePaginator) {
        this.getData(
          '0',
          this.currentPage,
          this.pageSize,
          this.sortColumn,
          this.sortDirection
        );
      }
    } catch (error) {
      this.flagServiceError = true;
    }
  }

  /**
   * Función que permite obtener los datos a mostrar en la modal, bien sea a nivel local o por consumo de MS
   * @param search Criterio de búsqueda
   * @param page Página actual
   * @param pageSize Número de elementos por página
   * @param sortColumn Columna para el ordenamiento
   * @param sortDirection Dirección del ordenamiento (Ascendente/Descendente)
   * @param modificationType Tipo de modificación
   */
  getData(
    search: string,
    page: number,
    pageSize: number,
    sortColumn: string,
    sortDirection: string,
    modificationType?: string
  ) {
    let selectedIds = '0';
    let res: any;
    let requestParams: any = '';
    this.isLoading = true;

    if (this.data.list.length > 0) {
      for (let sel of this.data.list) {
        selectedIds += `,${sel.id}`;
      }
    }

    if (!this.data.data) {
      // Se consume MS
      if (this.modal.remotePaginator) {
        if (this.data.parameter) {
          requestParams = this.data.parameter + `/${page}/${pageSize}/${selectedIds}/${sortColumn}/${sortDirection}`;
        } else {
          requestParams = `${page}/${pageSize}/${selectedIds}/${sortColumn}/${sortDirection}`;
        }
      }
      this.getApiData(requestParams, search);
    } else {
      // Se cargan datos locales presentes en el service transversal
      res = { body: this.data.data };
      this.isLoading = false;
      this.setData(res);
      this.flagServiceError = false;
    }
    
  }

  getApiData(requestParams: any, search: string) {
    this.productService.getApiData(this.modal.service, requestParams, search).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200 && res.dataHeader.hasErrors === false) {
        if (res.body !== null) {
          this.flagDataEmpty = false;
          this.setData(res);
          this.flagServiceError = false;
        }else{
          this.flagDataEmpty = true;
          this.dataSource = [];
        }
      } else {
        this.flagServiceError = true;
      }
      this.isLoading = false;
    });
  }

  /**
   * Method that check the service information and set all the array in the table
   * @param res variable with the data
   */
  setData(res: any) {
    // Luis, quedamos en este punto para revisar las funciones y la paginación
    if (Array.isArray(res.body)) {
      this.addToElementData(res.body);
    } else {
      this.addToElementData([res.body]);
    }

    if (!this.data.data) {
      if (res.dataHeader.totalRecords) {
        this.totalSize = res.dataHeader.totalRecords;
      } else {
        this.totalSize = res.body.length;
      }
    }

    this.insertDataToTable();
  }

  /**
   * Method to set the rest data in the element data
   * @param res variable with the array data
   */
  addToElementData(res: any[]) {
    this.arrayData = [];
    res.forEach((element: any) => {
      let obj: any = { id: element.id };

      this.modal.columns?.forEach((col: any) => {
        obj[col.field] = this.setFieldValue(element, col.displayValue);
      });

      if (this.arrayData.findIndex((x) => x.id === obj.id) === -1) {
        this.arrayData.push(obj);
        this.arrayDataBk.push(obj);
      }
    });
  }

  setFieldValue(element: any, valueArray: string[]) {
    let value = '';
    for (let item of valueArray) {
      if (!isNaN(Number(item))) {
        return item;
      } else if (item === 'element') {
        return element;
      }

      if (item in element) {
        value += element[item];
      } else {
        value += item;
      }
    }

    if (value === 'null') {
      value = '';
    }
    return value;
  }

  /*
  Method return all the elements selected
  */
  addElements() {
    let arrData: ElementTableSearch[] = [];
    arrData = this.removeDuplicates(this.selectedElement, 'id');
    this.ref.close(arrData);
  }

  /**
   * Method that delete all the elements repeated in the array
   * @param originalArray variable that has the array with the values
   * @param prop variable that has the identifier from the object in the array
   */
  removeDuplicates(originalArray: any, prop: string) {
    let newArray: any = [];
    let lookupObject: any = {};
    let i;
    for (i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  /**
   * Method that insert the information in mat table datasource
   */
  insertDataToTable() {
    if (this.modal.remotePaginator) {
      this.dataSource = [...this.arrayData];
      this.dataSourceBk = [...this.arrayDataBk];
    } else {
      this.dataSource = this.arrayData.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      );

      this.dataSourceBk = this.arrayDataBk.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      );
    }
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

  applyFilterGlobal(event: Event, filterType: string) {
    let searchVal = (event.target as HTMLInputElement).value;
    if (searchVal.trim().toLowerCase().length >= 3) {
      this.modalSearchTable.filterGlobal(searchVal, filterType);
    } else {
      this.modalSearchTable.filterGlobal('', filterType);
    }
  }

  showedColumns() {
    return this.data.columns?.filter((x: any) => x.header);
  }

  /* loadRemoteData(event: LazyLoadEvent) {
    let requestParams: any = '';
    let search = '0';
    let selectedIds = '0';
    let doReq = true;
    const pageNumer = (event.first ?? 0) / (event.rows ?? 1);
    const sortDirections: any = {
      '0': '0',
      '1': 'asc',
      '-1': 'desc'
    }

    if (this.data.list.length > 0) {
      for (let sel of this.data.list) {
        selectedIds += `,${sel.id}`;
      }
    }

    if(event.globalFilter && event.globalFilter.length >= 3) {
      search = event.globalFilter
    } else {
      search = '0';
    }

    this.setRequestParams(event, selectedIds, search);
  } */

  loadRemoteData(event: LazyLoadEvent) {
    let requestParams: any = '';
    let search = '0';
    let selectedIds = '0';
    const pageNumber = (event.first ?? 0) / (event.rows ?? 1);

    if (this.data.list.length > 0) {
      for (let sel of this.data.list) {
        selectedIds += `,${sel.id}`;
      }
    }

    if(event.globalFilter && event.globalFilter.length >= 3) {
      search = event.globalFilter
    } else {
      search = '0';
    }

    requestParams = this.defineParameters(event, pageNumber, selectedIds);
    this.doReq(requestParams, search);

  }

  defineParameters(event: any, pageNumber: any, selectedIds: any) {
    let requestParams: any = '';
    const sortDirections: any = {
      '0': '0',
      '1': 'asc',
      '-1': 'desc'
    }

    if (this.data.parameter) {
      requestParams = this.data.parameter + `/${pageNumber}/${event.rows}/${selectedIds}/${event.sortField ?? '0'}/${sortDirections[event.sortOrder ?? '0']}`;
    } else {
      requestParams = `${pageNumber}/${event.rows}/${selectedIds}/${event.sortField ?? '0'}/${sortDirections[event.sortOrder ?? '0']}`;
    }

    return requestParams;
  }

  doReq(requestParams: any, search: any) {
    let doReq = true;
    if (this.prevReqParams === requestParams && this.prevSearch === search) {
      doReq = false;
    } else {
      this.prevReqParams = requestParams;
      this.prevSearch = search;
    }
    
    if (doReq) {
      this.isLoading = true;
      this.getApiData(requestParams, search);
    }
  }
}