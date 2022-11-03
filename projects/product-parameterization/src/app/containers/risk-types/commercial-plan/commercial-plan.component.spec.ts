import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommercialPlanComponent } from './commercial-plan.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormArray, FormsModule, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ProductService } from '../../../services/product.service';

class dialogMock {
  open() {
    return {
      afterClosed: () =>
        of([
          {
            id: 1,
            name: 'name test return',
            description: 'description test return',
          },
        ]),
    };
  }
}
class toastMock {
  openFromComponent() {} 
}
describe('CommercialPlanComponent', () => {
  let component: CommercialPlanComponent;
  let fixture: ComponentFixture<CommercialPlanComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule,MatDialogModule],
      declarations: [],
      providers: [CommercialPlanComponent,
        ProductService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide: MatDialog,
          useValue: new dialogMock(),
        },
        {
          provide: MatSnackBar,
          useValue: new toastMock()
        },
        {
          provide: MatDialogRef,
          useValue:  new dialogMock()
        }, 
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CommercialPlanComponent);
    component.CommertialPlan = new FormArray([]);
    let element: any;
    element = {
      name: '',
      description: '',
      coverages: '',
      servicePlans: ''
    }
    component.CommertialPlanControls.push(component.fb.control(element));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('openwizzard create',()=>{
    expect(component.openwizzard("create")).toBeUndefined();
  });

  it('autoIncrementCustomId',()=>{
    expect(component.autoIncrementCustomId(10,'name')).toBeDefined();
  });

  it('autoIncrementCustomIdLargeName',()=>{
    expect(component.autoIncrementCustomId(2,'Mi casa nueva premium bolivar')).toBeDefined();
  });

  it('deletePlan',()=>{
    let obj:any ={
      name:'nombre',
      description: 'description',
      coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado'}],
      servicePlans: [{clauses: [],
        description: "Plan que tiene hasta 6 coberturas",
        id: 2,
        name: "Plan estándar"}]
    }
    expect(component.deletePlan(obj)).toBeUndefined();
  });
  it('editWizard edit',()=>{
    let obj:any ={
      name:'nombre',
      description: 'description',
      coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado'}],
      servicePlans: [{clauses: [],
        description: "Plan que tiene hasta 6 coberturas",
        id: 2,
        name: "Plan estándar"}]
    }
    expect(component.editWizard("edit",obj)).toBeUndefined();
  });

   it('FormCommercialPlan',()=>{
    let commercialPlan  = component.fb.group({
      step1: component.fb.group({
        name: component.fb.control('',[Validators.required, Validators.maxLength(200), Validators.minLength(4)]),
        description: component.fb.control('',[Validators.required, Validators.maxLength(2000), Validators.minLength(20)])
      }),
      coverages: component.fb.array([]),
      servicesPlan:component.fb.array([])
    });

    component.CommercialPlan = commercialPlan;

    expect(component.FormCommercialPlan).toBeDefined();

   });

  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });

  it('reset Ok', () => {
    expect(component.reset()).toBeUndefined();
  });

  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });
  it('ngAfterViewInit Ok', () => {
    component.ngAfterViewInit();
    expect(component).toBeDefined();
  });
  it('getSuccessStatus  Ok', () => {
    component.getSuccessStatus('','');
    expect(component).toBeDefined();
  });

  it('eliminarDiacriticos  Ok', () => {
    component.eliminarDiacriticos('VALIDANDÓ');
    expect(component).toBeDefined();
  });

  it('getMax  Ok', () => {
    expect(component.getMax([{id: 1}, {id: 2}], 'id')).toEqual(2);
  });

  it('getMax Zero', () => {
    expect(component.getMax([], 'id')).toEqual(0);
  });
});
