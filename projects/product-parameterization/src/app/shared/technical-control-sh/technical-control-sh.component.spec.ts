import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { TechnicalControlShComponent } from './technical-control-sh.component';

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

describe('TechnicalControlComponent', () => {
  let component: TechnicalControlShComponent;
  let fixture: ComponentFixture<TechnicalControlShComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [TechnicalControlShComponent,
        ProductService,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock()
        },
        {
          provide: MatDialogRef,
          useValue:  new dialogMock()
        }, 
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    component = TestBed.inject(TechnicalControlShComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openToAdd', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('deleteTechnical',()=>{
    let obj:any ={
      name:'nombre',
      description: 'description'
    }
    expect(component.deleteTechnical(obj)).toBeUndefined();
  });

  it('applyFilter', () => {
    let event = { target: { value: 'test' } } as any;
    component.dataSource = new MatTableDataSource<any>([{ key: 1, value: 'test' }]);
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('test');
  
    event = { target: { value: '' } } as any;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('');
  });

  it('getProcess', () => {
    expect(component.getProcess()).toBeUndefined();
  });

  it('ngAfterViewInit', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });
  it('selectedOptions', () => {
    const i = 1;
    expect(component.selectedOptions(i)).toBeUndefined();
  });

  
});
