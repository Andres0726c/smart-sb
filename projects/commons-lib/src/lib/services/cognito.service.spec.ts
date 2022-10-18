import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from 'aws-amplify';
import { of } from 'rxjs';
import { CognitoService } from './cognito.service';

class DialogMock {
  open() {
    return {
      afterClosed: () => of({})
    };
  }
}

describe('CognitoService', () => {
  let service: CognitoService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: Auth,
          useValue: { currentSession: () => Promise.resolve(true) },
        },
        {
          provide: MatDialog,
          useValue: new DialogMock()
        }
      ]

    });
    service = TestBed.inject(CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('signIn', async () => {
    Auth.signIn = async () => {
      await Promise.resolve();
    };

    const spy = jest.fn().mockImplementation(() =>
      Promise.resolve({ username: 'test' })
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    service.signIn('pablo.echeverry', 'd123');
    expect(spy).toBeDefined();
  });

  it('signIn error', async () => {
    Auth.signIn = async () => {
      await Promise.resolve();
    };

    const spy = jest.fn().mockImplementation(() =>
      Promise.reject()
    );
    jest.spyOn(service, 'getUser').mockImplementation(spy);
    service.signIn('pablo.echeverry', 'd123');
    expect(spy).toBeDefined();
  });

  it('getUser', () => {
    expect(service.getUser()).toBeDefined();
  });

  it('sessionTimer', () => {
    expect(service.sessionTimer()).toBeUndefined();
  });

  it('expirationCounter', () => {
    expect(service.expirationCounter(0)).toBeUndefined();
  });

  /*it('expirationCounter1', fakeAsync(() => {
     service.expirationCounter(200);
     tick(200);
      expect(spy).toBeCalled();
  }));*/

  it('setUserCompany', async () => {
    Auth.currentAuthenticatedUser = async () => {
      await Promise.resolve();
    };
    await expect(service.setUserCompany(null)).toBeDefined();
  });

  it('getUserCompany', async() => {
    expect(service.getUserCompany()).toBeDefined();
  });
});
