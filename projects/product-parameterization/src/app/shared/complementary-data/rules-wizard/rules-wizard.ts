import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchModal, search, tableColumns } from '../../../core/model/SearchModal.model';
import { lastValueFrom } from 'rxjs';
import {InitialParametersService} from "../../../containers/initial-parameters/services/initial-parameters.service";
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { O } from '@angular/cdk/keycodes';


export interface SearchParameters {
  code: string;
  columns: tableColumns[];
  list: ElementTableSearch[];
  data?: ElementTableSearch[];
  parameter?: string;
  title?:string;
  subtitle?:string;
  multiSelect?: boolean;
  complementaryData?: any;
  contextData?: any;
}

@Component({
  selector: 'app-rules-wizard',
  templateUrl: './rules-wizard.html',
  styleUrls: ['./rules-wizard.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class RulesWizardComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('modalSearchTable') modalSearchTable!: MatTable<any>;

  searchRule = '';
  rulesPageSize = 5;
  currentRulesPage = 0;
  totalRulesSize = 0;
  sortColumns ='0';
  sortingDirection ='0';
  rulesModal!: SearchModal;
  pageLoading = false;
  reloadModalFirstRemotePage = false;
  recallModalFilter = true;
  displayedModalColumns: string[] = ['select', 'name', 'description'];
  rulesDataSource = new MatTableDataSource<ElementTableSearch>([]);
  dataSourceAux = new MatTableDataSource<ElementTableSearch>([]);
  ruleSelection = new SelectionModel<ElementTableSearch>(true, []);
  dataList: ElementTableSearch[] = [];
  dataListAux: ElementTableSearch[] = [];
  flagError: boolean = false;
  stepParameters: any;
  aditionalData: any = [];
  ParametersForm:FormGroup;
  fields: any = new FormArray([]);
  rule: any = [];
  contextData: any = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<RulesWizardComponent>,
    public initialParametersServices: InitialParametersService,
    public productService: ProductService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SearchParameters
  ) {
    this.ParametersForm = this.fb.group({
      rule:this.fb.control(null),
      parameters:this.fb.array([])
    })
  }

  async ngOnInit() {
    try {
      this.rulesModal = search.filter((item: SearchModal) => item.code === this.data.code)[0];

      // seteamos columnas por default
      this.rulesModal.columns = [
        { name: 'name', header: 'Nombre', displayValue: [''] },
        { name: 'description', header: 'Descripción', displayValue: [''] },
      ];

      //seteamos las columnas que llegan como parámetro
      if (this.data.columns) {
        this.rulesModal.columns = this.data.columns;
      }

      this.displayedModalColumns = ['select'];

      for (let element of this.rulesModal.columns) {
        if (element.header) this.displayedModalColumns.push(element.name);
      }

      // seteamos el título
      if (this.data.title) {
        this.rulesModal.title = this.data.title;
      }

      // seteamos el subtítulo
      if (this.data.subtitle) {
        this.rulesModal.subtitle = this.data.subtitle;
      }

      // seteamos las columnas
      if (this.data.columns) {
        this.rulesModal.columns = this.data.columns;
      }

      // seteamos el multiselect
      if (this.data.multiSelect !== undefined) {
        this.rulesModal.multiSelect = this.data.multiSelect;
      } else {
        this.rulesModal.multiSelect = true;
      }

      // seteamos el selection model
      this.ruleSelection = new SelectionModel<ElementTableSearch>(this.rulesModal.multiSelect, []);

      this.contextData = this.transformContextData(this.data.contextData);

      // llamamos a la carga de datos
      await this.loadData('0', this.currentRulesPage, this.rulesPageSize,this.sortColumns,this.sortingDirection);

    } catch (error) {
      this.flagError = true;
      console.log('Hubo un error:', error);
    }
  }

  transformContextData(dataList:any[]){
    //se agrega la propiedad businessCode al arreglo del dominio
    dataList.forEach(obj =>{
      obj.businessCode = obj.code;
      // or via brackets
      // obj['total'] = 2;
      return obj;
    });

    return dataList;
  }

  ngAfterViewInit() {
    // seteamos el paginador
    this.rulesDataSource.paginator = this.paginator;
  }

  /**
   * Close the modal (Wizard)
   */
  closeWizard() {
    this.dialog.closeAll();
  }

  /**
   * Función que permite realizar la petición a los microservicios para obtener los datos correspondientes
   * @param page número de la pagina a consultar
   * @param pageSize número de elementos por página
   */
  async loadData(search: string, page: number, pageSize: number, sortColumns:string, sortingDirection:string ) {
    try {
      let res: any;
      let selectedIds = '0';
      this.pageLoading = true;
      this.rulesDataSource.data = [];

      if(this.data.list.length > 0) {
        for (let sel of this.data.list) {
          selectedIds += `,${sel.id}`;
        }
      }

      if (!this.data.data) {
        if (this.rulesModal.remotePaginator) {

          if (this.data.parameter) {
            res = await lastValueFrom(this.productService.getApiData(this.rulesModal.service, this.data.parameter + `/${search}/${page}/${pageSize}/${selectedIds}/${sortColumns}/${sortingDirection}`));
          } else {
            res = await lastValueFrom(this.productService.getApiData(this.rulesModal.service, `${search}/${page}/${pageSize}/${selectedIds}/${sortColumns}/${sortingDirection}`));
          }

        } else {
          res = await lastValueFrom(this.productService.getApiData(this.rulesModal.service));
        }
      } else {
        res = { body: this.data.data };
      }

      if (res.body) {
        await this.setData(res);
        this.flagError = false;
      }

      this.pageLoading = false;
    } catch(error) {
      this.flagError = true;
      console.log('Hubo un error:', error);
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
        this.totalRulesSize = res.dataHeader.totalRecords;
      } else {
        this.totalRulesSize = res.body.length;
      }
    }

    await this.insertDataToTable();

    if (this.data.data) {
      this.paginator.length = this.totalRulesSize;
    } else {
      if (this.rulesModal.remotePaginator) {
        setTimeout(() => {
          this.paginator.length = this.totalRulesSize;
        });
      } else {
        setTimeout(() => {
          this.paginator.length = this.totalRulesSize - this.data.list.length;
        });
      }
    }
  }

  /**
   * Method to set the rest data in the element data
   * @param res variable with the array data
   */
  addToElementData(res: any[]) {
    this.dataList = []

    res.forEach((element: any) => {
      let obj: any = { id: element.id };

      this.rulesModal.columns?.forEach((col: any) => {
        obj[col.name] = this.setFieldValue(element, col.displayValue);
      });

      if (this.dataList.findIndex(x => x.id === obj.id) === -1) {
        this.dataList.push(obj);
        this.dataListAux.push(obj);
      }
    });
  }

  /**
   * Method that insert the information in mat table datasource
   */
  async insertDataToTable() {
    if (this.rulesModal.remotePaginator) {
      this.rulesDataSource.data = [...this.dataList];
      this.dataSourceAux.data = [...this.dataListAux];
    } else {
      this.rulesDataSource.data = this.dataList.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      )

      this.dataSourceAux.data = this.dataListAux.filter((item: any) =>
        this.data.list.every((element) => element.id != item.id)
      )
    }
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

    if(value === "null")
      value='';

    return value;
  }

  /*
    Method return all the elements selected
  */
  addElements() {
    return this.removeDuplicates(this.ruleSelection.selected, 'id');
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
    this.rulesPageSize = event.pageSize;
    this.currentRulesPage = event.pageIndex;

    if (this.rulesModal.remotePaginator) {
      if (this.searchRule.trim().toLowerCase().length >= 3) {
        await this.loadData(this.searchRule, this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
      } else {
        await this.loadData('0', this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
      }

      setTimeout(() => {
        this.paginator.length = this.totalRulesSize;
        this.paginator.pageIndex = this.currentRulesPage;
      });
    }
  }

  /* Metodos de selección */
  getDatasourceRow(row: ElementTableSearch): ElementTableSearch {
    return this.dataSourceAux.data.find(x => x.id === row.id) as ElementTableSearch;
  }

  isRowSelected(row: ElementTableSearch) {
    return this.ruleSelection.isSelected(this.getDatasourceRow(row))
  }

  toggleSelection(checked: boolean, row: ElementTableSearch) {
    if (checked) {
      this.selectRow(row);
    } else {
      this.deselectRow(row);
    }
  }

  selectRow(row: ElementTableSearch) {
    this.aditionalData = [];
    this.fields.clear();
    (<FormArray>this.ParametersForm.get('parameters')).clear();
    this.ruleSelection.select(this.getDatasourceRow(row));
    this.ParametersForm.get('rule')?.setValue(this.ruleSelection.selected[0]);
    let map = this.ParametersForm.get('rule')?.value.nmParameterList;

    let Jsonmap = JSON.parse(map);
    this.stepParameters = this.returnObj(Jsonmap);

    for(let x = 0; x < this.data.complementaryData.length; x++){
      this.aditionalData.push(this.data.complementaryData.value[x].fields);
    }

    for ( let rule of this.stepParameters) {
       let ObjForm = this.fb.group({
         name: this.fb.control(rule.name),
         value: this.fb.control('')
       });

       (<FormArray>this.ParametersForm.get('parameters'))?.push(ObjForm);
     }
  }

  public isObject(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  returnObj(obj:any){
    let arrayMap:any =[];
    for (let objKey of Object.keys(obj)){
      if (this.isObject(obj[objKey])){
        let arrayAux = this.returnObj(obj[objKey])
        arrayMap.concat(arrayAux);
      }else {
        let object ={name:objKey,type:obj[objKey],value:""};
        arrayMap.push(object);
      }
    }
    return(arrayMap);
  }

  deselectRow(row: ElementTableSearch) {
    this.ruleSelection.deselect(this.getDatasourceRow(row));
  }

  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;

    if (this.ruleSelection.selected.length === 0 || this.rulesDataSource.filteredData.length === 0) {
      return false;
    }

    for(let element of this.rulesDataSource.connect().value) {
      if (!this.isRowSelected(element)) {
        isAllDisplayedSelected = false;
        return isAllDisplayedSelected;
      }
    }
    return isAllDisplayedSelected;
  }

  isSomeDisplayedSelected(): boolean {
    let pageSize = this.rulesDataSource.filteredData.length;
    let countSelected = 0;

    pageSize = pageSize <= 5 ? pageSize : 5;

    for(let element of this.rulesDataSource.connect().value) {
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
    const itemsToBeUnselected = this.rulesDataSource.connect().value;
    itemsToBeUnselected.forEach((element: ElementTableSearch) => {
      this.deselectRow(element);
    });
  }

  selectRows() {
    const currentlyDisplayedRows = this.rulesDataSource.connect().value;

    currentlyDisplayedRows.forEach((element: ElementTableSearch) => {
      this.selectRow(element);
    });
  }

  /* Métodos de selección */
  //funtion to search and filter table
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim().toLowerCase().length >= 3) {
      if (this.rulesModal.remotePaginator) {
        this.reloadModalFirstRemotePage = true;
        this.currentRulesPage = 0;
        await this.loadData(filterValue, this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
        setTimeout(() => {
          this.paginator.length = this.totalRulesSize;
          this.paginator.pageIndex = this.currentRulesPage;
        });
      } else {
        this.rulesDataSource.filter = filterValue.trim().toLowerCase();
      }
    } else {
      if (this.rulesModal.remotePaginator && this.reloadModalFirstRemotePage) {
        this.reloadModalFirstRemotePage = false;
        this.currentRulesPage = 0;
        await this.loadData('0', this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
        setTimeout(() => {
          this.paginator.length = this.totalRulesSize;
          this.paginator.pageIndex = this.currentRulesPage;
        });
      } else if (!this.rulesModal.remotePaginator){
        this.rulesDataSource.filter = '';
        this.paginator.length = this.totalRulesSize;
        this.paginator.pageIndex = this.currentRulesPage;
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

    if (this.rulesModal.remotePaginator) {

      if(sort.direction === ''){
        this.sortColumns = "0";
        this.sortingDirection = "0";
      }else{
        this.sortColumns = obj.dbColumnName;
        this.sortingDirection = sort.direction;
      }

      if (this.searchRule.trim().toLowerCase().length >= 3) {
        await this.loadData(this.searchRule, this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
      } else {
        await this.loadData('0', this.currentRulesPage, this.rulesPageSize,this.sortColumns, this.sortingDirection);
      }

      setTimeout(() => {
        this.paginator.length = this.totalRulesSize;
        this.paginator.pageIndex = this.currentRulesPage;
      });

    }else{

      let data = this.rulesDataSource.data;

      data.sort((a:any, b:any) => {
        return sort.direction === 'asc' ? (a[obj.name] || '').toLowerCase().localeCompare((b[obj.name] || '').toLowerCase()) : (b[obj.name] || '').toLowerCase().localeCompare((a[obj.name] || '').toLowerCase())
      });

      this.rulesDataSource.data = data;
    }
  }

  ConfirmRules(){
     return {
       RulesForm: this.ParametersForm.value
     };
  }

  setParameters(field: any, rule: any) {
    (<FormArray>this.ParametersForm.get('parameters'))?.clear();
    
  let obj = this.fb.group({
     rule: rule,
     campo: field.businessCode
    });

    for (let valid of this.fields.value) {
      if (valid.rule === rule) {
        this.fields.removeAt(this.fields.value.findIndex((x: any) => x.rule === rule));
        break;
      }
    }

    this.fields.push(obj);
   
      // push final
    let ObjForm;

    for (let parameter of this.stepParameters) {
      for ( let rule of this.fields.value) {
       if (parameter.name === rule.rule  ) {
        ObjForm = this.fb.group({
          name: this.fb.control(parameter.name),
          value: this.fb.control(rule.campo)
        });
        (<FormArray>this.ParametersForm.get('parameters'))?.push(ObjForm);
       }
      }
    }

  }
}
