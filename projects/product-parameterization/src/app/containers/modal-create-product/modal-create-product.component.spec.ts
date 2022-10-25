
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalCreateProductComponent } from './modal-create-product.component';
import {
  FormBuilder, FormGroup, Validators,
  FormControl
} from '@angular/forms';

import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ModalEditProductService } from '../modal-edit-product/services/modal-edit-product.service';


class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
class ProductServiceMock {
  initialParameters = new FormGroup({
    productName: new FormControl(),
    commercialName: new FormControl()
  })

  getProduct() {
    return of(true);
  }
}

class EditServiceMock {
  validProduct() {
    return of(true);
  }
  validCode() {
    return of(true);
  }
}

describe('ModalCreateProductComponent', () => {
  let component: ModalCreateProductComponent;
  let service: ProductService;
  let serviceEdit: ModalEditProductService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [],
      providers: [ModalCreateProductComponent, {
        provide: MAT_DIALOG_DATA,
        useValue: {}
      },
        {
          provide: MatDialogRef,
          useValue: {
            close: jest.fn()
          }
        }, FormBuilder,
        {
          provide: MatDialog,
          useValue: new DialogMock()
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
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
        }, {
          provide: ProductService,
          useValue: new ProductServiceMock()
        },
        {
          provide: ModalEditProductService,
          useValue: new EditServiceMock()
        }],

      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ModalCreateProductComponent);
    service = TestBed.inject(ProductService);
  });

  it('validar campos correctos', () => {
    let call = jest.spyOn(component, 'createProduct');
    component.service.initialParameters = new FormGroup({});
    component.formData.get('name')?.setValue('Vida Individual');
    component.formData
      .get('comercialName')
      ?.setValue('Vida Individual para disfrutar la vida');
    component.data.comercialName = "Vida Individual para disfrutar la vida";
    component.data.name = "Vida Individual";
    component.createProduct(component.data);
    expect(call).toBeCalled();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    let call = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit()
    expect(call).toBeCalled()
  });


  it('createProduct', () => {
    const product = {
      name: 'test',
      comercialName: 'test',
      product: {}
    }
    component.formData = new FormGroup({
      name: new FormControl('test'),
      comercialName: new FormControl('test')
    });
    component.data.name = 'copy';
    component.data.product = product;
    jest.spyOn(service, 'getProduct').mockReturnValue(of(true));
    expect(component.createProduct(product)).toBeUndefined();
    component.data.name = 'test';
    expect(component.createProduct(product)).toBeUndefined();
  });

  it('validProduct', async() => {
    const product = {
      name: 'test',
      comercialName: 'test',
      product: {}
    }
   // jest.spyOn(serviceEdit, 'validProduct').mockReturnValue(of(true));
   // jest.spyOn(serviceEdit, 'validCode').mockReturnValue(of(true));
    expect(component.validProduct(product)).toBeDefined();
  });

  it('modalCopy', async() => {
    component.data.name = 'copy';
    expect(component.modalCopy()).toBeUndefined();
    component.data.name = 'copytest';
    expect(component.modalCopy()).toBeUndefined();
  });

  it('hasError Ok', () => {
    expect(component.hasError('name', 'required')).toBeTruthy();
  });
});
