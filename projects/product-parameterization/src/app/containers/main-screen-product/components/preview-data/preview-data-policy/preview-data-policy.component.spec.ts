import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewDataPolicyComponent } from './preview-data-policy.component';

describe('PreviewDataPolicyComponent', () => {
  let component: PreviewDataPolicyComponent;
  let fixture: ComponentFixture<PreviewDataPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewDataPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewDataPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
