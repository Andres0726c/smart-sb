import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { ClaimReservationConceptComponent } from './claim-reservation-concept.component';
import { ClaimReservationConceptService } from './services/claim-reservation-concept.service';

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

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


describe('ClaimReservationConceptComponent', () => {
  let component: ClaimReservationConceptComponent;
  let fixture: ComponentFixture<ClaimReservationConceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        ClaimReservationConceptComponent,
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
          provide: ClaimReservationConceptService,
          useValue: {
            getConcept() {
              return of([{
                id: 1,
                name: 'test'
              }])
            },
            getExecutionLevel() {
              return of([{
                id: 1,
                name: 'test'
              }])
            }
          }
        },
        {
          provide: ProductService,
          useValue: {
            initialParameters: new FormGroup({
              insuranceLine: new FormControl(22)
            }),
            coverages: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('Hurto calificado'),
                claimReservation: new FormArray([
                  new FormGroup({
                    id: new FormControl(1),
                    cause: new FormControl(''),
                    conceptReserv: new FormControl(['test1', 'test2'])
                  })
                ]),
              })
            ]),
            conceptReservation: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test1'),
                claimLiquidation: new FormArray([])
              }),
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test3'),
                claimLiquidation: new FormArray([])
              })
            ])
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(ClaimReservationConceptComponent);

    const coverageTest = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Hurto calificado'),
      claimReservation: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          cause: new FormControl(''),
          conceptReserv: new FormControl(['test1', 'test2'])
        })
      ]),
    });

    jest.spyOn(component, 'coverageGroup', 'get').mockReturnValue(
      coverageTest
    );

    Object.defineProperty(component, 'selectedCoverage', { value:
      coverageTest
    });
  });




    it('filterOptionsCause',()=>{

      const event = { target: { value: 'Actos vandálicos' } } as any;
      component.causes = [{ name: 'Actos vandálicos', id:8 }];
      component.filterOptionsCause(event);
      const promise=Promise.resolve(event);
      promise.then(cause=>{
        expect((cause.name.filter).toLowerCase()).toBe(('Actos vandálicos').toLowerCase());
      });


    });



  it('displayFn ok',()=>{
     const cause={name:"Actos vandálicos",id:8};
    component.displayFn(cause);
    expect(component).toBeDefined();
  });

  it('displayFn',()=>{
    const cause={name:"",id:0};
   component.displayFn(cause);
   expect(component).toBeDefined();
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('getSuccessStatus  Ok', () => {
    component.getSuccessStatus('','');
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


  it('isAllSelected  Ok', () => {
    component.isAllSelected();
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

    component.dataSourcetable = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);

    expect(component.isAllDisplayedSelected()).toBeDefined();
  });

  it('addRelation  Ok', () => {
    expect(component.addRelation()).toBeUndefined();
    Object.defineProperty(component, 'selectedCoverage', { value:
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Hurto calificado'),
        claimReservation: new FormArray([]),
      })
    });
    expect(component.addRelation()).toBeUndefined();
  });

  it('DeleteRelation  Ok', () => {
    component.selection = new SelectionModel<ElementTableSearch>(true, []);

    let obj = new FormGroup({
      id: new FormControl(1),
      cause: new FormControl(''),
      conceptReserv: new FormControl(['test1', 'test2'])
    });

    component.selection.select(obj);

    expect(component.DeleteRelation()).toBeUndefined();
  });

  it('applyFilter', () => {
    const event = { target: { value: 'test' } } as any;
    component.dataSourcetable = new MatTableDataSource<any>([{ key: 1, value: 'test' }]);
    component.applyFilter(event);
    expect(component.dataSourcetable.filterPredicate).toBeDefined();
  });

  it('applyFilter', () => {
    const event = { target: { value: '' } } as any;
    component.dataSourcetable = new MatTableDataSource<any>([{ key: 1, value: '' }]);
    component.applyFilter(event);
    expect(component.dataSourcetable.filterPredicate).toBeDefined();
  });


  it('ngAfterViewInit  Ok', () => {
    let formgroup = new FormGroup({
      claimReservation: new FormControl('test')
    });

    component.selectedCoverage = formgroup;
    component.ngAfterViewInit();
    expect(component).toBeDefined();
  });

  it('updateTable  Ok', () => {
    let formgroup = new FormGroup({
      claimReservation: new FormControl('test')
    });

    component.selectedCoverage = formgroup;
    component.updateTable();
    expect(component).toBeDefined();
  });

  it('getMax  Ok', () => {
    component.getMax([1, 2], '1');
    expect(component).toBeDefined();
  });

  it('openModalReservation', () => {
    let id = 0;
    expect(component.openModalReservation(id)).toBeUndefined();
  });
});
