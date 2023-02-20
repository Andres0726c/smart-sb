import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationTypesComponent } from './modification-types.component';

describe('ModificationTypesComponent', () => {
  let component: ModificationTypesComponent;
  let fixture: ComponentFixture<ModificationTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
