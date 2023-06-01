import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CognitoService } from 'commons-lib';
import { AuthGuardParameterizer } from './auth.guard';
import { Router } from '@angular/router';

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
  let guard: AuthGuardParameterizer;
  let service: CognitoService;
  let router: Router;
  beforeEach(() => {
    service = CognitoService.prototype;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: FormArray,
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
    
    router = TestBed.inject(Router);
    router.initialNavigation();
    guard = TestBed.inject(AuthGuardParameterizer);
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

  it('canActivateChild', async () => {
    const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({})
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    guard.canActivateChild(activatedRouteSnapshotStub, routerStateSnapshotStub);
    expect(spy).toBeCalled();
  });

  it('checkAccess', async () => {
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/parametrizador-producto',
    };
    
    guard.router.navigate(['/parametrizador-producto/cumulos']);

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
    guard.productService.accumulation.get('accumulationType')?.setValue(1);
    localStorageMock.setItem('CognitoSessionExp', 999999999999999);

    expect(guard.checkAccess(value,routerStateSnapshotStub)).toBeDefined();

  });

  it('checkAccess when is diferent of cumulos', async () => {
    const routerStateSnapshotStub: RouterStateSnapshot = <any>{
      url: '/autorizacion',
    };

    jest.spyOn(router,'url','get').mockReturnValue('/productos/parametrizador/cumulos')


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
    guard.productService.accumulation= new FormGroup({
      accumulationType: new FormControl(1),
      accumulationCoverages: new FormArray([])
    });
    localStorageMock.setItem('CognitoSessionExp', 999999999999999);

    expect(guard.checkAccess(value,routerStateSnapshotStub)).toBeDefined();

  });


  
});
