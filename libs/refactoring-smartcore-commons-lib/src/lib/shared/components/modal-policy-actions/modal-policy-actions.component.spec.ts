import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalPolicyActionsComponent } from './modal-policy-actions.component';

@Component({
  template: `
  <div class="TestDynamicDialog">
  </div>
  `
})
export class TestDynamicDialogComponent {
  constructor(public dialogService: DialogService) {}

  show() {
    this.dialogService.open(ModalPolicyActionsComponent, {
      data: {
        policy: {}
      },
      header: 'Demo Header',
      width: '70%',
      contentStyle: {"max-height": "350px", "overflow": "auto"},
      dismissableMask: true,
      baseZIndex: 0
    });
  }
}

describe('ModalPolicyActionsComponent', () => {
  let component: TestDynamicDialogComponent;
  let fixture: ComponentFixture<TestDynamicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDynamicDialogComponent],
      providers: [
        DialogService,
        DynamicDialogConfig,
        DynamicDialogRef,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestDynamicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixtureAux = TestBed.createComponent(ModalPolicyActionsComponent);
    const componentAux = fixtureAux.componentInstance;
    expect(componentAux).toBeTruthy();
  });

  it('ngOnInit', () => {
    const fixtureAux = TestBed.createComponent(ModalPolicyActionsComponent);
    const componentAux = fixtureAux.componentInstance;
    expect(componentAux.ngOnInit()).toBeUndefined();
  });
});
