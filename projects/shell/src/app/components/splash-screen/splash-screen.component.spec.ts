import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { SplashScreenService } from '../../services/splash-screen.service';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;
  let splashService: SplashScreenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashScreenComponent ],
      providers: [ 
        { 
          provide: SplashScreenService,
          useValue: {
            subscribe: () => of(new Subscription)
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;

    splashService = fixture.debugElement.injector.get(SplashScreenService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    const spy1 = jest.spyOn(splashService, 'subscribe').mockReturnValueOnce(new Subscription);
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
