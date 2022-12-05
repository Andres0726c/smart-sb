import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../../core/services/product/product.service';

import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';

describe('ReactiveGroupFieldsComponent', () => {
  let component: ReactiveGroupFieldsComponent;
  let fixture: ComponentFixture<ReactiveGroupFieldsComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      declarations: [ ReactiveGroupFieldsComponent ],
      providers: [
        FormBuilder,
        FormGroup,
        { provide: ProductService,
        useValue: formBuilderMock },
        
      ]
    });
    component = TestBed.inject(ReactiveGroupFieldsComponent);
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });
  
  xit('getFieldsControls', () => {
    let fields = new FormGroup({});
    component.getFieldsControls(fields);
    expect(component.getFieldsControls(fields)).toBeUndefined();
  });

});
