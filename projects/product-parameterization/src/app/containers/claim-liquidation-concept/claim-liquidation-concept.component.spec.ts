import { SelectionModel } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { ClaimLiquidationConceptComponent } from './claim-liquidation-concept.component';
import { MatTreeFlatDataSource } from '@angular/material/tree';

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
describe('ClaimLiquidationConceptComponent', () => {
  let component: ClaimLiquidationConceptComponent;
  let fixture: ComponentFixture<ClaimLiquidationConceptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        ClaimLiquidationConceptComponent,
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
                    conceptReserv: new FormControl(['test1', 'test2']),
                    relCauseConcept: new FormArray([new FormGroup({
                      concept: new FormControl({id: 1})
                    })]), 
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
                id: new FormControl(2),
                name: new FormControl('test2'),
                claimLiquidation: new FormArray([])
              })
            ])
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ClaimLiquidationConceptComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
     component.ngOnInit();
     expect(component).toBeDefined();
  });

  it('ngAfterViewInit Ok', () => {
    component.ngAfterViewInit();
    expect(component).toBeDefined();
  });

  it('viewLiquidationConcept ',()=>{
    let node={name:'test1',level:1,expandable:true};
    component.flatNodeMap.set(node,node);
    component.selectedLiquidationConcept= new FormGroup({
      name: new FormControl('test'),
      claimLiquidation: new FormControl('')
    });
    jest.spyOn(component,'findIndexNode').mockReturnValue(0)
    component.productService.conceptReservation=null;
    component.viewLiquidationConcept(node); 
  });

  it('findIndexNode',()=>{
    component.dataSource.data = [
      { name: 'test', children: [ { id:1, name:""  }] }]
      let node={id:1,name:'test'}
      component.flatNodeMap.set(node,node)
    component.findIndexNode({expandable:true,name:'test',level:1});
  }); 
  it('updateTree ',()=>{
    component.productService.conceptReservation=null;
    component.updateTree();
  })
  it('addItemLiquidationConcept',()=>{
    component.selectedLiquidationConcept= new FormGroup({
      name: new FormControl('test'),
      claimLiquidation:new FormArray([])
    });
    component.addItemLiquidationConcept([{id:2,name:'test',description:'test'}]);
  })
  it('openToAdd  Ok', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('removeItems  Ok', () => {
    component.selectedLiquidationConcept= new FormGroup({
      name: new FormControl('test'),
      claimLiquidation: new FormArray([ new FormGroup({
        id: new FormControl(1)
      })])
    });
    expect(component.removeItems()).toBeUndefined();
  });

  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });

  it('isAllSelected  Ok', () => {
    expect(component.isAllSelected()).toBeTruthy();
  });

  it('masterToggle  Ok', () => {
    expect(component.masterToggle()).toBeUndefined();
  });

  it('deselectRows  Ok', () => {

    expect(component.deselectRows()).toBeUndefined();
  });

  it('classToLiquidationConceptSelected  Ok', () => {
    let node = { expandable: false, name: '', level: 1 };
    expect(component.classToLiquidationConceptSelected(node)).toBeTruthy();
  });

  it('isSomeDisplayedSelected  Ok', () => {
    expect(component.isSomeDisplayedSelected()).toBeFalsy();
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

    component.dataSourceTable = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);

    expect(component.isAllDisplayedSelected()).toBeDefined();
  });

  it('deselectRows',()=>{
    let obj = {
      id: 1,
      name: 'name',
      description: '2',
    };
    component.dataSourceTable = new MatTableDataSource<any>([
      obj,
      {
        id: 2,
        name: 'abc',
        description: 'abc',
      },
    ]);
    component.deselectRows();
  })
  it('updateConceptReservations', () => {
    expect(component.updateConceptReservations()).toBeUndefined();
  });

});
