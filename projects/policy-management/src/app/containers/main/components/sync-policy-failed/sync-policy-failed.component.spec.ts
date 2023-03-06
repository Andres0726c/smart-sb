import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { FilterPolicyFailed } from './interfaces/consult-policy-failed';

import { SyncPolicyFailedComponent } from './sync-policy-failed.component';

describe('SyncPolicyFailedComponent', () => {
  let component: SyncPolicyFailedComponent;
  let fixture: ComponentFixture<SyncPolicyFailedComponent>;
  let ref: DialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        SyncPolicyFailedComponent,
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncPolicyFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search with start date', () => {
    let filters: FilterPolicyFailed = component.filters;

    expect(component.search(filters)).toBeUndefined();
  });

  it('clearSearch', () => {
    component.clearSearch()
    expect(component.policies).toEqual([])
    expect(component.totalRecords).toEqual(0)
  })

  it('show modal consult', () => {
    expect(component.showModalConsulDetails()).toBeUndefined();
  });

  it('homologateProcess ok', () => {
    expect(component.homologateProcess(261)).toEqual("Emisión");
  });

});
