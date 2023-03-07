import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationDataComponent } from './cancellation-data.component';

describe('CancellationDataComponent', () => {
  let component: CancellationDataComponent;
  let fixture: ComponentFixture<CancellationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
