import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { search, SearchModal } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { ModalSearchComponent } from './modal-search.component';

class dialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
describe('ModalSearchComponent', () => {
  let component: ModalSearchComponent;
  let fixture: ComponentFixture<ModalSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ ModalSearchComponent ],
      providers: [
        ProductService,
        FormBuilder,
        DynamicDialogRef,
        DynamicDialogConfig,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSearchComponent);
    component = fixture.componentInstance;

    const res = {
      dataHeader: {
        code: 200,
        hasErrors: false
      },
      body: [{id: 1, name: 'test 1'}, {id: 2, name: 'test 2'}]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));

    component.dataSourceModal = {
      data: {
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
      }
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
it('should create without multiselect', () => {
    const fixtureTest = TestBed.createComponent(ModalSearchComponent);
    const componentTest = fixtureTest.componentInstance;

    componentTest.dataSourceModal = {
      data: {
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
        parameter: '1',
      }
    };

    const res = {
      dataHeader: {
        code: 500,
        hasErrors: true
      }
    };
    jest.spyOn(componentTest.productService, 'getApiData').mockReturnValue(of(res));

    fixtureTest.detectChanges();
    expect(componentTest).toBeTruthy();
  });

  it('getData with local data', () => {
    const fixtureTest = TestBed.createComponent(ModalSearchComponent);
    const componentTest = fixtureTest.componentInstance;

    componentTest.dataSourceModal = {
      data: {
        code: 'typeCurrencyControls',
        list: [ {id: 1, name: 'test 1'}, {id: 2, name: 'test 2'} ],
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
        parameter: '1',
      }
    };

    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];

    component.modal.remotePaginator = true;

    const res = {
      dataHeader: {
        code: 200,
        hasErrors: false,
        totalRecords: 1
      },
      body: {id: 1, name: 'test 1'}
    };
    jest.spyOn(componentTest.productService, 'getApiData').mockReturnValue(of(res));

    fixtureTest.detectChanges();
    expect(componentTest).toBeTruthy();
  });

  it('getData with local data and not parameter', () => {
    const fixtureTest = TestBed.createComponent(ModalSearchComponent);
    const componentTest = fixtureTest.componentInstance;

    componentTest.dataSourceModal = {
      data: {
        code: 'typeCurrencyControls',
        list: [ {id: 1, name: 'test 1'}, {id: 2, name: 'test 2'} ],
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
        subtitle: 'subtitle'
      }
    };

    component.modal = search.filter(
      (item: SearchModal) => item.code === 'typeCurrencyControls'
    )[0];

    component.modal.remotePaginator = true;

    fixtureTest.detectChanges();
    expect(componentTest).toBeTruthy();
  });

  it('getData with local data and filled data', () => {
    const fixtureTest = TestBed.createComponent(ModalSearchComponent);
    const componentTest = fixtureTest.componentInstance;

    componentTest.dataSourceModal = {
      data: {
        code: 'typeCurrencyControls',
        list: [ {id: 1, name: 'test 1'}, {id: 2, name: 'test 2'} ],
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
        parameter: '1',
        data: [ {id: 1, name: 'test 1'}, {id: 2, name: 'test 2'} ]
      }
    };

    fixtureTest.detectChanges();
    expect(componentTest).toBeTruthy();
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

  it('addElements', () => {
    expect(component.addElements()).toBeUndefined();
  });

  /*it('applyFilterGlobal', () => {
    let event = { target: { value: 'test' } } as any;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.modalSearchTable = new Table()

    component.dataSource = [obj];

    expect(component.applyFilterGlobal(event, 'contains')).toBeDefined();

    /*event = { target: { value: '' } } as any;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBeDefined();
  });*/

});
