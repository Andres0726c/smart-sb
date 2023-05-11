import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { search, SearchModal } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { SearchParameters } from '../modal-search-small/modal-search-small.component';

@Component({
  selector: 'refactoring-smartcore-mf-rules-wizard',
  templateUrl: './rules-wizard.component.html',
  styleUrls: ['./rules-wizard.component.scss']
})
export class RulesWizardComponent implements OnInit {
  @ViewChild('modalSearchTable') modalSearchTable!: Table;
  search = '';
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  sortColumn = '0'; //sort remoto
  sortDirection = '0';

  modal!: any;
  isLoading = false;

  selection = new SelectionModel<ElementTableSearch>(false, []);
  arrayData: any[] = [];
  arrayDataBk: ElementTableSearch[] = [];
  flagServiceError: boolean = false;
  data!: SearchParameters;

  displayedColumns: string[] = ['select', 'name', 'description'];

  selectedElement!: ElementTableSearch;

  dataSource: any[] = [];
  prevReqParams: any;
  prevSearch: string = '0';

  items: MenuItem[];
  activeIndex = 0;

  parametersForm: FormGroup;

  constructor(
    public productService: ProductService,
    public ref: DynamicDialogRef,
    public dataSourceModal: DynamicDialogConfig,
    public fb: FormBuilder
  ) {
    this.parametersForm = this.fb.group({
      rule: this.fb.control(null),
      parameters: this.fb.array([])
    })

    this.items = [
      {
        label: 'Selección de regla',
        command: (event: any) => {
            this.activeIndex = 0;
        }
      },
      {
        label: 'Parámetros de entrada',
        command: (event: any) => {
            this.activeIndex = 1;
        }
      }
    ];

  }

  /**
   * Funcion inicial del formulario modal que carga la data del servicio que segun se necesita consultar utilizando el modelo
   * local llamado ElementTableSearch
   */
  ngOnInit() {
    this.loadModalData();
  }

  get paramsControls() {
    return this.parametersForm.get('parameters') as FormArray;
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
    } catch (error) {
      this.flagServiceError = true;
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

  showedColumns() {
    return this.data.columns?.filter((x: any) => x.header);
  }

  getApiData(requestParams: any, search: string) {
    this.productService.getApiData(this.modal.service, requestParams, search).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200 && res.dataHeader.hasErrors === false && res.body) {
         this.setData(res).then(result => {}).catch(error => {});
        this.flagServiceError = false;
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
  async setData(res: any) {
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

    await this.insertDataToTable().then();
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
    if (this.selectedElement) {
      this.arrayData.push(this.selectedElement);
    }
    this.ref.close(arrData);
  }

  /**
   * Method that insert the information in mat table datasource
   */
  async insertDataToTable() {
    if (this.modal.remotePaginator) {
      this.dataSource = [...this.arrayData];
    } else {
      this.dataSource = this.arrayData.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      );
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

  onRowSelect(event: any) {
    this.parametersForm.get('rule')?.setValue(this.selectedElement);
    (<FormArray>this.parametersForm.get('parameters'))?.clear();
    
    try {
      const ruleParams = JSON.parse(event.data.nmParameterList);
      for (let param of Object.keys(ruleParams)) {
        const fgParameter = this.fb.group({
          name: this.fb.control(param),
          type: this.fb.control(ruleParams[param]),
          value: this.fb.control(null, [Validators.required]) 
        });
        (<FormArray>this.parametersForm.get('parameters')).push(fgParameter);
      }
    } catch (error) {
      console.error('Los parémetros de la regla no tienen la estructura correcta');
    }
  }

}