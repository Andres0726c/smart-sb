import { FilterPolicy } from './../interfaces/consult-policy';
import { ConsultPolicyService } from './../services/consult-policy.service';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Identification } from '../interfaces/identification';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/dropdown';
interface FieldDocument {
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
  @Output() emitClear = new EventEmitter();
  @ViewChild('dropdownProduct') dropdownProduct!: Dropdown;

  chargeDataDropdownProduct: boolean = false;
  subscription!: Subscription;

  formQueryFilter: FormGroup;

  holderValid: boolean = false;
  insuredValid: boolean = false;

  products: Product[] = [];
  documentsType: Identification[] = [];

  showMoreFilters: boolean = false;

  errorAllForm: boolean = false;

  isRequired: { [key: string]: boolean } = {
    policyNumber: true,
    holderDocument: true,
    insuredDocument: true,
  };

  holderFields: FieldDocument = {
    type: 'holderdocumentType',
    number: 'holderdocumentNumber',
  };
  insuredFields: FieldDocument = {
    type: 'insuredDocumentType',
    number: 'insuredDocumentNumber',
  };

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
      externalPolicyNumber: this.fb.control('', Validators.minLength(20)),
      idProduct: this.fb.control(''),
      startDate: this.fb.control(''),
    });
    this.getProductsData("")
    consultPolicyService.getDocumentType().subscribe((data) => {
      this.documentsType = data;
    });

    this.productService
      .getApiData('city/findByState', '', '0')
      .subscribe((res) => {
        this.setData(res, 'city');
      });

    this.productService
      .getApiData('state/statefindbycountry', '', 'CO')
      .subscribe((res) => {
        this.setData(res, 'state');
      });

    this.productService.getApiData('paymentmethod/findAll').subscribe((res) => {
      this.setData(res, 'paymentmethod');
    });

    this.productService
      .getApiData('identificationtype/findAllIdentification')
      .subscribe((res) => {
        this.setData(res, 'identificationtype');
      });

    this.productService
      .getApiData('turnoverperiod/findAll')
      .subscribe((res) => {
        this.setData(res, 'turnoverperiod');
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

    res.forEach((element: any) => {
      let obj: any = { id: element.code ?? element.businessCode, name: type === 'turnoverperiod' ? element.name : element.description };
      if (obj.id != '' && obj.id != undefined) {
        options.push(obj);
      }
    });

    localStorage.setItem(type, JSON.stringify(options));
    list = localStorage.getItem(type);
    optionsAux = JSON.parse(list);
  }

  validateFields(field: FieldDocument): boolean {
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

  get externalPolicyNumber(): FormControl {
    return this.formQueryFilter.get('externalPolicyNumber') as FormControl;
  }

  seeMore() {
    this.showMoreFilters = !this.showMoreFilters;
  }

  search() {
    this.toggleRequired(true);
    this.errorAllForm = this.validForm();
    if (!this.errorAllForm) {
      let queryFilter = this.formQueryFilter.value;
      if(queryFilter.startDate==null) queryFilter.startDate = ''
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

  onFilterDropdownProduct(event:{originalEvent: InputEvent, filter:string}){
    this.getProductsData(event.filter)
  }

  getProductsData(filter:string) {
    this.chargeDataDropdownProduct=true;
    if(this.subscription) this.subscription.unsubscribe()
    this.subscription = this.productService.getAllProductsByCompany(3,filter).subscribe((data) => {
      this.products = data;
      this.chargeDataDropdownProduct=false;
    });
  }
}
