import { FilterPolicy } from './../interfaces/consult-policy';
import { ConsultPolicyService } from './../services/consult-policy.service';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Product } from 'apps/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'apps/policy-management/src/app/core/services/product/product.service';
import { Identification } from '../interfaces/identification';

interface fieldDocument {
  type: string;
  number: string;
}
@Component({
  selector: 'app-filter-policy-top',
  templateUrl: './filter-policy-top.component.html',
  styleUrls: ['./filter-policy-top.component.scss'],
})
export class FilterPolicyTopComponent {
  @Output() emitSearch = new EventEmitter<FilterPolicy>();

  formQueryFilter: FormGroup;

  holderValid: boolean = false;
  insuredValid: boolean = false;

  products!: Product[];
  documentsType!: Identification[];

  showMoreFilters: boolean = false;

  errorAllForm: boolean = false;

  isRequired: { [key: string]: boolean } = {
    policyNumber: true,
    holderDocument: true,
    insuredDocument: true,
  };

  holderFields: fieldDocument = {    type: 'holderdocumentType',  number: 'holderdocumentNumber',  };
  insuredFields: fieldDocument = {    type: 'insuredDocumentType',    number: 'insuredDocumentNumber',  };

  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    public consultPolicyService: ConsultPolicyService
  ) {
    this.formQueryFilter = this.fb.group({
      holderdocumentType: this.fb.control(''),
      holderdocumentNumber: this.fb.control(''),
      holderName: this.fb.control(''),
      insuredDocumentType: this.fb.control(''),
      insuredDocumentNumber: this.fb.control(''),
      insuredName: this.fb.control(''),
      policyNumber: this.fb.control(''),
      idProduct: this.fb.control(''),
      startDate: this.fb.control(''),
    });
    productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
    consultPolicyService.getDocumentType().subscribe((data) => {
      this.documentsType = data;
    });
  }

  validateFields(field: fieldDocument): boolean {
    let type: number = this.formQueryFilter.get(field.type)?.value ? 1 : 0;
    let number: number = this.formQueryFilter.get(field.number)?.value ? 1 : 0;
    if (type & number) {
      return true;
    }
    return false;
  }

  get holderDocumentType(): FormControl {
    return this.formQueryFilter.get('holderdocumentType') as FormControl;
  }

  get holderDocumentNumber(): FormControl {
    return this.formQueryFilter.get('holderdocumentNumber') as FormControl;
  }

  get insuredDocumentType(): FormControl {
    return this.formQueryFilter.get('insuredDocumentType') as FormControl;
  }

  get insuredDocumentNumber(): FormControl {
    return this.formQueryFilter.get('insuredDocumentNumber') as FormControl;
  }

  get policyNumber(): FormControl {
    return this.formQueryFilter.get('policyNumber') as FormControl;
  }

  seeMore() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  search() {
    this.toggleRequired(true);
    this.errorAllForm = this.validForm();
    if (!this.errorAllForm) {
      this.emitSearch.emit(this.formQueryFilter.value);
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
    this.holderValid = this.validateFields(this.holderFields);
    this.insuredValid = this.validateFields(this.insuredFields);
    if (this.policyNumber.value) {
      if (!this.holderValid) {
        this.clearFields(this.holderFields);
      }
      if (!this.insuredValid) {
        this.clearFields(this.insuredFields);
      }
      this.toggleRequired(false);
      return false;
    } else if (this.holderValid) {
      if (!this.insuredValid) {
        this.clearFields(this.insuredFields);
      }
      this.toggleRequired(false);
      return false;
    } else if (this.insuredValid) {
      this.toggleRequired(false);
      return false;
    }
    return true;
  }

  clearFields(fields: fieldDocument) {
    this.formQueryFilter.get(fields.type)?.setValue('');
    this.formQueryFilter.get(fields.number)?.setValue('');
  }

  cleanFilter() {
    for (const field in this.formQueryFilter.controls) {
      this.formQueryFilter.get(field)?.setValue('');
    }
  }
}
