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
        },],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificationTypesRiskComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    localStorage.clear();
  
  });
  
  beforeEach(()=>{
    fixture.detectChanges();
  })
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

  it('changeView', ()=>{
    let data: any=[{athrzdOprtn: [ {name: 'Modificar', key: 'MDF'}],code: "pc001_daviplata1",coverages:[{id: 5, required: true},{id: 7, required: true}, {id: 8, required: true}],description: "opcion 1 alternativa 1",name: "DAVIPLATA 1",servicePlans:[{id: 2, required: true},{id: 4, required: true}]}];
    component.riskType='Mascotas'
    localStorage.setItem('Mascotas',JSON.stringify(data));
     expect(component.changeView('Mascotas')).toBeUndefined();
})


  describe('changeCheck',()=>{

    it('changeCheckWithOptions',()=>{
      component.tableData=data;
      component.showBranch=data;
      component.changeCheck();
    });
    it('changeCheckOptions1',()=>{
      component.tableData=data;
      component.showBranch=[];
      component.changeCheck();
    });
  })
});
