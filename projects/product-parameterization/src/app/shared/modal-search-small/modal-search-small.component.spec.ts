import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchSmallComponent } from './modal-search-small.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SearchModal, search } from '../../core/model/SearchModal.model';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SelectionModel } from '@angular/cdk/collections';
import { InitialParametersService } from '../../containers/initial-parameters/services/initial-parameters.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';

class dialogMock {
  close() {
    return {
      afterClosed: () => of({}),
    };
  }
}

describe('ModalSearchSmallComponent', () => {
  let component: ModalSearchSmallComponent;
  let fixture: ComponentFixture<ModalSearchSmallComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        ModalSearchSmallComponent,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: MatTableDataSource,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: new dialogMock(),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: InitialParametersService,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ModalSearchSmallComponent);
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

  it('onNoClick', () => {
    expect(component.onNoClick()).toBeUndefined();
  });

  it('addElements', () => {
    expect(component.addElements()).toBeDefined();
  });

  it('removeDuplicates', () => {
    expect(
      component.removeDuplicates(
        [
          { id: 1, name: '' },
          { id: 1, name: '' },
          { id: 2, name: '' },
        ],
        'id'
      )
    ).toBeDefined();
  });

  it('isAllDisplayedSelected', () => {
    component.selection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.selection.select(obj);

    expect(component.isAllDisplayedSelected()).toBeDefined();

    component.dataSource = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);

    expect(component.isAllDisplayedSelected()).toBeDefined();
  });

  it('isAllSelected', () => {
    expect(component.isAllSelected()).toBeDefined();
  });

  it('masterToggle', () => {
    expect(component.masterToggle()).toBeUndefined();
  });

  it('compare', () => {
    expect(component.compare(1, 1, true)).toBeDefined();
  });

  it('getDatasourceRow', () => {
    component.dataSourceBk.data = [{id: 1, name: 'test', description: 'test'}];
    expect(component.getDatasourceRow({id: 1, name: 'test', description: 'test'})).toBeDefined();
  });

  it('deselectRows', () => {
    component.selection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.selection.select(obj);

    component.dataSource = new MatTableDataSource<any>([obj]);

    expect(component.deselectRows()).toBeUndefined();
  });

  it('isSomeDisplayedSelected', () => {
    component.selection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.selection.select(obj);

    component.dataSource = new MatTableDataSource<any>([obj]);

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

  it('selectRows', () => {
    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.dataSource = new MatTableDataSource<any>([obj]);

    expect(component.selectRows()).toBeUndefined();
  });

  it('addToElementData', () => {
    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.modal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'], dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];

    component.arrayData = [
      {
        id: 2,
        name: 'name',
        description: '2',
      },
    ];
    expect(component.addToElementData([obj])).toBeUndefined();
  });

  it('SortData', () => {
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];

    component.modal.columns = [
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

    component.dataSource = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'description',
        description: '2',
      },
    ]);

    component.modal.remotePaginator = false;

    expect(
      component.sortData({ active: '{"displayValue": "name", "dbColumnName": "name"}', direction: 'asc' })
    ).toBeDefined();

    expect(
      component.sortData({ active: '{"displayValue": "description", "dbColumnName": "description"}', direction: 'asc' })
    ).toBeDefined();

    expect(
      component.sortData({ active: '{"displayValue": "id", "dbColumnName": "id"}', direction: 'asc' })
    ).toBeDefined();
  });

  it('applyFilter', async () => {
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'clausesControls'
    )[0];

    let event = { target: { value: 'test' } } as any;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.dataSource = new MatTableDataSource<any>([obj]);

    component.applyFilter(event);

    expect(component.dataSource.filter).toBeDefined();

    event = { target: { value: '' } } as any;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBeDefined();
  });

  it('insertDataToTable', async () => {
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.modal.columns = [
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
    };

    component.arrayData = [
      {
        id: 2,
        name: 'name',
        description: '2',
      },
    ];

    expect(component.insertDataToTable()).toBeDefined();

    component.modal.remotePaginator = true;

    expect(component.insertDataToTable()).toBeDefined();
  });

  it('pageChanged', async () => {
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.modal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'],dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];
    component.modal.remotePaginator = false;

    expect(
      component.pageChanged({ pageSize: 5, pageIndex: 1, length: 5 })
    ).toBeDefined();
  });

  it('loadData', async () => {
    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];
    component.modal.columns = [
      { name: 'name', header: 'Nombre', displayValue: ['Columna name'],dbColumnName:['nmLabel'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['Columna description'],
        dbColumnName:['nmLabel']
      },
    ];
    component.modal.remotePaginator = true;

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
    component.modal.remotePaginator = true;

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.modal.remotePaginator = false;

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.data = {
      code: 'typeCurrencyControls',
      list: [obj],
      columns: [],
      parameter: '1',
      data: [obj],
    };

    expect(component.loadData('0', 0, 0,'0','0')).toBeDefined();

    component.modal.remotePaginator = true;

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
    };

    expect(component.ngOnInit()).toBeDefined();

    component.data.multiSelect = undefined;

    expect(component.ngOnInit()).toBeDefined();

    jest.spyOn(component, 'loadData').mockImplementation(() => { throw new Error('error'); });
    expect(component.ngOnInit()).toBeDefined();
  });

  it('toggleSelection Ok', () => {
    const obj: ElementTableSearch = {
      id: 1,
      name: 'test',
      description: 'test'
    }
    expect(component.toggleSelection(true, obj)).toBeUndefined();
    expect(component.toggleSelection(false, obj)).toBeUndefined();
  });
});
