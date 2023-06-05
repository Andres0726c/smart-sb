import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageTreeComponent } from './coverage-tree.component';
import { HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreeNode } from 'primeng/api';

describe('CoverageTreeComponent', () => {
  let component: CoverageTreeComponent;
  let fixture: ComponentFixture<CoverageTreeComponent>;
  let productService: ProductService;

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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CoverageTreeComponent],
      providers: [
        CoverageTreeComponent,
        FormBuilder,
        ProductService,
        DialogService,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock(),
        },
      ],
    });

    component = TestBed.inject(CoverageTreeComponent);
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openToAdd', () => {
    component.productService.coverages = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Hurto calificado'),
      }),
    ]);
    expect(component.openToAdd()).toBeUndefined();
  });

  

  it('viewCoverage  ', () => {
    let node:TreeNode = {
      data: {
        id: 1,
        name: 'test',
        description: 'test'
      }
    }

    expect(component.viewCoverage(node)).toBeUndefined();
  });

  it('removeCoverage  ', () => {
   
    let node:TreeNode = {
      data: {
        id: 1,
        name: 'test',
        description: 'test'
      }
    }

    expect(component.removeCoverage(node)).toBeUndefined();
  });

  it('removeConfirmation', () => {
    let node:TreeNode = {
      data: {
        id: 1,
        name: 'test',
        description: 'test'
      }
    }
    component.productService.coverages = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('test')
      })
    ]);
    expect(component.removeConfirmation(true, node)).toBeUndefined();
  });
});