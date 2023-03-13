import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';
import { AngularMaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const dialogMock = {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
}

describe('ModificationTechnicalControlComponent', () => {
  let component: ModificationTechnicalControlComponent;
  let selection: SelectionModel<any>;
  let dataSource: MatTableDataSource<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [],
      providers: [
        ModificationTechnicalControlComponent,
        ProductService,
        FormsModule,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: dialogMock,
        },
        {
          provide: MatDialogRef,
          useValue:  dialogMock
        }, 
      ],
      schemas: [],
    });
    component = TestBed.inject(ModificationTechnicalControlComponent);
    selection = new SelectionModel<any>(true, []);
    dataSource = new MatTableDataSource([
      { id: 1, name: 'ass' },
      { id: 2, name: 'asd' },
      { id: 3, name: 'asf' },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('ngOnInit Ok', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('ngAfterViewInit Ok', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('getProcess Ok', () => {
    expect(component.getProcess()).toBeUndefined();
  });

  it('getRunLevel Ok', () => {
    expect(component.getRunLevel()).toBeUndefined();
  });

  it('should filter data based on input value', () => {
    const event: any = {
      target: {
        value: 'ejemplo'
      }
    };

    component.dataSource.filter = '';

    component.applyFilter(event);

    expect(component.dataSource.filter).toEqual('ejemplo');
  });

  it('should clear filter if input value is less than 3 characters', () => {
    const event: any = {
      target: {
        value: 'ab'
      }
    };

    component.dataSource.filter = 'ejemplo';

    component.applyFilter(event);

    expect(component.dataSource.filter).toEqual('');
  });

  it('should return false when nothing is selected or no data is available', () => {
    expect(component.isAllDisplayedSelected()).toBe(false);
  });

  it('should return true when all displayed items are selected', () => {
    dataSource.data = [{id: 1}, {id: 2}, {id: 3}];
    selection.select(...dataSource.data);
    expect(component.isAllDisplayedSelected()).toBe(false);
  });

  it('should return false when not all displayed items are selected', () => {
    dataSource.data = [{id: 1}, {id: 2}, {id: 3}];
    selection.select(...dataSource.data.slice(0, 2));
    expect(component.isAllDisplayedSelected()).toBe(false);
  });

  it('openToAdd Ok', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('deleteTechnical Ok', () => {
    expect(component.deleteTechnical()).toBeUndefined();
  });

  it('selectedOptions Ok', () => {
    expect(component.selectedOptions(1)).toBeUndefined();
  });

  it('isAllSelected Ok', () => {
    expect(component.isAllSelected()).toBeTruthy();
  });
 */

});
