import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CognitoService } from 'commons-lib';
import { ProductService } from '../../services/product.service';
class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}
class toastMock {
  openFromComponent() {} 
}
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cognitoService: CognitoService;
  

  beforeEach(() => {
    cognitoService = CognitoService.prototype;
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [],
      providers: [HeaderComponent, ProductService,
        FormBuilder,
      {
        provide: Router,
        useValue: {}
      },
      {
        provide: MatDialog,
        useValue: new DialogMock()
      },
      {
        provide: MatSnackBar,
        useValue: new toastMock()
      }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(HeaderComponent);
    //cognitoService = TestBed.inject(CognitoService);

  });

  it('should create', () => {
   // TO-BE: // unit test de los funciones de guardado y carga
    expect(component).toBeTruthy();
  });

  it('Componente inicializado e inicialización de usuario correctamente', async () => {    
    const spy = jest.fn().mockImplementation(() =>
    Promise.resolve({
      username: 'username',
      signInUserSession: {
        accessToken: {
          payload: {
            'cognito:groups': ['TLN'],
          },
        },
      },
      attributes: {
        'custom:company': '1',
        'custom:sessionInformation': {
          id: 3,
          businessName: 'businessName'
        },
      },
    })
  );
  jest.spyOn(cognitoService, 'getUser').mockImplementation(spy);
  JSON.parse = jest.fn()
    .mockImplementationOnce(() => {return {businessName: 'businessName'}})
    .mockImplementationOnce(() => {return {id: 3}});

    component.ngOnInit();
    expect(spy).toBeCalled()
    
  });

  it('Componente inicializado e inicialización de usuario correctamente', async () => {    
    const spy = jest.fn().mockImplementation(() => Promise.reject());
    jest.spyOn(cognitoService, 'getUser').mockImplementation(spy);

    component.ngOnInit();
    expect(component.isAuthenticated).toBeFalsy();
    
  });

  it('saveProduct OK', () => {
    expect(component.saveProduct(true)).toBeUndefined();
  });

  it('exportProduct OK', () => {
    expect(component.exportProduct()).toBeUndefined();
  });

  it('signOut OK', () => {
    expect(component.signOut()).toBeUndefined();
  });

  it('go to Home', () => {
    expect(component.goToHome()).toBeUndefined();
  });
});
