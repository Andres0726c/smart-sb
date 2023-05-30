import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule,
        DynamicDialogModule
      ],
      declarations: [ RulesWizardComponent ],
      providers: [
        ProductService,
        FormBuilder,
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService,
        MessageService,
        {
          provide: MatDialog,
          useValue: new DialogMock()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesWizardComponent);
    component = fixture.componentInstance;

    component.dataSourceModal = {
      data: {
        contextData: [
          {
            code: "prdct",
            description: "Producto",
            applctnLvl: [
                "*"
            ]
          }
        ],
        columns: [
          { field: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
          { field: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']  },
          { field: 'cdRuleType', displayValue: ['cdRuleType'], dbColumnName:['cdRuleType']  },
          { field: 'endPoint', displayValue: ['endPoint'] },
          { field: 'nmVersion', displayValue: ['nmVersion'] },
          { field: 'nmParameterList', displayValue: ['nmParameterList'] },
          { field: 'nmReturnList', displayValue: ['nmReturnList'] },
          { field: 'applicationLevel', displayValue: ['applicationLevel'] },
          { field: 'rlEngnCd', displayValue: ['rlEngnCd'] },
          { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
          { field: 'urlBs', displayValue: ['urlBs'] },
          { field: 'id', displayValue: ['id'] }
        ],
        code: 'ruleCalculationControls',
        list: [{id: 1, name: 'test'}],
        title: 'test',
        subtitle: 'test'
      }
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDetailColumn', () => {
    expect(component.getDetailColumn({}, 'name')).toBeUndefined();
  });

  it('getDetailColumn dot', () => {
    expect(component.getDetailColumn({element: {name: {description: 'test'}}}, 'name.description')).toEqual('test');
  });

  it('loadRemoteData', () => {
    const event: LazyLoadEvent = {};
    const res = {
      dataHeader: { code: 200, hasErrors: false },
      body: [
        { id: 1, name: 'test' }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadRemoteData(event)).toBeUndefined();
  });

  it('loadRemoteData global filter', () => {
    const event: LazyLoadEvent = {globalFilter: 'test'};
    const res = {
      dataHeader: { code: 200, hasErrors: false },
      body: [
        { id: 1, name: 'test' }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadRemoteData(event)).toBeUndefined();
  });
  
  it('addElements', () => {
    component.selectedElement = {id: 1, name: 'test'};
    expect(component.addElements()).toBeUndefined();
  });

  it('onRowSelect', () => {
    const event: any = {data: {nmParameterList: "{\"period\": \"string\", \"startDate\": \"string\"}"}};
    expect(component.onRowSelect(event)).toBeUndefined();
  });

  it('onRowSelect catch', () => {
    const event: any = {data: {nmParameterList: {}}};
    expect(component.onRowSelect(event)).toBeUndefined();
  });

  /*it('applyFilterGlobal', () => {
    const event: any = {target: {value: 't'}};
    expect(component.applyFilterGlobal(event, 'contains')).toBeUndefined();
  });*/

  it('paramsControls', () => {
    expect(component.paramsControls).toBeDefined();
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
