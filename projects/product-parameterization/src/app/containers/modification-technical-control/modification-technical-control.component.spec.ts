import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificationTechnicalControlComponent } from './modification-technical-control.component';
import { AngularMaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ModificationTechnicalControlComponent', () => {
  let component: ModificationTechnicalControlComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [],
      providers: [
        ModificationTechnicalControlComponent,
      ],
      schemas: [],
    });
    component = TestBed.inject(ModificationTechnicalControlComponent);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
