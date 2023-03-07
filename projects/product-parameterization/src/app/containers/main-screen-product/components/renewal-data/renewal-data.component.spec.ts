import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalDataComponent } from './renewal-data.component';

describe('RenewalDataComponent', () => {
  let component: RenewalDataComponent;
  let fixture: ComponentFixture<RenewalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
