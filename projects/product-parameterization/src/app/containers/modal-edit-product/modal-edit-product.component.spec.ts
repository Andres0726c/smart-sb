import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

import { ModalEditProductComponent } from './modal-edit-product.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalEditProductService } from './services/modal-edit-product.service';
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
class toastMock {
  openFromComponent() {}
}
describe('ModalEditProductComponent', () => {
  let component: ModalEditProductComponent;
  let service: ProductService;
  let initialDataEditProduct: ModalEditProductService;
  let fixture: ComponentFixture<ModalEditProductComponent>;

  beforeEach(async () => {
   TestBed.configureTestingModule({
    imports: [MatDialogModule, FormsModule, HttpClientModule,HttpClientTestingModule],
    declarations: [],
    providers: [ModalEditProductComponent,{
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MatDialogRef,
      useValue: {
        close:jest.fn()
      }
    },FormBuilder,
    {
      provide: Router,
      useValue: {
        navigate:jest.fn()
      }
    },
    {
      provide: FormGroup,
      useValue: {}
    },
    {
      provide: Validators,
      useValue: {}
    },
    {
      provide: FormControl,
      useValue: {}
    },
    {
      provide: MatDialog,
      useValue: new dialogMock(),
    },
    {
      provide: MatSnackBar,
      useValue: new toastMock()
    },
    ProductService,
    ModalEditProductService
    ],

    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  });
  component = TestBed.inject(ModalEditProductComponent);
  service = TestBed.inject(ProductService);
  initialDataEditProduct = TestBed.inject(ModalEditProductService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick', () => {
    expect(component.onNoClick()).toBeUndefined();
  });

  it('addProduct', async() => {
    component.selection = new SelectionModel<any>(false, []);
    component.element = {
      productJson: '',
    };
    jest.spyOn(service, 'getProduct').mockReturnValue(of(true));

    expect(component.addProduct()).toBeDefined();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('addItem', () => {
    let result = {
      body: [{
        product:'nuevo',
        ramo:'Hogar'
      }]

    }
    expect(component.addItem(result)).toBeUndefined();
  });

  it('change input filter', () => {
    jest.spyOn(component, 'applyFilter').mockResolvedValue()
    component.paginatorProductTable = MatPaginator.prototype
    let event = { target: { value: 'test' } } as any;
    component.changeFilter(event);
    expect(component.filterInput).toEqual('test')
  });

  it('applyFilter', () => {
    const spy =jest.spyOn(component, 'getProductsSearch').mockResolvedValue()
    component.applyFilter()
    expect(spy).toHaveBeenCalled()
    expect(component.isLoadingInput).toBeTruthy()
  });

  it('change page doenst call applyFilter', () => {
    const page: PageEvent = {pageIndex:0, pageSize:0, length:0}
    component.totalRecords = 6
    component.products = [1,2,3,4,5,6]
    component.dataSource = new MatTableDataSource(component.products)
    component.changePage(page)
    expect(component.dataSource.data.length).toEqual(5)
  });

  it('change page calls applyFilter', () => {
    const spy =jest.spyOn(component, 'applyFilter').mockResolvedValue()
    const page: PageEvent = {pageIndex:0, pageSize:0, length:0}
    component.totalRecords = 10
    component.products = [1,2,3,4,5]
    component.changePage(page)
    expect(spy).toHaveBeenCalled()
  });

  it('selectInsurenceLine Ok', () => {
    let ramo = {
      businessCode: '118',
      dsDescription: 'Ramo accidentes personales individ.',
      financialCode: '27',
      id: 55,
      idStatus: 1,
      nmName: 'Accidentes personales individ.',
    };
    component.ramo = [ramo];
    const spy =jest.spyOn(component, 'getProductsSearch').mockResolvedValue()
    component.selectInsurenceLine(55)
    expect(spy).toHaveBeenCalledWith(55);
    expect(component.insuranceLine).toEqual(55);
  });

  it('getProductsSearch Ok', () => {
    const response = {dataHeader:{hasErrors:false, totalRecords:20}}
    jest.spyOn(initialDataEditProduct, 'getDataEdit').mockReturnValue(of(response))
    jest.spyOn(component, 'addItem').mockReturnValue()
    component.getProductsSearch(55)
    expect(component.totalRecords).toBeDefined()
  });

  it('getProductsSearch Fail', () => {
    jest.spyOn(initialDataEditProduct, 'getDataEdit').mockReturnValue(of(new Error('error')));
    component.getProductsSearch(55,'')
    expect(component.flagServiceError).toBeFalsy();
  });

  it('getDataInsuranceLine  Ok', () => {
    const response = {dataHeader:{hasErrors:false}}
    jest.spyOn(initialDataEditProduct, 'getDataEdit').mockReturnValue(of(response))
    component.getDataInsuranceLine ()
    expect(component.ramo).toBeDefined();
  });

  it('getDataInsuranceLine  Fail', () => {
    const spy =jest.spyOn(initialDataEditProduct, 'getDataEdit').mockReturnValue(of(new Error('error')));
    component.getDataInsuranceLine ()
    expect(component.flagServiceError).toBeDefined();
  });

  it('SortData', () => {
    let obj = {
      product: 'producto',
      ramo: 'ramo',
    };

    component.dataSource = new MatTableDataSource<any>([
      obj,
      {
        product: 'producto1',
        ramo: 'ramo1',
      },
    ]);

    expect(
      component.sortData({ active: 'product', direction: 'asc' })
    ).toBeUndefined();
    expect(
      component.sortData({ active: 'ramo', direction: 'asc' })
    ).toBeUndefined();
    expect(
      component.sortData({ active: 'id', direction: 'asc' })
    ).toBeUndefined();

  });

  it('compare', () => {
    expect(component.compare(1, 1, true)).toBeDefined();
  });

  it('hasError Ok', () => {
    expect(component.hasError('ramo', 'required')).toBeTruthy();
  });
  it('addModal Ok', () => {
    component.element = {
      productJson: '',
    };
    expect(component.addModal()).toBeUndefined();
  });

});


