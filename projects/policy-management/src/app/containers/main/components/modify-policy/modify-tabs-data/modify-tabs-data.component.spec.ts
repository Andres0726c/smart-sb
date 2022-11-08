import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTabsDataComponent } from './modify-tabs-data.component';

describe('ModifyTabsDataComponent', () => {
  let component: ModifyTabsDataComponent;
  let fixture: ComponentFixture<ModifyTabsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTabsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyTabsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
