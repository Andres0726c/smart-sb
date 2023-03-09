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

const ProductServiceMock = {
  // getApiData: () => of(
  //   [
  //     {
  //       id: 1,
  //       name: 'name test return',
  //       description: 'description test return',
  //     }
  //   ]
  // ),
  mdfctnPrcss: new FormArray([
    new FormGroup({
      mdfcblDt: new FormArray([
        new FormGroup({
          plcyDtGrp: new FormArray([
            new FormGroup({
              code: new FormControl(
                'gd002_datosdeldebito',
                Validators.required
              ),
              name: new FormControl('Datos del débito', Validators.required),
              fields: new FormArray(
                [
                  new FormGroup({
                    id: new FormControl(24),
                    name: new FormControl('Test'),
                    fieldGroup: new FormControl(1),
                  }),
                ],
                Validators.required
              ),
            }),
          ]),

          rskTyp: new FormArray([
            new FormGroup({
              name: new FormControl('Mascota', Validators.required),
              description: new FormControl(
                'Tipo de riesgo Mascota',
                Validators.required
              ),
              code: new FormArray(
                [
                  new FormGroup({
                    businessCode: new FormControl('2', Validators.required),
                  }),
                ],
                Validators.required
              ),
              cmmrclPln: new FormArray([
                new FormGroup({
                  name: new FormControl('DAVIPLATA 1'),
                  description: new FormControl("opcion1 alternativa1"),
                  code: new FormControl("pc001_opcion1alternativa1"),
                  athrzdOprtn: new FormControl("MDF"),
                  cvrg: new FormArray([
                    new FormGroup({
                      code: new FormArray(
                        [
                          new FormGroup({
                            businessCode: new FormControl(
                              'COB8',
                              Validators.required
                            ),
                          }),
                        ],
                        Validators.required
                      ),
                      name: new FormControl("Gastos exequiales"),
                      description: new FormControl( "Gastos exequiales"),
                      athrzdOprtn: new FormControl("MDF"),
                      cvrgDtGrp: new FormArray([
                        new FormGroup({
                          id: new FormControl(2),
                          name: new FormControl("Datos cobertura"),
                          description: new FormControl(),
                          code: new FormControl("gd002_datoscobertura"),
                          fields: new FormArray(
                            [
                              new FormGroup({
                                id: new FormControl(24),
                                name: new FormControl('Test'),
                                // fieldGroup: new FormControl(1)
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
              rskTypDtGrp: new FormArray([
                new FormGroup({
                  code: new FormControl(
                    'gd002_datosmascota',
                    Validators.required
                  ),
                  name: new FormControl('Datos mascota', Validators.required),
                  fields: new FormArray(
                    [
                      new FormGroup({
                        id: new FormControl(24),
                        name: new FormControl('Test'),
                        // fieldGroup: new FormControl(1)
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
      id: new FormControl(1),
      name: new FormControl('Datos básicos'),
      code: new FormControl('datos_basicos'),
      isEditing: new FormControl(false),
      fields: new FormArray(
        [
          new FormGroup({
            id: new FormControl(24),
            name: new FormControl('Test'),
            fieldGroup: new FormControl(1),
          }),
        ],
        Validators.required
      ),
    }),
  ]),
};

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
        {
          provide:ProductService,
          useValue:ProductServiceMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialPlanTypeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
    
  });

  // beforeEach(()=>{
  //   fixture.detectChanges();
  //   component.productService.mdfctnPrcss= component.fb.group({
  //         mdfcblDt: new FormArray([
  //           component.fb.group({
  //             plcyDtGrp: new FormArray([
  //               component.fb.group({
  //                 code:  component.fb.control(
  //                   'gd002_datosdeldebito',
  //                   Validators.required
  //                 ),
  //                 name:  component.fb.control('Datos del débito', Validators.required),
  //                 fields: new FormArray(
  //                   [
  //                     component.fb.group({
  //                       id:  component.fb.control(24),
  //                       name:  component.fb.control('Test'),
  //                       fieldGroup:  component.fb.control(1),
  //                     }),
  //                   ],
  //                   Validators.required
  //                 ),
  //               }),
  //             ]),
  
  //             rskTyp: new FormArray([
  //               component.fb.group({
  //                 name:  component.fb.control('Mascota', Validators.required),
  //                 description:  component.fb.control(
  //                   'Tipo de riesgo Mascota',
  //                   Validators.required
  //                 ),
  //                 code: new FormArray(
  //                   [
  //                     component.fb.group({
  //                       businessCode:  component.fb.control('2', Validators.required),
  //                     }),
  //                   ],
  //                   Validators.required
  //                 ),
  //                 cmmrclPln: new FormArray([
  //                   component.fb.group({
  //                     name:  component.fb.control('DAVIPLATA 1'),
  //                     description:  component.fb.control("opcion1 alternativa1"),
  //                     code:  component.fb.control("pc001_opcion1alternativa1"),
  //                     athrzdOprtn:  component.fb.control("MDF"),
  //                     cvrg: new FormArray([
  //                       component.fb.group({
  //                         code: new FormArray(
  //                           [
  //                             component.fb.group({
  //                               businessCode:  component.fb.control(
  //                                 'COB8',
  //                                 Validators.required
  //                               ),
  //                             }),
  //                           ],
  //                           Validators.required
  //                         ),
  //                         name:  component.fb.control("Gastos exequiales"),
  //                         description:  component.fb.control( "Gastos exequiales"),
  //                         athrzdOprtn:  component.fb.control("MDF"),
  //                         cvrgDtGrp: new FormArray([
  //                           component.fb.group({
  //                             id:  component.fb.control(2),
  //                             name:  component.fb.control("Datos cobertura"),
  //                             description:  component.fb.control("datos"),
  //                             code:  component.fb.control("gd002_datoscobertura"),
  //                             fields: new FormArray(
  //                               [
  //                                 component.fb.group({
  //                                   id:  component.fb.control(24),
  //                                   name:  component.fb.control('Test'),
  //                                   // fieldGroup:  component.fb.control(1)
  //                                 }),
  //                               ],
  //                               Validators.required
  //                             ),
  //                           }),
  //                         ]),
  //                       }),
  //                     ]),
  //                   }),
  //                 ]),
  //               }),
  //             ]),
  //           }),
  //         ]),
  //         id:  component.fb.control(1),
  //         name:  component.fb.control('Datos básicos'),
  //         code:  component.fb.control('datos_basicos'),
  //         isEditing:  component.fb.control(false),
  //         fields: new FormArray(
  //           [
  //             component.fb.group({
  //               id:  component.fb.control(24),
  //               name:  component.fb.control('Test'),
  //               fieldGroup:  component.fb.control(1),
  //             }),
  //           ],
  //           Validators.required
  //         ),
  //   });
  // });

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
// it('ngOnchanges',()=>{
//   component.data='pc001_daviplata1';
//   fixture.detectChanges();
//   const spy=jest.spyOn(component,'addDataTable').mockImplementation();
//   component.ngOnChanges({
//     data:new SimpleChange(null,'pc001_daviplata1',false)
//   });
//   expect(spy).toBeCalled();
// });
it('addDataTable', ()=>{
     let data: any=[{athrzdOprtn: [ {name: 'Modificar', key: 'MDF'}],code: "pc001_daviplata1",coverages:[{id: 5, required: true},{id: 7, required: true}, {id: 8, required: true}],description: "opcion 1 alternativa 1",name: "DAVIPLATA 1",servicePlans:[{id: 2, required: true},{id: 4, required: true}]}];
     component.data='pc001_daviplata1'
  // localStorage.setItem('pc001_daviplata1',JSON.stringify(data));
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
      let data={ athrzdOprtn:  [ {name: 'Modificar', key: 'MDF'}]};
      component.activeButton(data);
    })
});

