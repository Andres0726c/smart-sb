import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommercialPlanComponentWizard } from './commercial-plan-wizard.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
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
  closeAll(){
    
  }
}
class toastMock {
  openFromComponent() {} 
}
describe('CommercialPlanComponentWizard', () => {
  let component: CommercialPlanComponentWizard;
  let fixture: ComponentFixture<CommercialPlanComponentWizard>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [ CommercialPlanComponentWizard ,
        ProductService,FormBuilder,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }, 
        {
          provide: MatSnackBar,
          useValue: new toastMock()
        }
        ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(CommercialPlanComponentWizard);

    let commercialPlan  = component.fb.group({
      step1: component.fb.group({
        name: component.fb.control('',[Validators.required, Validators.maxLength(200), Validators.minLength(4)]),
        description: component.fb.control('',[Validators.required, Validators.maxLength(2000), Validators.minLength(20)])
      }),
      coverages: component.fb.array([]),
      servicesPlan:component.fb.array([])
    });

    let coverages:FormArray = component.fb.array([], [Validators.required]);


    component.data = { action: "create", dataCoverages:coverages,CommercialPlan:commercialPlan}

    let element = {
      id: 1,
      name: 'name',
      description: 'description',
      clauses: [],
    };

  });

  it('Componente inicializado', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('Vista inicializada', () => {
    component.data.CommercialPlan = new FormGroup({
      servicePlans: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ]),
      coverages: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ])
    }) 
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('openDialogCoverages',()=>{
    expect(component.openDialogCoverages("code")).toBeUndefined();
  });

  it('openModalPlans',()=>{
    component.data.CommercialPlan = new FormGroup({
      servicePlans: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ]),
      coverages: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ])
    }) 
    expect(component.openModalPlans("code")).toBeUndefined();
  });

  it('createCommertialPlan',()=>{
    component.data.CommercialPlan = new FormGroup({
      servicePlans: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ]),
      coverages: new FormArray([
        new FormGroup({
          id: new FormControl(1),
          name: new FormControl('test')
        })
      ])
    }) 
    expect(component.createCommertialPlan()).toBeDefined();
  });

  it('deleteCoverage',()=>{
    let obj:any ={
      name:'nombre',
      description: 'description',
      coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado'}],
      servicePlans: [{clauses: [],
        description: "Plan que tiene hasta 6 coberturas",
        id: 2,
        name: "Plan estándar"}]
    }

    expect(component.deleteCoverage(obj)).toBeUndefined();
  });

  it('closeWizard', () => {
     expect(component.closeWizard()).toBeUndefined();
  });

  it('FormCommercialPlan', () => {
    expect(component.FormCommercialPlan).toBeDefined();
  });

  // it('openModalPlans', () => {
  //   expect(component.openModalPlans('')).toBeUndefined();
  // });

  it('deleteCoverage',()=>{
    let obj:any ={
      name:'nombre',
      description: 'description',
      coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado'}],
      servicePlans: [{clauses: [],
        description: "Plan que tiene hasta 6 coberturas",
        id: 2,
        name: "Plan estándar"}]
    }

    expect(component.deleteServicePlan(obj.servicePlans)).toBeUndefined();
  });

  // it('createCommertialPlan',()=>{
  //   let obj:any ={
  //     name:'nombre',
  //     description: 'description',
  //     coverages: [{id: 2, name: 'Hurto calificado', description: 'Hurto calificado',required:true,}],
  //     servicePlans: [{clauses: [],
  //       description: "Plan que tiene hasta 6 coberturas",
  //       id: 2,
  //       name: "Plan estándar",
  //      required:true,}]
  //   }
  //   expect(component.createCommertialPlan()).toBeUndefined();
  // });

  it('hasError',()=>{
    let commercialPlan  = component.fb.group({
      step1: component.fb.group({
        name: component.fb.control('',[Validators.required, Validators.maxLength(200), Validators.minLength(4)]),
        description: component.fb.control('',[Validators.required, Validators.maxLength(2000), Validators.minLength(20)])
      }),
      coverages: component.fb.array([]),
      servicesPlan:component.fb.array([])
    });

    let coverages:FormArray = component.fb.array([], [Validators.required]);

    component.data = { action: "create", dataCoverages:coverages,CommercialPlan:commercialPlan}

    expect(component.errorMessageName).toBeDefined();

    expect(component.errorMessageDesc).toBeDefined();

  });

  it('requeridForm',()=>{
    expect(component.requeridForm({required: false},true)).toBeUndefined();
  });

  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });

  it('applyFilterServicePlan Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilterServicePlan(event)).toBeUndefined();
  });

});
