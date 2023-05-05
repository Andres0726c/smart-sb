import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';

import { AccumulationComponent } from './accumulation.component';

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
  closeAll(){
    
  }
}

class toastMock {
  openFromComponent() {} 
}

describe('AccumulationComponent', () => {
  let component: AccumulationComponent;
  let fixture: ComponentFixture<AccumulationComponent>;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MatDialogModule, FormsModule],
      declarations: [],
      providers: [ AccumulationComponent ,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },
        FormBuilder,
        {
          provide: FormArray,
          useValue: {}
        },
        {
          provide: FormGroup,
          useValue: {}
        },{
          provide: MatSnackBar,
          useValue: new toastMock()
        }
        ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(AccumulationComponent);
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', async() => {
    expect(component.ngOnInit()).toBeDefined();
  });

  it('applyFilter', () => {
    let event = { target: { value: 'test' } } as any;

    let obj = {
      id: 1,
      name: 'test',
      description: '2',
    };

    component.dataSource = new MatTableDataSource<any>([obj]);
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('test');

    event = { target: { value: '' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('');
  });

  it('deleteCoverage',()=>{
    let obj:any ={
      coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado'}]
    }
    expect(component.deleteCoverage(obj.coverages)).toBeUndefined();
  });

  it('openDialogCoverages',()=>{
    expect(component.openDialogCoverages("code")).toBeUndefined();
  });

  it('changeRequired',()=>{
    expect(component.changeRequired()).toBeUndefined();
    component.productService.accumulation.get('accumulationType')?.setValue(1);
    expect(component.changeRequired()).toBeUndefined();
  });

});
