import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RulesWizardComponent } from './rules-wizard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {SelectionModel} from "@angular/cdk/collections";
import {ElementTableSearch} from "../../../core/model/ElementTableSearch.model";
import {MatTableDataSource} from "@angular/material/table";
import {search, SearchModal} from "../../../core/model/SearchModal.model";
import { ProductService } from '../../../services/product.service';

class dialogMock {
  open() {
    return {
      afterClosed: () => of([{
        id         : 1,
        name       : 'name test return',
        description: 'description test return'
      }])
    };
  }
  close() {
    return {
      afterClosed: () => of({}),
    };
  }
  closeAll() { }
}

class toastMock {
  openFromComponent() {}
}

describe('RulesWizardComponent', () => {
  let component: RulesWizardComponent;
  let fixture: ComponentFixture<RulesWizardComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        FormBuilder,
        ProductService,
        RulesWizardComponent,
        { provide: MatDialog, useValue: new dialogMock() },
        { provide: MatDialogRef, useValue: new dialogMock() },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatSnackBar, useValue: new toastMock() }
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
    });

    component = TestBed.inject(RulesWizardComponent);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addElements', () => {
    expect(component.addElements()).toBeDefined();
  });

  it('ngAfterViewInit', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('closeAll', () => {
    expect(component.closeWizard()).toBeUndefined();
  });

  it('getDatasourceRow', () => {
    component.dataSourceAux.data = [{id: 1, name: 'test', description: 'test'}];
    expect(component.getDatasourceRow({id: 1, name: 'test', description: 'test'})).toBeDefined();
  });

  it('deselectRows', () => {
    component.ruleSelection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.ruleSelection.select(obj);

    component.rulesDataSource = new MatTableDataSource<any>([obj]);

    expect(component.deselectRows()).toBeUndefined();
  });

  it('isSomeDisplayedSelected', () => {
    component.ruleSelection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.ruleSelection.select(obj);

    component.rulesDataSource = new MatTableDataSource<any>([obj]);

    expect(component.isSomeDisplayedSelected()).toBeDefined();
  });

  it('setFieldValue', () => {
    let valueArray = ['name'];
    let obj = {
      name: 'name',
    };
    expect(component.setFieldValue(obj, valueArray)).toBeDefined();

    valueArray = ['element'];

    expect(component.setFieldValue(obj, valueArray)).toBeDefined();
  });

  it('transformContextData', () => {
    expect(component.transformContextData([{code:"prdct", description:"Producto"}])).toBeDefined();
  });

  it('SortData', () => {
    component.rulesModal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];

    component.rulesModal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'], dbColumnName:['name'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
        dbColumnName:['description']
      },
    ];

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.rulesDataSource = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'description',
        description: '2',
      },
    ]);

    component.rulesModal.remotePaginator = false;

    expect(
      component.sortData({ active: '{"displayValue": "name", "dbColumnName": "name"}', direction: 'asc' })
    ).toBeDefined();

    expect(
      component.sortData({ active: '{"displayValue": "description", "dbColumnName": "description"}', direction: 'asc' })
    ).toBeDefined();

    component.rulesModal.remotePaginator = true;

    expect(
      component.sortData({ active: '{"displayValue": "id", "dbColumnName": "id"}', direction: 'asc' })
    ).toBeDefined();

    expect(
      component.sortData({ active: '{"displayValue": "id", "dbColumnName": "id"}', direction: '' })
    ).toBeDefined();
  });

  it('applyFilter', async () => {
    component.rulesModal = search.filter(
      (item: SearchModal) => item.code === 'clausesControls'
    )[0];

    let event = { target: { value: 'test' } } as any;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.rulesDataSource = new MatTableDataSource<any>([obj]);

    component.applyFilter(event);

    expect(component.rulesDataSource.filter).toBeDefined();

    event = { target: { value: '' } } as any;

    component.applyFilter(event);

    expect(component.rulesDataSource.filter).toBeDefined();
  });

  it('insertDataToTable', async () => {
    component.rulesModal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.rulesModal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'], dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.data = {
      code: 'typeCurrencyControls',
      list: [obj],
      columns: [],
      contextData: [{code:"prdct", description:"Producto"}]
    };

    component.dataList = [
      {
        id: 2,
        name: 'name',
        description: '2',
      },
    ];

    expect(component.insertDataToTable()).toBeDefined();

    component.rulesModal.remotePaginator = true;

    expect(component.insertDataToTable()).toBeDefined();
  });

  it('pageChanged', async () => {
    component.rulesModal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.rulesModal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'],dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];
    component.rulesModal.remotePaginator = true;
    component.searchRule = 'testing';
    jest.useFakeTimers();
    component.pageChanged({ pageSize: 5, pageIndex: 1, length: 5 })
    jest.runOnlyPendingTimers();

    expect(
      component.paginator
    ).toBeUndefined();
  });

  it('loadData', async () => {
    component.rulesModal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.rulesModal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'],dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];
    component.rulesModal.remotePaginator = true;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.data = {
      code: 'typeCurrencyControls',
      list: [obj],
      columns: [],
      parameter: '1',
      contextData: [{code:"prdct", description:"Producto"}]
    };

    let res: any = {
      dataHeader: {
        hasErrors: false,
        totalRecords: 1
      },
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        }
      ]
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue( of(res) );

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.data = {
      code: 'typeCurrencyControls',
      list: [obj],
      columns: [],
    };

    res = {
      dataHeader: {
        hasErrors: false,
        totalRecords: 1
      },
      body: {
        id: 1,
        name: 'name test return',
        description: 'description test return',
      }
    };

    jest.spyOn(productService, 'getApiData').mockReturnValue( of(res) );
    component.rulesModal.remotePaginator = true;

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.rulesModal.remotePaginator = false;

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.data = {
      code: 'typeCurrencyControls',
      list: [obj],
      columns: [],
      parameter: '1',
      data: [obj],
      contextData: [{code:"prdct", description:"Producto"}]
    };

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.rulesModal.remotePaginator = true;

    expect(
      component.pageChanged({ pageSize: 5, pageIndex: 1, length: 5 })
    ).toBeDefined();
  });

  it('ngOnInit', async () => {
    component.data = {
      code: 'typeCurrencyControls',
      list: [],
      columns: [
        { name: 'name', header: 'Nombre', displayValue: ['Columna name'], dbColumnName:['nmLabel'] },
        {
          name: 'description',
          header: 'Descripción',
          displayValue: ['Columna description'],
          dbColumnName:['nmLabel']
        },
      ],
      title: 's',
      subtitle: 'subtitle',
      multiSelect: true,
      parameter: '1',
      contextData: [{code:"prdct", description:"Producto"}]
    };

    expect(component.ngOnInit()).toBeDefined();

    component.data.multiSelect = undefined;

    expect(component.ngOnInit()).toBeDefined();

    jest.spyOn(component, 'loadData').mockImplementation(() => { throw new Error('error'); });

    expect(component.ngOnInit()).toBeDefined();
  });

  it('setParameters', () => {

    component.fields = new FormArray([
      new FormGroup({
        rule: new FormControl("idProduct"),
        campo: new FormControl('MONEDA'),
      })
    ]);

    component.stepParameters = [{name: "idProduct",type: "number",value: ""}]
    expect(component.setParameters({code:"prdct", description:"Producto", businessCode:"prdct"},"idProduct")).toBeUndefined();

  });

  it('toggleSelection', () => {
    const row: ElementTableSearch = {
      id: 1,
      name: 'test'
    }
    expect(component.toggleSelection(false, row)).toBeUndefined();

  });

  it('isObject', () => {
    expect(component.isObject({id: 1})).toBeTruthy();

  });

  it('returnObj', () => {
    expect(component.returnObj({id: 1, object: {id: 1}, array: [{id: 1}, {id: 2}]})).toBeDefined();

  });

  it('isAllDisplayedSelected', () => {
    component.ruleSelection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.ruleSelection.select(obj);

    expect(component.isAllDisplayedSelected()).toBeDefined();

    component.rulesDataSource = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);

    expect(component.isAllDisplayedSelected()).toBeDefined();
  });

  it('selectRow', () => {
    let row: any = {
      "id": 12,
      "name": "Validar plan comercial del producto",
      "description": "Validar plan comercial del producto",
      "cdRuleType": "Validación",
      "endPoint": "/emisor_orquestador/v1/businessplans/validate",
      "nmParameterList": "{\"idProduct\": \"number\", \"nameBusiness\": \"string\"}",
      "cdBusinessCode": "RVL_PLC",
      "urlBs": "https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev"
    };

    component.ParametersForm =  new FormGroup({
      rule: new FormControl([new FormControl(row)]),
      parameters: new FormArray([])
    });

    component.data.complementaryData = new FormArray([new FormControl(row)]);

    component.rulesDataSource = new MatTableDataSource<ElementTableSearch>([row]);
    component.dataSourceAux = new MatTableDataSource<ElementTableSearch>([row]);
    component.ruleSelection = new SelectionModel<ElementTableSearch>(true, []);
    component.ruleSelection.select(component.dataSourceAux.data[0]);

    const parameters = (<FormArray>component.ParametersForm.get('parameters'));
    const spyClearFields = jest.spyOn(component.fields, 'clear').mockImplementation(() => undefined);
    const spyParametersFormClear = jest.spyOn(parameters, 'clear').mockImplementation(() => undefined);

    component.selectRow(row);

    expect(spyClearFields).toHaveBeenCalled();
    expect(spyParametersFormClear).toHaveBeenCalled();
  });

});
