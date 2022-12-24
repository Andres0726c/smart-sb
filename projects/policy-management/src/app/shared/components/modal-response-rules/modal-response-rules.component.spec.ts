import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponseRulesComponent } from './modal-response-rules.component';

describe('ModalResponseRulesComponent', () => {
  let component: ModalResponseRulesComponent;
  let fixture: ComponentFixture<ModalResponseRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResponseRulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResponseRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
