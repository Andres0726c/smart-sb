import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import { ModalAutomaticReservationComponent } from './modal-automatic-reservation.component';

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
class toastMock {
  openFromComponent() {}
}

describe('ModalAutomaticReservationComponent', () => {
  let component: ModalAutomaticReservationComponent;
  let fixture: ComponentFixture<ModalAutomaticReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        ModalAutomaticReservationComponent,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock(),
        },
        {
          provide: MatDialogRef,
          useValue: new dialogMock(),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(ModalAutomaticReservationComponent);
    component.data = { concept: [] };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component).toBeDefined();
  });

  it('masterToggle  Ok', () => {
    component.masterToggle();
    expect(component).toBeDefined();
  });

  it('deselectRows  Ok', () => {
    component.deselectRows();
    expect(component).toBeDefined();
  });

  it('isSomeDisplayedSelected  Ok', () => {
    component.isSomeDisplayedSelected();
    expect(component).toBeDefined();
  });

  it('isAllDisplayedSelected', () => {
    component.selection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };

    component.selection.select(obj);

    expect(component.isAllDisplayedSelected()).toBeDefined();

    component.dataSource = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);

    expect(component.isAllDisplayedSelected()).toBeDefined();
  });

  it('applyFilter', () => {
    const event = { target: { value: 'test' } } as any;
    component.dataSource = new MatTableDataSource<any>([
      { key: 1, value: 'test' },
    ]);
    component.applyFilter(event);
    expect(component.dataSource.filterPredicate).toBeDefined();
  });

  it('applyFilter', () => {
    const event = { target: { value: '' } } as any;
    component.dataSource = new MatTableDataSource<any>([{ key: 1, value: '' }]);
    component.applyFilter(event);
    expect(component.dataSource.filterPredicate).toBeDefined();
  });

  it('addConcept', () => {
    expect(component.addConcept()).toBeUndefined();
  });

  it('addElements', () => {
    let vari: any = [];
    expect(component.addElements()).toEqual(vari);
  });

  it('openModalRule', () => {
    let id = 0;
    let automatic = true;

    expect(component.openModalRule(id, automatic)).toBeUndefined();
  });

  it('deleteConcept', () => {
    expect(component.deleteConcept()).toBeUndefined();
  });

  it('requeridForm', () => {
    let element = {
      automatic: false,
      calcRule: {},
      description: 'Muerte accidental',
      id: 100,
      name: 'Muerte accidental',
    };
    let automatic = true;
    expect(component.requeridForm(element, automatic)).toBeUndefined();
  });

  it('checkElements return false', ()=>{

    let dataSourceMock = new MatTableDataSource<any>([
      {
        automatic: true,
        calcRule: {
          id:100
        },
      },
    ]);
    component.dataSource=dataSourceMock;
    let result= component.checkElements();

    expect(result).toBe(false);

  });

  it('checkElements return true', ()=>{

    let dataSourceMock = new MatTableDataSource<any>([
      {
        automatic: true,
        calcRule: {},
      },
    ]);
    component.dataSource=dataSourceMock;
    let result= component.checkElements();

    expect(result).toBe(true);

  });
  it('removeRule', () => {
    let element = {
      automatic: false,
      calcRule: {},
      description: 'Muerte accidental',
      id: 100,
      name: 'Muerte accidental',
    };
    let automatic = true;
    expect(component.removeRule(element)).toBeUndefined();
  });

});
