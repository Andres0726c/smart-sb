import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

describe('SidenavPropertyProductComponent', () => {
  let component: SidenavPropertyProductComponent;
  let fixture: ComponentFixture<SidenavPropertyProductComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [SidenavPropertyProductComponent, ProductService, FormBuilder,
        {
          provide: MatDialog,
          useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(SidenavPropertyProductComponent);
  });

   it('should create', () => {
     expect(component).toBeTruthy();
   });

     
  it('Componente inicializado', () => {

    component.ngOnInit();

    expect(component).toBeDefined();

  });
});
