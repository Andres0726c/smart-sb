import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveGroupFieldsComponent } from './reactive-group-fields.component';

describe('ReactiveGroupFieldsComponent', () => {
  let component: ReactiveGroupFieldsComponent;
  let fixture: ComponentFixture<ReactiveGroupFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveGroupFieldsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveGroupFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
