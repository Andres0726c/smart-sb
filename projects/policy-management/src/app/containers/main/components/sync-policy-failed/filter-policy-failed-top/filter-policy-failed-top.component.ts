
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
import { SyncPolicyFailedService } from '../services/sync-policy-failed.service';
import { FilterPolicyFailed } from '../interfaces/consult-policy-failed';
interface FieldDocument {
  type: string;
  number: string;
}
@Component({
  selector: 'app-filter-policy-failed-top',
  templateUrl: './filter-policy-failed-top.component.html',
  styleUrls: ['./filter-policy-failed-top.component.scss'],
})
export class FilterPolicyFailedTopComponent {
  @Output() emitSearch = new EventEmitter<FilterPolicyFailed>();
  @Output() emitClear = new EventEmitter();
  @ViewChild('dropdownProduct') dropdownProduct!: Dropdown;

  chargeDataDropdownProduct: boolean = false;
  subscription!: Subscription;

  formQueryFilter: FormGroup;

  holderValid: boolean = false;
  insuredValid: boolean = false;

  errorAllForm: boolean = false;

  isRequired: { [key: string]: boolean } = {
    smartCorePolicyNumber: true,
    tronPolicyNumber: true,
  };

  processPolicy : any = [
    {name: 'Emisión', value: '261'},
    {name: 'Modificación', value: '281'},
    {name: 'Cancelación', value: '351'},
    {name: 'Renovación', value: '441'},
    {name: 'Rehabilitación', value: '401'}
  ];

  constructor(
    public fb: FormBuilder,
    public syncPolicyFailedService: SyncPolicyFailedService
  ) {
    this.formQueryFilter = this.fb.group({
      smartCorePolicyNumber: this.fb.control(''),
      tronPolicyNumber: this.fb.control(''),
      process: this.fb.control(''),
      date: this.fb.control(''),
    });
  }

  setData(res: any, type: any) {
    if (Array.isArray(res.body)) {
      this.addToElementData(res.body, type);
    } else {
      this.addToElementData([res.body], type);
    }
  }

  addToElementData(res: any[], type: any) {
    let options: any = [];
    let list: any = [];
    let optionsAux: any = [];

    localStorage.setItem(type, JSON.stringify(options));
    list = localStorage.getItem(type);
    optionsAux = JSON.parse(list);
  }

  get smartCorePolicyNumber(): FormControl {
    return this.formQueryFilter.get('smartCorePolicyNumber') as FormControl;
  }

  get tronPolicyNumber(): FormControl {
    return this.formQueryFilter.get('tronPolicyNumber') as FormControl;
  }

  get process(): FormControl {
    return this.formQueryFilter.get('process') as FormControl;
  }

  search() {
    this.toggleRequired(true);
    this.errorAllForm = this.validForm();
    if (!this.errorAllForm) {
      let queryFilter = this.formQueryFilter.value;
      if(queryFilter.date==null) queryFilter.date = ''
      this.emitSearch.emit(queryFilter);
    } else {
      this.markAsDirtyForm();
    }
  }

  markAsDirtyForm() {
    for (const field in this.formQueryFilter.controls) {
      this.formQueryFilter.get(field)?.markAsDirty();
    }
  }

  toggleRequired(state: boolean) {
    for (const field in this.isRequired) {
      this.isRequired[field] = state;
    }
  }

  validForm(): boolean {
    return false;
  }

  clearFields(fields: FieldDocument) {
    this.formQueryFilter.get(fields.type)?.setValue('');
    this.formQueryFilter.get(fields.number)?.setValue('');
  }

  cleanFilter() {
    for (const field in this.formQueryFilter.controls) {
      this.formQueryFilter.get(field)?.setValue('');
    }
    this.toggleRequired(false);
    this.errorAllForm = false;
    this.emitClear.emit();
  }

  onClearField(field: string) {
    this.formQueryFilter.get(field)?.setValue('');
  }
}
