import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';

describe('ModificationTechnicalControlComponent', () => {
  let component: ModificationTechnicalControlComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [ModificationTechnicalControlComponent],
      schemas: [],
    });
    component = TestBed.inject(ModificationTechnicalControlComponent);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
