import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ClaimTechnicalControlComponent } from './claim-technical-control.component';

class DialogMock {
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

describe('TechnicalControlComponent', () => {
  let component: ClaimTechnicalControlComponent;
  let fixture: ComponentFixture<ClaimTechnicalControlComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [
        ClaimTechnicalControlComponent,
        ProductService,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: new DialogMock(),
        },
        {
          provide: MatDialogRef,
          useValue:  new DialogMock()
        }, 
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    component = TestBed.inject(ClaimTechnicalControlComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

});
