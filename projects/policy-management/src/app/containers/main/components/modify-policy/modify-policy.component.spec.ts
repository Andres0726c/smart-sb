import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPolicyComponent } from './modify-policy.component';

describe('ModifyPolicyComponent', () => {
  let component: ModifyPolicyComponent;
  let fixture: ComponentFixture<ModifyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
