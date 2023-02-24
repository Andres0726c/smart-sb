import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationTypesRiskComponent } from './modification-types-risk.component';

describe('ModificationTypesRiskComponent', () => {
  let component: ModificationTypesRiskComponent;
  let fixture: ComponentFixture<ModificationTypesRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationTypesRiskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTypesRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
