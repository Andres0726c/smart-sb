import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';
import { AngularMaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

describe('ModificationTechnicalControlComponent', () => {
  let dataSource: any;
  let event: any;
  let component: ModificationTechnicalControlComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [],
      providers: [
        ModificationTechnicalControlComponent,
        ProductService,
        FormsModule,
        FormBuilder
      ],
      schemas: [],
    });
    component = TestBed.inject(ModificationTechnicalControlComponent);
    dataSource = { filter: '', filterPredicate: jest.fn() };
    event = {target: {value: 'ejemplo'}};
  });

  /*it('should filter data based on input value', () => {
    component.applyFilter(event);

    expect(dataSource.filter).toEqual('ejemplo');
    expect(dataSource.filterPredicate).toHaveBeenCalled();
  });

  it('should clear filter if input value is less than 3 characters', () => {
    event.target.value = 'a';
    component.applyFilter(event);

    expect(dataSource.filter).toEqual('');
    expect(dataSource.filterPredicate).not.toHaveBeenCalled();
  });*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
