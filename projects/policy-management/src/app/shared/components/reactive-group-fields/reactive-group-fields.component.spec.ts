import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';

describe('ReactiveGroupFieldsComponent', () => {
  let component: ReactiveGroupFieldsComponent;
  let fixture: ComponentFixture<ReactiveGroupFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveGroupFieldsComponent],
      providers: [
        ReactiveFormsModule,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveGroupFieldsComponent);
    component = fixture.componentInstance;

    component.group = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        name: new FormControl(test),
        fields: new FormArray([])
      })
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
