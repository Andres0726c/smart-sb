import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageTreeComponent } from './coverage-tree.component';

describe('CoverageTreeComponent', () => {
  let component: CoverageTreeComponent;
  let fixture: ComponentFixture<CoverageTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverageTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
