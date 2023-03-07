import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabilitationDataComponent } from './rehabilitation-data.component';

describe('RehabilitationDataComponent', () => {
  let component: RehabilitationDataComponent;
  let fixture: ComponentFixture<RehabilitationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RehabilitationDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RehabilitationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
