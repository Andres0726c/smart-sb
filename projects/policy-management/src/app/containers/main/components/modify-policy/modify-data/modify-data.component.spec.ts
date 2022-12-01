import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormBuilder, Validators } from '@angular/forms';
import { ModifyDataComponent } from './modify-data.component';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

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
      ]
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
    component.test;
    component.getFieldsControls(risk);
    component.dataTypeControls;
    
  });

  xit('dataTypeControlsIfPolicyData',()=>{

    //component.modifyData.setControl(Validators.required);
    component.dataType='policyData';
    component.dataTypeControls;
    
  });
});

