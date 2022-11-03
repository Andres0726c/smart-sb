import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CoverageMenuComponent } from './coverage-menu.component';

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

describe('CoverageMenuComponent', () => {
  let component: CoverageMenuComponent;
  let fixture: ComponentFixture<CoverageMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        CoverageMenuComponent,
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
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });

    component = TestBed.inject(CoverageMenuComponent);

    // const coverageTest = new FormGroup({
    //   id: new FormControl(1),
    //   name: new FormControl('Hurto calificado'),
    //   claimReservation: new FormArray([
    //     new FormGroup({
    //       id: new FormControl(1),
    //       cause: new FormControl(''),
    //       conceptReserv: new FormControl(['test1', 'test2'])
    //     })
    //   ]),
    // });

    // jest.spyOn(component, 'coverageGroup', 'get').mockReturnValue(
    //   coverageTest
    // );

    // Object.defineProperty(component, 'selectedCoverage', { value: 
    //   coverageTest
    // });
    component.selectedCoverage = new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Hurto calificado')
    });
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('classToCoverageSelected  Ok', () => {
    let node: ExampleFlatNode = {
      expandable: true,
      name: 'test',
      level: 0,
    };
    component.classToCoverageSelected(node);
    expect(component).toBeDefined();
  });

  it('viewCoverage ', () => {
    component.dataSource.data = [{
      children: [{
        description: "Perdida dano equipo electronico por vigencia",
        id: 1,
        name: "Perdida dano equipo vigen"
      }],
      name: "Coberturas"
    }];
    let node = {expandable: false, name: 'Perdida dano equipo vigen', level: 1};
    expect(component.viewCoverage(node)).toBeUndefined();
  });

  it('openToAdd', () => {
    expect(component.openToAdd()).toBeUndefined();
    component.productService.coverages = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Hurto calificado')
      })
    ]);
    expect(component.openToAdd()).toBeUndefined();
  });

  it('removeCoverage', () => {
    let node = {expandable: false, name: 'Hurto calificado', level: 1};

    component.productService.coverages = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Hurto calificado')
      })
    ]);
    
    component.updateTree();
    expect(component.removeCoverage(node)).toBeUndefined();
  });

  it('removeCoverageCascade', () => {
    component.productService.riskTypes = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Mascotas'),
        businessPlans: new FormArray([
          new FormGroup({
            coverages: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('Hurto calificado')
              })
            ])
          })
        ])
      })
    ]);

    component.productService.coverages = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl('Hurto calificado')
      })
    ]);

    component.productService.accumulation = new FormGroup({
      accumulationCoverages: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('Hurto calificado')
        })
      ])
    });

    component.updateTree();
    expect(component.removeCoverageCascade(1)).toBeUndefined();
  });
});
