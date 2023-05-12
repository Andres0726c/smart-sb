import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDataScreenComponent } from './no-data-screen.component';

describe('NoDataScreenComponent', () => {
  let component: NoDataScreenComponent;
  let fixture: ComponentFixture<NoDataScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDataScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDataScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shootAction', () => {
    expect(component.shootAction()).toBeUndefined();
  });
});
