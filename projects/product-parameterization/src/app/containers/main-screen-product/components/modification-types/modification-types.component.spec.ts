import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ModificationTypesComponent } from './modification-types.component';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { HttpClientModule } from '@angular/common/http';

fdescribe('ModificationTypesComponent', () => {
  let component: ModificationTypesComponent;
  let fixture: ComponentFixture<ModificationTypesComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  let dialog: any;

  class dialogMock {
    open() {
      return {
        afterClosed: () =>
          of([
            {
              description: 'description',
              element: {
                id: 68,
                businessCode: 'FEC_FIN_VIG_POL',
                dsDescription: 'Fecha fin de vigencia de la póliza',
                flIsMandatory: 'S',
                nmLabel: 'Fecha fin de vigencia de la póliza',
                label: 'Fecha fin de vigencia de la póliza',
                dataType: {
                  bdFieldType: 'Date',
                  code: 'TDT13',
                  description:
                    'Campo para seleccionar una fecha y hora desde un calendario',
                  guiComponent: 'Calendar',
                  lenght: 10,
                  name: 'Fecha y Hora',
                  precision: 0,
                  scale: 0,
                },
                domainList: {
                  code: '',
                  name: '',
                  description: '',
                  valueList: '',
                },
              },
              id: 68,
              name: 'Fecha fin de vigencia de la póliza',
              shouldDelete: true,
            },
          ]),
      };
    }
  }
  const data={mdfctnPrcss:{mdfcblDt:{plcyDtGrp:[{code:"gd002_datosdeldebito",name:"Datos del débito", fields:[{}]}],rskTyp:[{ name:"mascota", description:"Tipo de riesgo Mascota",code:{businessCode:"2"},rskTypDtGrp:[{}],cmmrclPln:[{name:"DAVIPLATA 1",description:"opcion1 alternativa1",code:"pc001_opcion1alternativa1",athrzdOprtn:["MDF"],cvrg:[{}] }]}]}}};

  // class ServiceMock {
  //   getApiData(route: any) {
  //     return {
  //       body: [
  //         {
  //           id: 1,
  //           name: 'name test return',
  //           description: 'description test return',
  //         },
  //         {
  //           id: 2,
  //           name: 'name test return 2',
  //           description: 'description test return 2',
  //         },
  //       ]
  //     }
  //   }
  // }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ],
      declarations: [ModificationTypesComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilderMock },
        ModificationTypesComponent,
        ProductService,
        FormBuilder,

        {
          provide: FormArray,
          useValue: {},
        },

        { provide: MatDialog, useValue: new dialogMock() },
        {
          provide: MatSnackBar,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        // {
        //   provide: ProductService,
        //   useValue: ProductServiceMock,
        // },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationTypesComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  beforeEach(()=>{
    fixture.detectChanges();
    // component.getRiskArrayByIdModify(2);
    // component.getRiskArraydById(2);
    // component.getGroupArrayByIdModify(2);
    component.productService.mdfctnPrcss= component.fb.group({
          mdfcblDt: new FormArray([
            component.fb.group({
              plcyDtGrp: new FormArray([
                component.fb.group({
                  code:  component.fb.control(
                    'gd002_datosdeldebito',
                    Validators.required
                  ),
                  name:  component.fb.control('Datos del débito', Validators.required),
                  fields: new FormArray(
                    [
                      component.fb.group({
                        id:  component.fb.control(24),
                        name:  component.fb.control('Test'),
                        fieldGroup:  component.fb.control(1),
                      }),
                    ],
                    Validators.required
                  ),
                }),
              ]),

              rskTyp: new FormArray([
                component.fb.group({
                  name:  component.fb.control('Mascota', Validators.required),
                  description:  component.fb.control(
                    'Tipo de riesgo Mascota',
                    Validators.required
                  ),
                  fields: new FormArray(
                    [
                      component.fb.group({
                        id:  component.fb.control(2),
                        name:  component.fb.control('Test'),
                        fieldGroup:  component.fb.control(1),
                      }),
                    ],
                    Validators.required
                  ),
                  code: new FormArray(
                    [
                      component.fb.group({
                        businessCode:  component.fb.control('2', Validators.required),
                      }),
                    ],
                    Validators.required
                  ),
                  cmmrclPln: new FormArray([
                    component.fb.group({
                      name:  component.fb.control('DAVIPLATA 1'),
                      description:  component.fb.control("opcion1 alternativa1"),
                      code:  component.fb.control("pc001_opcion1alternativa1"),
                      athrzdOprtn:  component.fb.control("MDF"),
                      cvrg: new FormArray([
                        component.fb.group({
                          code: new FormArray(
                            [
                              component.fb.group({
                                businessCode:  component.fb.control(
                                  'COB8',
                                  Validators.required
                                ),
                              }),
                            ],
                            Validators.required
                          ),
                          name:  component.fb.control("Gastos exequiales"),
                          description:  component.fb.control( "Gastos exequiales"),
                          athrzdOprtn:  component.fb.control("MDF"),
                          cvrgDtGrp: new FormArray([
                            component.fb.group({
                              id:  component.fb.control(2),
                              name:  component.fb.control("Datos cobertura"),
                              description:  component.fb.control("datos"),
                              code:  component.fb.control("gd002_datoscobertura"),
                              fields: new FormArray(
                                [
                                  component.fb.group({
                                    id:  component.fb.control(24),
                                    name:  component.fb.control('Test'),
                                    // fieldGroup:  component.fb.control(1)
                                  }),
                                ],
                                Validators.required
                              ),
                            }),
                          ]),
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
          ]),
          id:  component.fb.control(1),
          name:  component.fb.control('Datos básicos'),
          code:  component.fb.control('datos_basicos'),
          isEditing:  component.fb.control(false),
          fields: new FormArray(
            [
              component.fb.group({
                id:  component.fb.control(24),
                name:  component.fb.control('Test'),
                fieldGroup:  component.fb.control(1),
              }),
            ],
            Validators.required
          ),
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('getAllRisk',()=>{
  //   .push( new FormArray([{id:2, name:'pc001_plandaviplata'}]));
  //   component.getAllRisk();
  // });

    // it('getGroupArrayById', () => {
    //   expect(component.getGroupArrayById(2)).toBeUndefined();
    // });

    // it('openToAdd', () => {
    //   // component.productService.policyData = new FormArray([]);
    //   // component.productService.policyData.push(
    //   //   new FormGroup({
    //   //     id:  component.fb.control(68),
    //   //     name:  component.fb.control('Fecha fin de vigencia de la póliza'),
    //   //   })
    //   // );
    //   const spy3 = jest.spyOn(component, 'getGroupArrayById').mockImplementation();
    //   const level='risk'
    //   expect(component.openToAdd(level)).toBeUndefined();
    // });
    // it('getNameGroup', () => {
    //   // let complementaryData = {value:[{code: 'datos_basicos',fields: [{businessCode: 'FECHA_EMISION',dataType: {code: 'TDT13',name: 'Fecha y Hora',description:'Campo para seleccionar una fecha y hora desde un calendario',bdFieldType: 'Date',guiComponent: 'Calendar',},dependency: null,domainList: null,editable: true,fieldGroup: 1,id: 62,initializeRule: [],label: 'Fecha de emisión',name: 'Fecha de emisión',required: false,requiredEssential: false,shouldDelete: true,validateRule: [],},],id: 1,isEditing: false,name: 'Datos básicos',}]};
    //   // component.productService.policyData = complementaryData;
    //   expect(component.getNameGroup('2')).toBeDefined();
    // });

    it('addBranch',()=>{
      let item =[{businessPlans: [{name: 'Daviplata1', code: 'pc001_daviplata1', description: 'Daviplata1 Daviplata1 Daviplata1 Daviplata1 Daviplata1', coverages: [], servicePlans: []},{name: 'daviplata 3', code: 'pc002_daviplata3', description: 'daviplata 3 daviplata 3 daviplata 3 daviplata 3daviplata 3', coverages:[], servicePlans: []}, {name: 'Plan1 opcion2', code: 'pc003_plan1opcion2', description: 'Plan1 opcion2 Plan1 opcion2 Plan1 opcion2 Plan1 opcion2', coverages: [], servicePlans: []}],complementaryData: [],description: "Tipo de riesgo Mascota",id: 2,name: "Mascota"}];
      const spy= jest.spyOn(component, 'addBusinessPlan').mockImplementation();
      component.addBranch(item);
      expect(spy).toBeCalled();
    });
    it('addBusinessPlan',()=>{
      let data1=[{cmmrclPln:[{name:"DAVIPLATA 1",description:"opcion1 alternativa1",code:"pc001_opcion1alternativa1",athrzdOprtn:["MDF"],cvrg:[{}] }]}]
      component.addBusinessPlan(data1);
    });
    it('onAddBranch',()=>{
      let menu= [{ code: "string", description: "string",name: "string", servicePlans:[{id: 1,required: true}],coverages:[{id: 1,required: true}],athrzdOprtn:[{ name: 'Reemplazar', key: 'RMP' }]}];
      component.showBranch=menu;
      const spy=jest.spyOn(component, 'calledMenu').mockImplementation();
      component.showBranch=menu;
      component.onAddBranch(menu);
      expect(spy).toBeCalled();
    });

  it('addBranchCoverage',()=>{
    let menu= [{ code: "string", description: "string",name: "string", servicePlans:[{id: 1,required: true}],coverages:[{id: 1,required: true}],athrzdOprtn:[{ name: 'Reemplazar', key: 'RMP' }]}];
    component.showBranch=menu;
    component.addBranchCoverage(menu,[{name:"abc", code:"string"}]);
  })

  // it('getNameGroupPolicy',()=>{
  //   component.policyData=true;
  //   component.riskData=false;
  //   const spy= jest.spyOn(component,'getRiskArraydById').mockImplementation();
  //   component.getNameGroup('Test');
  // })

  
  // it('getNameGroupRisk',()=>{
  //   component.riskData=true;
  //   component.policyData=false;
  //   const spy= jest.spyOn(component,'getRiskArraydById').mockImplementation();
  //   component.getNameGroup('Test');
  //   expect(spy).toBecalled();
  // });
    // it('sendData',()=>{
    //   component.showCommercialPlans=true;
    //   component.bussinesPlans=true;
    //   component.sendData('p001_planA');
    // });

  //   // it('dataSet',()=>{
  //   //   let data={businessPlans: [],complementaryData: [],description: "Tipo de riesgo Mascota",id: 2,name: "Mascota"};
  //   //   expect(component.dataSet(data)).toBeUndefined();
  //   // });
    it('showRiskType',()=>{
      component.policyData =true;
      component.showRiskType();
      expect(component.showRiskType()).toBeUndefined();

    });
    it('showCommercialPlan',()=>{
      let data={businessPlans: [],complementaryData: [],description: "Tipo de riesgo Mascota",id: 2,name: "Mascota"};
      component.showCommercialPlansTypes  =true;
      expect(component.showCommercialPlan(data)).toBeUndefined();
    })
});
