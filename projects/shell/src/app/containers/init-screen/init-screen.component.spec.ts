import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitScreenComponent } from './init-screen.component';
import { CognitoService } from 'commons-lib';

describe('InitScreenComponent', () => {
  let component: InitScreenComponent;
  let fixture: ComponentFixture<InitScreenComponent>;
  let service: CognitoService;
 let mockCognitoService = {
    getUser: jest.fn().mockResolvedValue({
      attributes: {
        'custom:moduleAccess': 'admin,user',
      },
    }),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitScreenComponent],
      providers: [{ provide: CognitoService, useValue: mockCognitoService }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InitScreenComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(CognitoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('ngOnInit',()=>{
    component.ngOnInit();
  })
  it('getModuleTrue',()=>{
    component.moduleAcess=['Consultar', 'Modificar', 'Rehabilitar', 'Renovar', 'Cancelar', 'Parametrizar']; 
    expect(component.getModule('Modificar')).toBeTruthy();
  });

  it('getModule',()=>{
    component.moduleAcess=['Consultar']; 
    expect(component.getModule('')).toBeFalsy();
  });

  it('getModuleFalse',()=>{ 
    expect(component.getModule('')).toBeFalsy();
  });
});
