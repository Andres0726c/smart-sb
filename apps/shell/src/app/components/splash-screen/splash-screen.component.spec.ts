import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreenService } from '../../../../../../libs/refactoring-smartcore-commons-lib/src/lib/shared/services/splash-screen.service';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;
  let splashService: SplashScreenService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [],
      providers: [
        SplashScreenComponent,
        SplashScreenService
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(SplashScreenComponent);
    splashService = TestBed.inject(SplashScreenService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    splashService.subscribe(() => {
      return true;
    });
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('hideSplashAnimation OK', () => {
    jest.useFakeTimers();
    component.hideSplashAnimation();
    jest.runOnlyPendingTimers();
    expect(component.showSplash).toBeFalsy();
  });
});
