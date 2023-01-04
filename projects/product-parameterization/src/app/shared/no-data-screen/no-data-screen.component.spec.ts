import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataScreenComponent } from './no-data-screen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('NoDataScreenComponent', () => {
  let component: NoDataScreenComponent;
  let fixture: ComponentFixture<NoDataScreenComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
       imports:[HttpClientTestingModule],
      declarations: [],
      providers: [ NoDataScreenComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(NoDataScreenComponent);
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('shootAction', () => {
      expect(component.shootAction()).toBeUndefined();
    })
    it('serviceDataControls', () => {
      expect(component.serviceDataControls).toBeDefined();
    });
  });


