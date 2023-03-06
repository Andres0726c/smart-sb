import { TestBed } from '@angular/core/testing';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PolicyFailedDetailsComponent } from './policy-failed-details.component';

describe('PolicyDetailsComponent', () => {
  let component: PolicyFailedDetailsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        PolicyFailedDetailsComponent,
        DynamicDialogRef,
        DialogService,
        DynamicDialogConfig
      ],
    });
    component = TestBed.inject(PolicyFailedDetailsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close modal', () => {
    expect(component.close()).toBeUndefined();
  });

  it('homologateProcess ok', () => {
    expect(component.homologateProcess(261)).toEqual("Emisión");
  });

});