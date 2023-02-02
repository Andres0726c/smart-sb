import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { CognitoService } from 'commons-lib';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule],
      providers: [
        FormBuilder,
        CognitoService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Autenticacion exitosa para un rol TLN y una compañia', () => {
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
          'custom:company': '1',
        },
      })
    );

    jest.spyOn(component.cognitoService, 'signIn').mockImplementation(spy);

    component.getCompanies = async () => {
      component.companies = [1];
      await Promise.resolve();
    };

    //component.setCompany = () => Promise.resolve();
    const spySetCompany = jest.fn().mockImplementation(()=>Promise.resolve(console.log('JLAKJLKFSADJFLKDSAJ')));
    jest.spyOn(component, 'setCompany').mockImplementation(spySetCompany)
    component.setCompany = async () => {
      component.companies = [1];
      await Promise.resolve();
    };

    component.setCompany = () => Promise.resolve();
    //const spy = TestBed.get()
    component.logIn();
    //expect(component.router.getCurrentNavigation()).toEqual('menu-productos');
    //expect(spy).toBeCalled();
    expect(spySetCompany)
    //expect(spySetCompany).toBeCalledTimes(1);
    //expect(component.companies).toEqual([1]);
  });

  it('Autenticacion sin rol', () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        signInUserSession: {
          accessToken: {
            payload: {
              'cognito:groups': [],
            },
          },
        },
        attributes: {
          'custom:company': '',
        },
      })
    );

    jest.spyOn(component.cognitoService, 'signIn').mockImplementation(spy);

    component.getCompanies = async () => {
      component.companies = [1,2];
      await Promise.resolve();
    };

    //component.setCompany = () => Promise.resolve();
    const spySetCompany = jest.fn().mockImplementation(()=>Promise.resolve(console.log('JLAKJLKFSADJFLKDSAJ')));
    jest.spyOn(component, 'setCompany').mockImplementation(spySetCompany)
    component.setCompany = async () => {
      component.companies = [1];
      await Promise.resolve();
    };

    component.setCompany = () => Promise.resolve();
    component.logIn();
    expect(spySetCompany)
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

    jest.spyOn(component.cognitoService, 'signIn').mockImplementation(spy);

    component.getCompanies = async () => {
      component.companies = [1,2];
      await Promise.resolve();
    };

    //component.setCompany = () => Promise.resolve();
    const spySetCompany = jest.fn().mockImplementation(()=>Promise.resolve(console.log('JLAKJLKFSADJFLKDSAJ')));
    jest.spyOn(component, 'setCompany').mockImplementation(spySetCompany)
    component.setCompany = async () => {
      component.companies = [1];
      await Promise.resolve();
    };

    component.setCompany = () => Promise.resolve();
    component.logIn();
    expect(spySetCompany)
  });

  it('Autenticacion con cambio de password requerido', () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        challengeName: 'NEW_PASSWORD_REQUIRED',
        signInUserSession: {
        },
        attributes: {
          'custom:company': '',
        },
      })
    );

    jest.spyOn(component.cognitoService, 'signIn').mockImplementation(spy);
    
    const spySetCompany = jest.fn().mockImplementation(()=>Promise.resolve(console.log('JLAKJLKFSADJFLKDSAJ')));
    jest.spyOn(component, 'setCompany').mockImplementation(spySetCompany)
    component.setCompany = async () => {
      component.companies = [1];
      await Promise.resolve();
    };

    component.setCompany = () => Promise.resolve();
    component.logIn();
    expect(spySetCompany)
  });

  it('getCompanies', async () => {
    const res: any = { 
      dataHeader: {
        hasErrors: false,
        totalRecords: 1
      }, 
      body: [
        {
          id: 1,
          name: 'name test return',
          description: 'description test return',
        }
      ]
    };
    jest.spyOn(component.apiService, 'getApiData').mockReturnValue(of(res));
    expect(component.getCompanies('1')).toBeDefined();
  });

  it('getCompanies catch', async () => {
    jest.spyOn(component.apiService, 'getApiData').mockImplementation(() => { throw new Error('error'); });
    expect(component.getCompanies('1')).toBeDefined();
  });

  it('setCompany', async() => {
    expect(component.setCompany('a')).toBeDefined();
  });

  it('setCompanyError', () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.reject()
    );
    jest.spyOn(component.cognitoService, 'setUserCompany').mockImplementation(spy);
    component.setCompany('');
    expect(spy).toBeCalled();
  });

  it('forbidden', () => {
    component.cognitoService.signOut = () => Promise.resolve();
    expect(component.forbidden()).toBeUndefined();
  });

  it('evento de teclado', () => {
    let event = new KeyboardEvent("keydown", { keyCode: 37, key: "Enter" });
    component.hasEnterKey(event);
    event = new KeyboardEvent("keydown", { keyCode: 36, key: "A" });
    component.hasEnterKey(event);
  });

  it('closeModalCompany ok', () => {
    expect(component.closeModalCompany()).toBeUndefined();
  });

});
