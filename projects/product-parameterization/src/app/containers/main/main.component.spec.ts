import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { MainComponent } from './main.component';

class DialogMock {
  open() {
    return {
      afterClosed: () => of([{
        id         : 1,
        name       : 'name test return',
        description: 'description test return'
      }])
    };
  }
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [MainComponent],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: {
            url: '/productos'
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
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

    component.productService.initialParameters.get('productName')?.setValue('test');
    component.productService.initialParameters.get('businessCode')?.setValue('test');
    component.productService.initialParameters.get('insuranceLine')?.setValue('test');

    jest.spyOn(component.productService,'saveProduct').mockImplementation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`signOut`, () => {
    expect(component.signOut()).toBeDefined();
  });
});
