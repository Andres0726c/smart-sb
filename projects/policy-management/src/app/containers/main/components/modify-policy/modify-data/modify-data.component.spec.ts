import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder, Validators } from '@angular/forms';
import { ModifyDataComponent } from './modify-data.component';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModifyDataComponent', () => {
  let component: ModifyDataComponent;
  let fixture: ComponentFixture<ModifyDataComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ ModifyDataComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ProductService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDataComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dataTypeControls',()=>{

    let risk: any = component.fb.array([]);
    component.getFieldsControls(risk);
    component.dataTypeControls;

  });

  it('dataTypeControlsIfPolicyData',()=>{
    component.dataType='policyData';
    component.modifyData= component.fb.group({
      policyData: component.fb.array([])
    })
    component.dataTypeControls;

  });
  it('riskData',()=>{
    component.dataType='riskData';
    component.modifyData= component.fb.group({
      riskData: component.fb.array([
        component.fb.group({
          complementaryData: component.fb.array([])
        })
      ])
    })
    component.dataTypeControls;
  })

});

