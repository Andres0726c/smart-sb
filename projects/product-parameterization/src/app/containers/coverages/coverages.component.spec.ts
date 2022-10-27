import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveragesComponent } from './coverages.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
describe('CoveragesComponent', () => {
  let component: CoveragesComponent;
  let fixture: ComponentFixture<CoveragesComponent>;
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
  }
  class toastMock {
    openFromComponent() {} 
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,HttpClientTestingModule],
      declarations: [],
      providers: [CoveragesComponent,
        {
        provide: MatDialog,
        useValue: new dialogMock()
      }, FormBuilder,
      {
        provide: MatSnackBar,
        useValue: new toastMock()
      },
      {
        provide: ProductService,
        useValue: {
          get riskTypesControls(): FormArray {
            return this.riskTypes;
          },
          initialParameters: new FormGroup({
            insuranceLine: new FormControl(22)
          }),
          coverages: new FormArray([
            new FormGroup({
              id: new FormControl(1),
              name: new FormControl('Hurto calificado')
            })
          ]),
          riskTypes: new FormArray([
            new FormGroup({
              id: new FormControl(1),
              businessPlans: new FormArray([
                new FormControl(
                  { 
                    coverages: [ {id: 1} ],
                    servicePlans: [ {id: 1} ]
                  }
                )
              ])
            })
          ]),
          accumulation: new FormGroup({
            accumulationCoverages: new FormArray([
              new FormGroup({
                id: new FormControl(1)
              })
            ])
          })
        },
      },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CoveragesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openToAdd coverages empty', () => {
    component.productService.coverages = new FormArray([]); 
    expect(component.openToAdd()).toBeUndefined();
  });
  it('openToAdd', () => {
    component.productService.coverages = new FormArray([]);
    (component.productService.coverages).push(new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Hurto calificado')
    })); 
    expect(component.openToAdd()).toBeUndefined();
  });
 
});
