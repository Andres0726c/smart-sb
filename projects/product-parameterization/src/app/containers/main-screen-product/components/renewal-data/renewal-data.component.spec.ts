import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { Observable, of } from 'rxjs';
import { RenewalDataComponent } from './renewal-data.component';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('RenewalDataComponent', () => {
  let component: RenewalDataComponent;
  let fixture: ComponentFixture<RenewalDataComponent>;
  const errorResponseSpy = jest.fn().mockImplementation(() => {
    return new Observable(() => {
      throw new Error("error");
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalDataComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        ProductService,
        FormBuilder,
        DialogService,
        MessageService,
        {
          provide: MatDialog,
          useValue: new DialogMock()
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load causes', () => {
    const res = {
      dataHeader: { code: 200 },
      body: [
        {
          id: 1,
          code: 'test',
          name: 'test'
        }
      ]
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadCauses()).toBeUndefined();
  });

  it('load causes error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.loadCauses()).toBeUndefined();
  });

  it('load context data', () => {
    const res = {
      dataHeader: { code: 200 },
      body: {
        nmValueList: [
          {
            "code": "prdct",
            "description": "Producto",
            "applctnLvl": [
              "*"
            ]
          }
        ]
      }
    };
    jest.spyOn(component.productService, 'getApiData').mockReturnValue(of(res));
    expect(component.loadContextData()).toBeUndefined();
  });

  it('load context data error', () => {
    jest.spyOn(component.productService, 'getApiData').mockImplementation(errorResponseSpy);
    expect(component.loadContextData()).toBeUndefined();
  });

});
