import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
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

  it('Componente inicializado', () => {
    component.productService.initialParameters = new FormGroup({})
    component.ngOnInit();
    expect(component).toBeDefined();

  });

  it('validateShow modification process',()=>{
    component.formProcess = new FormGroup({
      modification: new FormGroup({enabled:new FormControl(true)})
    })
    component.validateShow(component.menus[1])
    expect(component.menus[1].showEnable).toEqual(false)
  })

  it('validateShow doesnt find modification process into formProcess',()=>{
    component.formProcess = new FormGroup({})
    component.validateShow(component.menus[1])
    expect(component.menus[1].show).toEqual(false)
  })

  it('validateShow emision process',()=>{
    component.validateShow(component.menus[0])
    expect(component.menus[0].show).toEqual(false)
  })
});
