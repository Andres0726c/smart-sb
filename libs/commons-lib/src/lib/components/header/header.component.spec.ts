import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './header.component';
import { CognitoService } from '../../services/cognito.service';

class MockRouter {
  public ne = new NavigationEnd(0, '/', '/');
  public events = new Observable((observer) => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cognitoService: CognitoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: Router, useClass: MockRouter }, CognitoService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cognitoService = TestBed.inject(CognitoService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('singOut ok', () => {
    expect(component.signOut()).toBeDefined();
  });

  it('ngOnInit ok', async () => {
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
            businessName: 'businessName',
          },
        },
      })
    );
    jest.spyOn(cognitoService, 'getUser').mockImplementation(spy);
    JSON.parse = jest
      .fn()
      .mockImplementationOnce(() => {
        return { businessName: 'businessName' };
      })
      .mockImplementationOnce(() => {
        return { id: 3 };
      });

    component.ngOnInit();
    expect(spy).toBeCalled();
  });
});
