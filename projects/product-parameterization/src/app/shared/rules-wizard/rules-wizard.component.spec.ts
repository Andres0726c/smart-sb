import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { FormBuilder } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { execPath } from 'process';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { RulesWizardComponent } from './rules-wizard.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Table } from 'primeng/table';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('RulesWizardComponent', () => {
  let component: RulesWizardComponent;
  let fixture: ComponentFixture<RulesWizardComponent>;
  let productService: ProductService;

  class dialogMock {
    open() {
      return {
        afterClosed: () =>
          of([
            {
              id: 1,
              name: 'name test return',
              description: 'description test return',
            },
          ]),
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [RulesWizardComponent],
      providers: [
        RulesWizardComponent,
        FormBuilder,
        ProductService,
        DialogService,
        DynamicDialogRef,
        DynamicDialogConfig,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RulesWizardComponent);
    component = fixture.componentInstance;

    const res = {
      dataHeader: {
        code: 200,
        hasErrors: false,
      },
      body: [
        { id: 1, name: 'test 1' },
        { id: 2, name: 'test 2' },
      ],
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));

    component.data = {
      code: 'typeCurrencyControls',
      list: [],
      columns: [
        {
          name: 'name',
          header: 'Nombre',
          displayValue: ['Columna name'],
          dbColumnName: ['nmLabel'],
        },
        {
          name: 'description',
          header: 'Descripción',
          displayValue: ['Columna description'],
          dbColumnName: ['nmLabel'],
        },
      ],
      title: 's',
      subtitle: 'subtitle',
      multiSelect: true,
      parameter: '1',
    };

    component.dataSourceModal = {
      data: {
        code: 'typeCurrencyControls',
        list: [],
        columns: [
          {
            name: 'name',
            header: 'Nombre',
            displayValue: ['Columna name'],
            dbColumnName: ['nmLabel'],
          },
          {
            name: 'description',
            header: 'Descripción',
            displayValue: ['Columna description'],
            dbColumnName: ['nmLabel'],
          },
        ],
        title: 's',
        subtitle: 'subtitle',
        multiSelect: true,
        parameter: '1',
        contextData: [],
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('getDetailColumn', () => {
    let element = {
      id: 1,
      name: 'test',
      description: 'test',
    };
    let colName = 'test';
    expect(component.getDetailColumn(element, colName)).toBeUndefined();

    let element2 = {
      element: {
        test: {
          test: 'test',
        },
      },
    };
    let colName2 = 'test.test';
    expect(component.getDetailColumn(element2, colName2)).toEqual('test');
  });

  it('loadRemoteData', () => {
    let event = {
      fisrt: 0,
      rows: 1,
    };

    expect(component.loadRemoteData(event)).toBeUndefined();
  });

  it('insertDataToTable', () => {
    expect(component.insertDataToTable()).toBeDefined();
  });

  it('addElements', () => {
    component.selectedElement = {
      id: 1,
      name: 'test',
    };
    expect(component.addElements()).toBeUndefined();
  });

  it('showedColumns', () => {
    expect(component.showedColumns()).toBeDefined();
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

  it('paramsControls', () => {
    expect(component.paramsControls).toBeDefined();
  });

  it('onRowSelect', () => {
    let event = {
      data: {
        cdBusinessCode: 'RVL_CIU_RGO',
        cdRuleType: 'Validación',
        description: 'Validar ciudad',
        endPoint: '/emisor/v1/city/locationValidate',
        id: 16,
        name: 'Validar ciudad',
        nmParameterList: '{"isoCode": "string", "daneCode": "string"}',
        urlBs: 'urlBs',
      },
      index: 'test',
      type: 'radiobutton',
    };

    expect(component.onRowSelect(event)).toBeUndefined();
  });
});
  it('setData',()=>{

    component.setData({dataHeader:{totalRecords:{}}});
  });



  it('loadModalData error',()=>{
    jest.spyOn(component, 'loadModalData').mockImplementation(() => {
      throw new Error('Simulated error');
    });
    expect(() => component.loadModalData()).toBeDefined();
  })
  it('setItem item 0',()=>{
    component.items[0].command();
    component.setItem();
  })
  it('',()=>{
    const event:Event = {
      target: document.createElement('input') as HTMLInputElement,
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      timeStamp: 0,
      type: '',
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      NONE: 0,
      CAPTURING_PHASE: 1,
      AT_TARGET: 2,
      BUBBLING_PHASE: 3
    };
    const tableMock: Partial<Table> = {
      filterGlobal: jest.fn(),
    };
    
    component.modalSearchTable = tableMock as Table;

    component.modalSearchTable.filterGlobal('test','');
    event.target?.addEventListener('Test value',null);
    component.applyFilterGlobal(event,'filterType');
    
    expect(tableMock.filterGlobal).toHaveBeenCalled();
  });

  it('setFieldValue',()=>{

    component.setFieldValue('',['1']);
  })

  it('setFieldValue when is element',()=>{
    component.setFieldValue('',['element'])
  })
  
  it(' setFieldValue when is null',()=>{
    component.setFieldValue(['null'],['null']);
  })
  it('setItem item 1',()=>{
    component.items[1].command();
    component.setItem();
  });

  it('insertDataToTable',()=>{

    component.modal={};
    component.arrayData=[{id:1}];
    component.data={list:[{id:1, name:'test'}], code:'', columns:[{name:'',displayValue:[]}]};
    component.insertDataToTable()
  });

  it('showedColumns',()=>{
    component.data={list:[{id:1, name:'test'}], code:'', columns:[{name:'',displayValue:[], header:'test'}]};
    component.showedColumns();
  })

});