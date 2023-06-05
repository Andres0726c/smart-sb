import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingTimeService } from '../service/waiting-time.service';

import { WaitingTimeComponent } from './waiting-time.component';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

class dialogMock {
  open() {
    return {
      afterClosed: () => of([{
        id         : 1,
        name       : 'name test return',
        description: 'description test return'
      }])
    };
  }
}
class toastMock {
  openFromComponent() {} 
}

describe('WaitingTimeComponent', () => {
  let component: WaitingTimeComponent;
  let fixture: ComponentFixture<WaitingTimeComponent>;

  let http: WaitingTimeService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      declarations: [],
      providers: [WaitingTimeService,
      WaitingTimeComponent,
      FormBuilder,
      {
        provide: MatDialog,
        useValue: new dialogMock()
      },
      {
        provide: MatSnackBar,
        useValue: new toastMock()
      },
      {
        provide: ProductService,
        useValue: {
          formWaitingTime: new FormArray([
            new FormGroup({
              quantity: new FormControl({value:0, disabled: true}),
              period: new FormControl({value:0, disabled: true})
            })
          ]),
        },
      },
      
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(WaitingTimeComponent);
    http= TestBed.inject(WaitingTimeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit Ok', () => {
    component.formWaitingTime =  new FormGroup({
        quantity: new FormControl({value:0, disabled: true}),
        period: new FormControl({value:0, disabled: true})
      });
  
    expect(component.ngOnInit()).toBeUndefined();
    
  });

  it('ngOnInit when quantity is diferent 0', () => {
    component.formWaitingTime =  new FormGroup({
        quantity: new FormControl(1)
      });
      jest.spyOn(component,'getWaitingTime').mockImplementation();
      jest.spyOn(component,'getEvents').mockImplementation();
      jest.spyOn(component,'changeInputNumber').mockImplementation();  
    expect(component.ngOnInit()).toBeUndefined();
    
  });

  it('getWaitingTime',()=>{
    let res={body:{nmValueList:''},header:{}}
    jest.spyOn(http,'getWaitingTime').mockReturnValue(of(res));
    expect(component.getWaitingTime()).toBeUndefined();
  })

  it('getEvents',()=>{
    let res={body:{nmValueList:''},header:{}}
    jest.spyOn(http,'getWaitingTime').mockReturnValue(of(res));
    expect(component.getEvents()).toBeUndefined();
  })

  it('changeInputNumber when period is dia',()=>{
    let group= new FormGroup({
      quantity: new FormControl("a1b2c3"),
      period: new FormControl('dia')
    })
    expect(component.changeInputNumber(group,'quantity')).toBeUndefined();
  })

  it('changeInputNumber when period is anio',()=>{
    let group= new FormGroup({
      quantity: new FormControl("a1b2c3"),
      period: new FormControl('anio')
    })
    expect(component.changeInputNumber(group,'quantity')).toBeUndefined();
  })

  it('changeInputNumber when period is mes',()=>{
    let group= new FormGroup({
      quantity: new FormControl("a1b2c3"),
      period: new FormControl('mes')
    })
    expect(component.changeInputNumber(group,'quantity')).toBeUndefined();
  })

  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });

  it('Waiting Time is checked',()=>{
    let form = new FormGroup({
      quantity: new FormControl({value:'', disabled: true}),
      period: new FormControl({value:'', disabled: true})
    })
    component.isTouchedForm(form,true)
    expect(form.get('quantity')?.enabled).toBeTruthy();
    expect(form.get('period')?.enabled).toBeTruthy();
  })

  it('Waiting Time is unchecked',()=>{
    let form = new FormGroup({
      quantity: new FormControl({value:'12', disabled: true}),
      period: new FormControl({value:'dias', disabled: true})
    })
    component.isTouchedForm(form,false)
    expect(form.get('quantity')?.value).toEqual(0);
    expect(form.get('period')?.value).toEqual('');
    expect(form.get('period')?.disabled).toBeTruthy();
    expect(form.get('period')?.disabled).toBeTruthy();
  })

  it('format input quantity',()=>{
    let form = new FormGroup({
      quantity: new FormControl({value:'5-7', disabled: true}),
    })
    component.changeInputNumber(form, 'quantity')
    expect(form.get('quantity')?.value).toEqual('57')
  })

  it('setValidators', () => {
    let form = new FormGroup({
      quantity: new FormControl({value:'', disabled: true}),
      period: new FormControl({value:'', disabled: true})
    });

    expect(component.setValidators(form, 'quantity')).toBeUndefined();
  });
});
