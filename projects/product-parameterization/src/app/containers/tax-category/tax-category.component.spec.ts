import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { TaxCategoryComponent } from './tax-category.component';

class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of([
          {
            id: 1,
            name: 'name test return',
            description: 'description test return',
            details: 'details test return',
          },
        ]),
    };
  }
}

class toastMock {
  openFromComponent() {}
}

describe('TaxCategoryComponent', () => {
  let component: TaxCategoryComponent;
  let fixture: ComponentFixture<TaxCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        TaxCategoryComponent,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(TaxCategoryComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('openToAdd Ok', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('deleteItem Ok', () => {
    let element = { id: 1, name: 'data 1', description: 'description 1' };
    expect(component.deleteItem(element)).toBeUndefined();
  });

  it('getSuccessStatus Ok', () => {
    expect(component.getSuccessStatus("", "")).toBeDefined();
  });

  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });

  it('ngAfterViewInit Ok', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });
});
