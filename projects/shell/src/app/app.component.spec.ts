import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { InitScreenComponent } from './containers/init-screen/init-screen.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'autenticacion',
            component: InitScreenComponent
          }
        ])
      ],
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    jest.spyOn(component.cognitoService, 'getUser').mockResolvedValue({
      username: 'test',
      attributes: {
        'custom:sessionInformation': '{ id: 3 }'
      },
      signInUserSession: {
        accessToken: {
          payload: {
            exp: 123456
          }
        }
      }
    });

    jest.spyOn(component.cognitoService, 'signOut').mockResolvedValue({
      username: 'test',
    });

    jest.spyOn(component.cognitoService, 'sessionTimer').mockResolvedValue();

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Smartcore'`, () => {
    expect(component.title).toEqual('Smartcore');
  });

  it(`resetSessionTimer`, () => {
    expect(component.resetSessionTimer()).toBeUndefined();
  });

  it(`refreshUserState`, () => {
    expect(component.refreshUserState()).toBeUndefined();
  });
});
