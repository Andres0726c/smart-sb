import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CognitoService } from '../services/cognito.service';
import { AuthGuard } from './auth.guard';

const localStorageMock = (function() {
  let store: any = {};
  return {
    getItem: function(key: string | number) {
      return store[key];
    },
    setItem: function(key: string | number, value: { toString: () => any; }) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key: string | number) {
      delete store[key];
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of([
          {
            id: 1,
            name: 'name test return',
            description: 'description test return',
            details: 'details test return',
          },
        ]),
    };
  }
}

class toastMock {
  openFromComponent() {}
}
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: CognitoService;
  beforeEach(() => {
    service = CognitoService.prototype;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: FormArray<any>,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock(),
        }
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('Guard Auth', async () => {
    const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
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
          'custom:sessionInformation':'{}',
        },
        username: '',
      })
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spy).toBeCalled();
  });
  it('Guard Auth for catch', async () => {
    const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({
        signInUserSession: {
          accessToken: {
            payload: {
              'cognito:groups': ['TLN'],
            },
          },
        },
        username: '',
      })
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spy).toBeCalled();
  });
  it('Guard Auth for else', async () => {
    const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
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
          'custom:sessionInformation':'',
        },
        username: '',
      })
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spy).toBeCalled();
  });
  it('Auth',() => {
    const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/menu-productos',
    };
    guard.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(guard).toBeDefined();
  });

  it('checkAccess', async () => {
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
    
    guard.router.navigate(['/inicio']);

    const value = {
      signInUserSession: {
        accessToken: {
          payload: {
            'cognito:groups': ['TLN'],
          },
        },
      },
      attributes: {
        'custom:company': '1',
        'custom:sessionInformation':'{ username: username }',
      },
      username: '',
    }
    localStorageMock.setItem('CognitoSessionExp', 999999999999999);

    expect(guard.checkAccess(value,routerStateSnapshotStub)).toBeDefined();

  });

  it('checkAccess redirect', async () => {
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/inicio',
    };

    const value = {
      signInUserSession: {
        accessToken: {
          payload: {
            'cognito:groups': ['TLN'],
          },
        },
      },
      attributes: {
        'custom:company': '1',
        'custom:sessionInformation':'{ username: username }',
      },
      username: '',
    }
    localStorageMock.setItem('CognitoSessionExp', 999999999999999);

    expect(guard.checkAccess(value,routerStateSnapshotStub)).toBeDefined();

  });

});
