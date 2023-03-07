import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessParameterizationSharedComponent } from './process-parameterization-shared.component';

describe('ProcessParameterizationSharedComponent', () => {
  let component: ProcessParameterizationSharedComponent;
  let fixture: ComponentFixture<ProcessParameterizationSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessParameterizationSharedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessParameterizationSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
