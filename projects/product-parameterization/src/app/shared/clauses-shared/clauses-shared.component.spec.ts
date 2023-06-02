import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausesSharedComponent } from './clauses-shared.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClausesSharedComponent', () => {
  let component: ClausesSharedComponent;
  let fixture: ComponentFixture<ClausesSharedComponent>;

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
      imports: [HttpClientTestingModule],
      declarations: [ 
        ClausesSharedComponent 
      ],
      providers: [
        ClausesSharedComponent,
        FormBuilder,
        DialogService,
        ProductService,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(ClausesSharedComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('openDialog', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('addClause', () => {
    let clause = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
    ];

    expect(component.addClause(clause)).toBeUndefined();
  });

  it('removeClause', () => {
    let clause = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
    ];

    expect(component.removeClause()).toBeUndefined();
  });

  it('removeConfirmation', () => {
    component.selectedElement = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
    ];
    expect(component.removeConfirmation(true)).toBeUndefined();
  });

  it('getDetailColumn', () => {
    let element = {
      id: 1,
      name: 'test',
      description: 'test',
    };
    let colName = 'test';
    expect(component.getDetailColumn(element, colName)).toBeUndefined();

    let element2 = {
      element: {
        test: {
          test: 'test'
        }
      }
    };
    let colName2 = 'test.test';
    expect(component.getDetailColumn(element2, colName2)).toEqual('test');
  });

  it('closeModalDetail', () => {
    expect(component.closeModalDetail()).toBeUndefined();
  });

  it('openDetail', () => {
    let rowData = {
      name: 'test',
      details: 'test\\ntest\\ttest'
    }

    expect(component.openDetail(rowData)).toBeUndefined();
  });

});
