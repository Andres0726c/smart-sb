import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductiblesComponent } from './deductibles.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { MatDialog } from '@angular/material/dialog';
import { of, Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Table } from 'primeng/table';

describe('DeductiblesComponent', () => {
  let component: DeductiblesComponent;
  let fixture: ComponentFixture<DeductiblesComponent>;

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
      declarations: [DeductiblesComponent],
      providers: [
        DeductiblesComponent,
        FormBuilder,
        DialogService,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(DeductiblesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openDialog deductible', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('addDeductible', () => {
    let deductible = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
    ];

    expect(component.addDeductible(deductible)).toBeUndefined();
  });

  it('removeDeductible', () => {
    component.selectedElement = [
      {
        id: 1,
        name: 'test',
        description: 'test',
      },
    ];

    expect(component.removeDeductible()).toBeUndefined();
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
});
