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
import { ModalCreateProductComponent } from '../modal-create-product/modal-create-product.component';

import { ModalEditProductComponent } from './modal-edit-product.component';
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
  let fixture: ComponentFixture<ModalEditProductComponent>;

  beforeEach(async () => {
   TestBed.configureTestingModule({
    imports: [MatDialogModule, FormsModule, HttpClientModule,HttpClientTestingModule],
    declarations: [],
    providers: [ModalEditProductComponent, {
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
    ProductService
    ],
    
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  });
  component = TestBed.inject(ModalEditProductComponent);
  service = TestBed.inject(ProductService);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick', () => {
    expect(component.onNoClick()).toBeUndefined();
  });
  
  it('addProduct', () => {
    component.selection = new SelectionModel<any>(false, []);
    component.element = {
      productJson: '',
    };
    jest.spyOn(service, 'getProduct').mockReturnValue(of(true));

    expect(component.addProduct()).toBeUndefined();
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

  it('applyFilter', () => {
    let event = { target: { value: 'test' } } as any;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.dataSource = new MatTableDataSource<any>([obj]);

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('test');

    event = { target: { value: '' } } as any;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('');
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
    expect(component.selectInsurenceLine(55)).toBeUndefined();
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


