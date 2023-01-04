import { FormGroup, Validators, } from '@angular/forms';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WaitingTimeService } from '../service/waiting-time.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-waiting-time',
  templateUrl: './waiting-time.component.html',
  styleUrls: ['./waiting-time.component.scss']
})
export class WaitingTimeComponent implements OnInit, OnChanges {

  @Input() formWaitingTime:any = new FormGroup({});
  @Input() formEvents:any = new FormGroup({});
  waitingTimePeriod: any[] = []
  eventsPeriod: any[] = [];

  constructor(private http: WaitingTimeService, public service: ProductService) { }

  ngOnInit(): void {
    this.getWaitingTime();
    this.getEvents();
    if(this.formWaitingTime.get('quantity').value !==0)
    this.changeInputNumber(this.formWaitingTime, 'quantity');
  }

  ngOnChanges(){
    this.isTouchedForm(this.formWaitingTime, this.formWaitingTime.value.waitingTime);
    this.isTouchedForm(this.formEvents, this.formEvents.value.events);
  }

  getWaitingTime(){
    this.http.getWaitingTime('PERIODO_CARENCIA').subscribe((res) => {
      this.waitingTimePeriod = res.body.nmValueList;
    });
  }

  getEvents(){
    this.http.getWaitingTime('PERIODO_EVENTO').subscribe((res) => {
      this.eventsPeriod = res.body.nmValueList;
    });
  }

  isTouchedForm(form: FormGroup, checked:boolean){
    if(checked){
      form.get('quantity')?.enable()
      form.get('quantityEvents')?.enable()
      form.get('period')?.enable()
      form.get('periodEvents')?.enable()
      form.markAllAsTouched();
    }else{
      form.get('quantity')?.setValue(0)
      form.get('quantityEvents')?.setValue(0)
      form.get('period')?.setValue('')
      form.get('periodEvents')?.setValue('')
      form.get('quantity')?.disable()
      form.get('quantityEvents')?.disable()
      form.get('period')?.disable()
      form.get('periodEvents')?.disable()
    }
  }
  
  changeInputNumber = (form: FormGroup, field: string) => {

    let value  = form.get(field)?.value.replace(/[^0-9]/gm,'');
    value = Math.trunc(Number.parseInt(value,10)).toString(10).replace(/^NaN|$/gm,'');
  
    if (field === 'quantity' && form.get('period')?.value !== '') {
      if (form.get('period')?.value === 'dia') {
        form.get(field)?.setValidators([Validators.required, Validators.min(1), Validators.max(180)]);
      }
      if (form.get('period')?.value === 'anio') {
        form.get(field)?.setValidators([Validators.required, Validators.min(1), Validators.max(1)]);
      }
      if (form.get('period')?.value === 'mes') {
        form.get(field)?.setValidators([Validators.required, Validators.min(1), Validators.max(6)]);
      }
    }
    form.get(field)?.setValue(value);
  };

  setValidators(form: FormGroup, field: string){
    this.changeInputNumber(form,field);
  }
}
