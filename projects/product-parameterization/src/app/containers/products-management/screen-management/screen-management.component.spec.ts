import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ScreenManagementComponent } from './screen-management.component';
import { NavigationStart, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ProductService } from '../../../services/product.service';

class MockService {
  public accumulation = new FormGroup({
    accumulationType: new FormControl(1),
    coverages: new FormArray([])
  });
}

class DialogMock {
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

class MockRouter {
  public ne = new NavigationStart(0, '/parametrizador-producto/cumulos');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('ScreenManagementComponent', () => {
  let component: ScreenManagementComponent;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [],
      providers: [ScreenManagementComponent,
        FormBuilder,
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: MatDialog,
          useValue: new DialogMock()
        },
        {
          provide: MatDialogRef,
          useValue:  new DialogMock()
        }, 
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    component = TestBed.inject(ScreenManagementComponent);
    service = TestBed.inject(ProductService);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unloadHandler', () => {
    const event: any = { name: 'test' };

    jest.spyOn(service, 'noProductChanges').mockReturnValue(false);
    service.initialParameters.get('insuranceLine')?.setValue('test');

    expect(component.unloadHandler(event)).toBeUndefined();
  });
});
