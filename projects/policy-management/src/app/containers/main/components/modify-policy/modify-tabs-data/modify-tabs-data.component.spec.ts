import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ModifyTabsDataComponent } from './modify-tabs-data.component';

describe('ModifyTabsDataComponent', () => {
  let component: ModifyTabsDataComponent;
  let fixture: ComponentFixture<ModifyTabsDataComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ ModifyTabsDataComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ProductService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTabsDataComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('ngOnChanges',()=>{

    let risk: any = component.fb.array([]);
    component.getRiskComplementaryData(risk);
    component.ngOnChanges();
  });
  xit('ngOnAfterViewInit',()=>{

    let risk: any = component.fb.array([]);
    component.riskControls;
    component.riskDataControls;
    component.ngOnAfterViewInit();
  });

});
