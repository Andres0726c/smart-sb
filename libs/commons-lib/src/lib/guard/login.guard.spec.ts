import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CognitoService } from '../services/cognito.service';
import { LoginGuard } from './login.guard';

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

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let service: CognitoService;
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
        },
      ],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('Guard Auth', async () => {
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
    jest.spyOn(service, 'getAuth').mockImplementation(spy);
    guard.canActivate();
    expect(spy).toBeCalled();
  });

  it('Guard Auth for catch', async () => {
    const spy = jest.fn().mockImplementation(() =>
      Promise.reject()
    );
    jest.spyOn(service, 'getAuth').mockImplementation(spy);
    guard.canActivate();
    expect(spy).toBeCalled();
  });

  it('login', () => {
    guard.canActivate();
    expect(guard).toBeDefined();
  });
});
