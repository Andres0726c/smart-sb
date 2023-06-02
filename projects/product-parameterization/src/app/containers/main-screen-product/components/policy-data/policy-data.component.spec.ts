import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDataComponent } from './policy-data.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';

describe('PolicyDataComponent', () => {
  let component: PolicyDataComponent;
  let fixture: ComponentFixture<PolicyDataComponent>;

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
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PolicyDataComponent ],
      providers: [
        PolicyDataComponent,
        FormBuilder,
        ProductService,
        DialogService,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ]
    });
    component = TestBed.inject(PolicyDataComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
