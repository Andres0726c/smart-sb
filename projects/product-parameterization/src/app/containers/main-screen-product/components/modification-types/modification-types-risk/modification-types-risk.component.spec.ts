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

  const ProductServiceMock = {
    mdfctnPrcss: new FormGroup({
        mdfcblDt: new FormGroup({
            plcyDtGrp: new FormGroup({
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
            rskTyp:new FormArray(
              [
            new FormGroup({
                id:new FormControl(2, Validators.required),
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
          })
      }),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule,FormsModule],
      declarations: [ ModificationTypesRiskComponent ],
      providers: [
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
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTypesRiskComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    fixture.detectChanges();
  });
  


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeCheckValue',()=>{
    const spy=jest.spyOn(component,'addData').mockImplementation();
    component.changeCheck({code:'pc001_opcion1alternativa1'},{checked:'MDF'})
  })
  
  it('changeCheck',()=>{
    const spy=jest.spyOn(component,'addData').mockImplementation();
    component.changeCheck({code:'pc001_opcion1alternativa1'},{checked:''})
  })

});
