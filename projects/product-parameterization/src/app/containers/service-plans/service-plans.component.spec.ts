import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';

import { ServicePlansComponent } from './service-plans.component';

describe('ServicePlansComponent', () => {
  let component: ServicePlansComponent;
  let fixture: ComponentFixture<ServicePlansComponent>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,HttpClientTestingModule],
      declarations: [],
      providers: [ServicePlansComponent,
        {
        provide: MatDialog,
        useValue: new dialogMock()
      }, FormBuilder,
      {
        provide: MatSnackBar,
        useValue: new toastMock()
      }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ServicePlansComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });
  it('updateTree', ()=> {
    expect(component.updateTree()).toBeUndefined();
  });

  it('openToAdd', () => {
    component.productService.servicePlans= new FormArray([
      new FormGroup({
        id: new FormControl(1)
      })
    ])
    jest.spyOn(component,'addServicePlan').mockImplementation();
    jest.spyOn(component,'getInitialParameter').mockReturnValue('')
    expect(component.openToAdd()).toBeUndefined();
  });

    it('openToAdd when is null', () => {
      component.productService.servicePlans= new FormArray([ ]);
      jest.spyOn(component,'addServicePlan').mockImplementation();
    jest.spyOn(component,'getInitialParameter').mockReturnValue(null)
    expect(component.openToAdd()).toBeUndefined();
  });
  it('addServicePlan ',()=>{
    jest.spyOn(component,'updateTree').mockImplementation();
    component.addServicePlan([{id:1,name:'test',description:'test'}])
  })

  it('getInitialParameter',()=>{
    component.productService.initialParameters= new FormGroup({
      insuranceLine: new FormControl("23")
    })
    expect(component.getInitialParameter()).toBeDefined();
  })

  it('removeServicePlan',()=>{
    let node={name:'test',id:1};
    component.flatNodeMap.set(node,node);
    component.productService.servicePlans= new FormArray([
      new FormGroup({
        id: new FormControl(1)
      })
    ])
    component.selectedServicePlan= new FormGroup({
      id: new FormControl(1)
    });
    jest.spyOn(component,'findIndexServicePlan').mockReturnValue(0);
    jest.spyOn(component,'removeServicePlanCascade').mockImplementation();
    jest.spyOn(component,'updateTree').mockImplementation();
    expect(component.removeServicePlan ({expandable:true,name:'test',level:1})).toBeUndefined();
  });
  
  it('getInitialParameter',()=>{
    component.productService.initialParameters= new FormGroup({})
    expect(component.getInitialParameter()).toBeUndefined();
  })

  it('removeServicePlanCycle',()=>{
   let data= new FormArray([
      new FormGroup({
        servicePlans: new FormArray([
          new FormGroup({
          id: new FormControl(1)
          })
        ])
      })
    ])
    component.removeServicePlanCycle(1,data);
  })
  it('removeServicePlan', () => {
    let node = {expandable: false, name: 'Plan básico', level: 1};
    component.productService.servicePlans = new FormArray([]);
    component.dataSource.data.push({
      name: 'Plan básico',
      id: 1,
    });
    component.productService.servicePlans.push(
      component.fb.group({
        id: component.fb.control(1, Validators.required),
        name: component.fb.control('Plan básico', Validators.required),
        description: component.fb.control(
          'test description',
          Validators.required
        ),
        clauses: component.fb.array([], Validators.required),
      })
    ); 
    (<FormArray>component.productService.servicePlans).push(new FormGroup({
      id: new FormControl(1),
      name: new FormControl('Plan básico')
    }));
    component.productService.riskTypes = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        businessPlans: new FormArray([
          new FormControl(
            { 
              coverages: [ {id: 1} ],
              servicePlans: [ {id: 1} ]
            }
          )
        ])
      })
    ]);
    jest.spyOn(component, 'findIndexServicePlan').mockImplementation(()=>{return 0});
    expect(component.removeServicePlan(node)).toBeUndefined();
  });
  it('viewServicePlan ', () => {
    component.dataSource.data = [{
      children: [{
        description: "Plan básico con mínimo de 3 coberturas",
        id: 1,
        name: "Plan básico"
      }],
      name: "Planes de servicio"
    }];
    let node = {expandable: false, name: 'Plan básico', level: 1};
    expect(component.viewServicePlan(node)).toBeUndefined();
  });
  it('classToServicePlanSelected', () => {
    let node = {expandable: false, name: 'Plan básico', level: 1};
    expect(component.classToServicePlanSelected(node)).toBeTruthy();
  });
});
