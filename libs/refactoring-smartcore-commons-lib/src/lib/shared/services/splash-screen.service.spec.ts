import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { SplashScreenService } from './splash-screen.service';

class MockRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}

describe('SplashScreenService', () => {
  let component: SplashScreenService;
  let fixture: ComponentFixture<SplashScreenService>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    component = TestBed.inject(SplashScreenService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stop OK', () => {
    jest.useFakeTimers();
    component.stop();
    jest.runOnlyPendingTimers();
    expect(component.subject['closed']).toBeFalsy();
  });
});
