import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service';
import { WaitingTimeService } from '../../../../coverages/service/waiting-time.service';

@Component({
  selector: 'refactoring-smartcore-mf-waiting-time',
  templateUrl: './waiting-time.component.html',
  styleUrls: ['./waiting-time.component.scss'],
})
/**
 * component that handles the waiting time and events in coverages
 */
export class WaitingTimeComponent implements OnInit, OnChanges {
  @Input() formWaitingTime: any = new FormGroup({});
  @Input() formEvents: any = new FormGroup({});
  waitingTimePeriod: any[] = [];
  eventsPeriod: any[] = [];
  /**
   * constructor
   * @param http
   * @param productService
   */
  constructor(
    private http: WaitingTimeService,
    public productService: ProductService
  ) {
    //contructor empty
  }

  /**
   * method to call the events request and waiting time
   */
  ngOnInit(): void {
    this.getWaitingTime();
    this.getEvents();
    if (this.formWaitingTime.get('quantity').value !== 0) {
      this.changeInputNumber(this.formWaitingTime, 'quantity');
    }
  }

  /**
   * method that calls to isTouchedForm if change are detected
   */
  ngOnChanges() {
    this.isTouchedForm(
      this.formWaitingTime,
      this.formWaitingTime.value.waitingTime
    );
    this.isTouchedForm(this.formEvents, this.formEvents.value.events);
  }

  /**
   * method that requests waiting time data
   */
  getWaitingTime() {
    this.http.getWaitingTime('PERIODO_CARENCIA').subscribe((res) => {
      this.waitingTimePeriod = res.body.nmValueList;
    });
  }

  /**
   * method that requests events data
   */
  getEvents() {
    this.http.getWaitingTime('PERIODO_EVENTO').subscribe((res) => {
      this.eventsPeriod = res.body.nmValueList;
    });
  }

  /**
   * method that enable or disable the form if option is checked in events or waiting time
   * @param form
   * @param checked
   */
  isTouchedForm(form: FormGroup, checked: boolean) {
    setTimeout(() => {
      this.isTouchedFormEnable(form, checked);
    });
  }

  /**
   * enable or dibale form fields
   */
  isTouchedFormEnable(form: FormGroup, checked: boolean){
    if (checked) {
      form.get('quantity')?.enable();
      form.get('quantityEvents')?.enable();
      form.get('period')?.enable();
      form.get('periodEvents')?.enable();
      form.markAllAsTouched();
    } else {
      form.get('quantity')?.setValue(0);
      form.get('quantityEvents')?.setValue(0);
      form.get('period')?.setValue('');
      form.get('periodEvents')?.setValue('');
      form.get('quantity')?.disable();
      form.get('quantityEvents')?.disable();
      form.get('period')?.disable();
      form.get('periodEvents')?.disable();
    }
  }

  /**
   * according to the period, sends validators to field quantity
   * @param form 
   * @param field 
   */
  changeInputNumber = (form: FormGroup, field: string) => {
    let value = form.get(field)?.value;
    if (field === 'quantity' && form.get('period')?.value !== '') {
      if (form.get('period')?.value === 'dia') {
        form
          .get(field)
          ?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(180),
          ]);
      }
      if (form.get('period')?.value === 'anio') {
        form
          .get(field)
          ?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(1),
          ]);
      }
      if (form.get('period')?.value === 'mes') {
        form
          .get(field)
          ?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(6),
          ]);
      }
    }
    form.get(field)?.setValue(value);
  };
  
  /**
   * according to the period, according to the period, does call to the validator
   * @param form 
   * @param field 
   */
  setValidators(form: FormGroup, field: string) {
    this.changeInputNumber(form, field);
  }
}
