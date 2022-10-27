import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ClausesProductComponent } from './clauses-product.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('ClausesProductComponent', () => {
  let component: ClausesProductComponent;
  let fixture: ComponentFixture<ClausesProductComponent>;
  class dialogMock {
    open() {
      return {
        afterClosed: () => of([{
          id         : 1,
          name       : 'name test return',
          description: 'description test return'
        }])
      };
    }
  }
  class toastMock {
    openFromComponent() {} 
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [],
      providers: [ClausesProductComponent,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ClausesProductComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

});
