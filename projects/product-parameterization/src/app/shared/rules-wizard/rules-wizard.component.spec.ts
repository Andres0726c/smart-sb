import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesWizardComponent } from './rules-wizard.component';

describe('RulesWizardComponent', () => {
  let component: RulesWizardComponent;
  let fixture: ComponentFixture<RulesWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
