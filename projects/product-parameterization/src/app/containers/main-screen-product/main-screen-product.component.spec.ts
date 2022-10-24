import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/product.service';
import { MainScreenProductComponent } from './main-screen-product.component';
import { of } from 'rxjs';
class toastMock {
  openFromComponent() {} 
}

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
describe('MainScreenProductComponent', () => {
  let component: MainScreenProductComponent;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [MainScreenProductComponent, ProductService, FormBuilder,  {
        provide: MatDialog,
        useValue: new DialogMock()
      },
      {
        provide: MatSnackBar,
        useValue: new toastMock()
      }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(MainScreenProductComponent);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('openEditProductDialog', () => {
    expect(component.openEditProductDialog('')).toBeUndefined();
  });

  it('openModalCompany', () => {
    expect(component.openModalCompany()).toBeUndefined();
  });

  it('openNewProductDialog', () => {
    expect(component.openNewProductDialog()).toBeUndefined();
  });
});
