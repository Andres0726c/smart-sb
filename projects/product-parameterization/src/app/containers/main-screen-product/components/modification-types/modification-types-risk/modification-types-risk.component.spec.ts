import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { ModificationTypesRiskComponent } from './modification-types-risk.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,SimpleChange, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModificationTypesComponent } from '../modification-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ModificationTypesRiskComponent', () => {
  let component: ModificationTypesRiskComponent;
  let fixture: ComponentFixture<ModificationTypesRiskComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  let data=[{  code: 'string',coverages:[{ id: 1, required: true}],description: "string",name: "string",servicePlans:[{ id: 1, required: true}],athrzdOprtn: [ { name: "modificar",key: "MDF"},{ name: "Reemplazar",key: "RMP"}]}] ;
  let data1={businessPlans:[{  code: 'string',coverages:[{ id: 1, required: true}],description: "string",name: "string",servicePlans:[{ id: 1, required: true}],athrzdOprtn: [ ]}]} ;
  let mockFridge = {}

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
  


  beforeEach(async () => {
    mockFridge = {}
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule,FormsModule],
      declarations: [ ModificationTypesRiskComponent ],
      providers: [ProductService,
        FormBuilder,
        {
          provide: FormArray,
          useValue: {},
        },
        {
          provide: FormArray,
          useValue: {},
        },
        
        {
          provide: MatDialog,
          useValue: {},
        },
        {
          provide: FormGroup,
          useValue: {},
        },
        {
          provide:ProductService,
          useValue:ProductServiceMock
        }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTypesRiskComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    // jest.spyOn(component, 'getAllRisk').mockImplementation();
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
  // it('ngOnchanges',()=>{
  //   component.riskType='Mascotas';
  //   const changes1=new SimpleChange('Hello','Mascota',true);
  //   // const changes: SimpleChanges =  { currentValue: 'Hello', previousValue: null, isFirstChange: () => true } ;
  //   fixture.detectChanges();
  //   const spy=jest.spyOn(component,'changeView').mockImplementation();
  //   component.ngOnChanges(changes1);
  //   expect(spy).toBeCalled();
  // });

//   it('changeView', ()=>{
//     let data: any=[{athrzdOprtn: [ {name: 'Modificar', key: 'MDF'}],code: "pc001_daviplata1",coverages:[{id: 5, required: true},{id: 7, required: true}, {id: 8, required: true}],description: "opcion 1 alternativa 1",name: "DAVIPLATA 1",servicePlans:[{id: 2, required: true},{id: 4, required: true}]}];
//     component.riskType='Mascotas'
//     localStorage.setItem('Mascotas',JSON.stringify(data));
//      expect(component.changeView('Mascotas')).toBeUndefined();
// })


    it('changeCheck',()=>{
    component.tableData=[{ code: "string", description: "string",name: "string", servicePlans:[{id: 1,required: true}],coverages:[{id: 1,required: true}],athrzdOprtn:[{ name: 'Reemplazar', key: 'RMP' }]}];
      component.showBranch=[{ code: "string", description: "string",name: "string", servicePlans:[{id: 1,required: true}],coverages:[{id: 1,required: true}],athrzdOprtn:[{ name: 'Reemplazar', key: 'RMP' }]}];
      component.changeCheck();
    });
  // describe('changeCheck',()=>{

  //   it('changeCheckWithOptions',()=>{
  //     component.tableData=data;
  //     component.showBranch=data;
  //     component.changeCheck();
  //   });
  //   // it('changeCheckOptions1',()=>{
  //   //   component.tableData=data;
  //   //   component.showBranch=[];
  //   //   component.changeCheck();
  //   // });
  // })
});
