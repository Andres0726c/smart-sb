import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CognitoService } from 'commons-lib';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ModalSessionRestartComponent } from './modal-session-restart.component';

class dialogMock {
  open() {
    return {
      afterClosed: () => of({}),
    };
  }
  close() {
    return {
      afterClosed: () => of({}),
    };
  }
}
describe('ModalSessionRestartComponent', () => {
  let component: ModalSessionRestartComponent;
  let fixture: ComponentFixture<ModalSessionRestartComponent>;
  let productService: ProductService;
  let cognitoService: CognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      declarations: [],
      providers: [
        ModalSessionRestartComponent,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatDialogRef,
          useValue: new dialogMock(),
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ModalSessionRestartComponent);
    productService = TestBed.inject(ProductService);
    cognitoService = TestBed.inject(CognitoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Mostrar contraseña', () => {
    component.passwordTypeInput = 'password';
    component.iconpassword = 'fal fa-eye';
    component.showPassword();
    expect(component.passwordTypeInput).toEqual('text');
    expect(component.iconpassword).toEqual('fal fa-low-vision');
  });

  it('Ocultar contraseña', () => {
    component.passwordTypeInput = 'text';
    component.iconpassword = 'fal fa-low-vision';
    component.showPassword();
    expect(component.passwordTypeInput).toEqual('password');
    expect(component.iconpassword).toEqual('fal fa-eye');
  });


  it('Autenticacion exitosa para un rol TLN y dos compañías', () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        signInUserSession: {
          accessToken: {
            payload: {
              'cognito:groups': ['TLN'],
            },
          },
        },
        attributes: {
          'custom:company': '1,2',
        },
      })
    );

    jest.spyOn(cognitoService, 'signIn').mockImplementation(spy);

    //component.setCompany = () => Promise.resolve();
    const spySetCompany = jest.fn().mockImplementation(()=>Promise.resolve(console.log('JLAKJLKFSADJFLKDSAJ')));
    jest.spyOn(component, 'setCompany').mockImplementation(spySetCompany)
    component.setCompany = async () => {
      component.data.company = [1];
      await Promise.resolve();
    };

    component.setCompany = () => Promise.resolve();
    component.logIn();
    expect(spySetCompany)
  });

  it('logIn error', () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.reject({
        signInUserSession: {
          accessToken: {
            payload: {
              'cognito:groups': ['TLN'],
            },
          },
        },
        attributes: {
          'custom:company': '1',
        },
      })
    );

    jest.spyOn(cognitoService, 'signIn').mockImplementation(spy);

    component.setCompany = () => Promise.reject();
    component.logIn();
    expect(spy).toBeCalled();
  });

  it('hasError', () => {

    component.formData =  new FormGroup({email: new FormControl('', [Validators.required,Validators.pattern('^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$')])});
    expect(component.hasError('email','')).toBeDefined();
  });

  it('setCompany', () => {
    expect(component.setCompany('a')).toBeDefined();
  });

  it('setCompanyError', () => {
    const spy = jest.fn().mockImplementation(()  => { throw new Error('error');});

    jest.spyOn(component, 'setCompany').mockImplementation(spy);
    expect(spy);


  });

  it('forbidden', async() => {
    component.cognitoService.signOut= () => Promise.resolve();
    expect(component.forbidden()).toBeDefined();
  });
});
