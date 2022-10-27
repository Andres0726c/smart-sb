import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

import { ModificationTypesComponent } from './modification-types.component';

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

describe('VisibleNonModifiableFieldsComponent', () => {
  let component: ModificationTypesComponent;
  let fixture: ComponentFixture<ModificationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        ModificationTypesComponent,
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
              insuranceLine: new FormControl(22),
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
                  }),
                ]),
              }),
            ]),
            conceptReservation: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test1'),
                claimLiquidation: new FormArray([]),
              }),
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test3'),
                claimLiquidation: new FormArray([]),
              }),
            ]),
            modificationTypes: new FormArray([
              new FormGroup({
                id: new FormControl(1),
                name: new FormControl('test1')
              })
            ]),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ModificationTypesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('ngOnInit', () => {
    expect(component.openToAdd()).toBeUndefined();
  });

  it('openToAdd', () => {
    component.productService.modificationTypes = new FormArray([]);
    expect(component.openToAdd()).toBeUndefined();

  });

  it('removeModificationType ', () => {
    let node = { expandable: false, name: 'test', level: 1 };

    component.dataSource.data.push({
      name: 'test',
      id: 1,
      children: [{ name: 'Datos test' }],
    });

    component.productService.modificationTypes.push(
      component.fb.group({
        id: component.fb.control(1, Validators.required),
        name: component.fb.control('test risk', Validators.required),
        description: component.fb.control(
          'test description',
          Validators.required
        ),
      })
    );
    jest
      .spyOn(component, 'findIndexModificationType')
      .mockImplementation(() => {
        return 0;
      });
    expect(component.removeModificationType(node)).toBeUndefined();
  });

  it('classToModificationTypeSelected  Ok', () => {
    let node = { expandable: false, name: '', level: 1 };
    expect(component.classToModificationTypeSelected(node)).toBeTruthy();
  });

  it('viewModificationType Ok', () => {
    let node = { expandable: false, name: 'test name', level: 1 };
    expect(component.viewModificationType(node)).toBeUndefined();
  });

  // it('quantityItems', () => {
  //   let node = { expandable: false, name: 'test', level: 1 };
  //   let subItemsModificationType = [{ name: 'test', formArray:'test', distance: 1}]
  //   component.subItemsModificationTypes = subItemsModificationType;
  //   expect(component.quantityItems(node)).toBeTruthy();
  // });
});
