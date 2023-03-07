import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommercialPlanTypeComponent } from './commercial-plan-type.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';


describe('CommercialPlanTypeComponent', () => {
  let component: CommercialPlanTypeComponent;
  let fixture: ComponentFixture<CommercialPlanTypeComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CommercialPlanTypeComponent ],
       providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        CommercialPlanTypeComponent,
        ProductService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: MatSnackBar,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialPlanTypeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('fillTableData',()=>{
  //    let data={coverages:[{id: 5, required: true},{id: 7, required: true}, {id: 8, required: true}],servicePlans:[{id: 2, required: true},{id: 4, required: true}]}
  //   let res=[{businessRules:{selectionRule: [], initializeRule: [], validateRule: []},claimReservation: [],clauses: [],complementaryData: [],deductibles: [],description: "Gastos veterinarios",events: {events: false, quantityEvents: 0, periodEvents: ''},id: 5,name: "Gastos veterinarios",payRollData: [],rates: [],required: {id: 5, required: true},waitingTime: {waitingTime: false, quantity: 0, period: ''}}]
  //   let res1=[{clauses: [],description: "Servicio de guardería para mascotas, Chip de identificación para mascotas, Asistencia legal telefónica, referencia y coordinación con especialistas",id: 4,name: "Asistencias mascotas"}]
  //   const spy = jest.spyOn(productService, 'getCoverageById').mockReturnValue(of(res));
  //   const spy1 = jest.spyOn(productService, 'getServicePlanById').mockReturnValue(of(res1));
  //   component.fillTableData(data);
  // expect(spy).toBeCalled();
  // expect(spy1).toBeCalled();

  //   });
it('ngOnchanges',()=>{
  component.data='pc001_daviplata1';
  fixture.detectChanges();
  const spy=jest.spyOn(component,'addDataTable').mockImplementation();
  component.ngOnChanges({
    data:new SimpleChange(null,'pc001_daviplata1',false)
  });
  expect(spy).toBeCalled();
});
it('addDataTable', ()=>{
     let data: any=[{athrzdOprtn: [ {name: 'Modificar', key: 'MDF'}],code: "pc001_daviplata1",coverages:[{id: 5, required: true},{id: 7, required: true}, {id: 8, required: true}],description: "opcion 1 alternativa 1",name: "DAVIPLATA 1",servicePlans:[{id: 2, required: true},{id: 4, required: true}]}];
     component.data='pc001_daviplata1'
  localStorage.setItem('pc001_daviplata1',JSON.stringify(data));
//  const spy=jest.spyOn(component,'fillTableData').mockImplementation();
  component.addDataTable();
  expect(component.addDataTable()).toBeUndefined();
})
    it('changeCheckServices',()=>{
      component.changeCheckServices();
    })

    it('changeCheck',()=>{
      let data={ businessRules:{selectionRule:[], initializeRule:[], validateRule:[]},claimReservation:[{id: 1, cause: {id: 68, name: 'Accidente / enfermedad'}, relCauseConcept: [{concept: {id: 175}, isAutomaticReservation: false, calculationRule: {}}]}],clauses: [],complementaryData: [],deductibles: [],description: "string",events: {events: false, quantityEvents: 0, periodEvents: ''},id: 1,name: "",payRollData: [],rates: [],waitingTime: [],required: true,athrzdOprtnCoverages:  [ {name: 'Modificar', key: 'MDF'}]};
      component.changeCheck(data);
    })

    it('activeButton',()=>{
      let data={ athrzdOprtnCoverages:  [ {name: 'Modificar', key: 'MDF'}]};
      component.activeButton(data);
    })
});

