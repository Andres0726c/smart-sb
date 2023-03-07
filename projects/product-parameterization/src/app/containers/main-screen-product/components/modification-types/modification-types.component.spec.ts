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
          of([{description: 'description',element: {id: 68,businessCode:"FEC_FIN_VIG_POL",dsDescription: 'Fecha fin de vigencia de la póliza',flIsMandatory: 'S',nmLabel: 'Fecha fin de vigencia de la póliza',label: 'Fecha fin de vigencia de la póliza',dataType: {bdFieldType: 'Date',code: 'TDT13',description:'Campo para seleccionar una fecha y hora desde un calendario',guiComponent: 'Calendar',lenght: 10,name: 'Fecha y Hora',precision: 0,scale: 0,},domainList:{  code: '',name: '',description: '',valueList:''}},id: 68,name: 'Fecha fin de vigencia de la póliza',shouldDelete: true,}] ),
      };
    }
  }
  class toastMock {
    openFromComponent() {}
  }
  let store = {};
  // const mockLocalStorage = {
  //   getItem: (key: string): string => {
  //     return key in store ? store[key] : null;
  //   },
  //   setItem: (key: string, value: string) => {
  //     store[key] = `${value}`;
  //   },
  //   removeItem: (key: string) => {
  //     delete store[key];
  //   },
  //   clear: () => {
  //     store = {};
  //   }
  // };
  // let mockDialog=new dialogMock();
  // let mockHeroService = { getHeros: jest.fn().mockReturnValue( afterClosed : of({})), ... };

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
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
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificationTypesComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getGroupArrayById', () => {
    expect(component.getGroupArrayById(1)).toBeUndefined();
  });

  it('openToAdd', () => {
    component.productService.policyData = new FormArray([]);
    component.productService.policyData.push(
      new FormGroup({
        id: new FormControl(68),
        name: new FormControl('Fecha fin de vigencia de la póliza'),
      })
    );
    const spy3 = jest.spyOn(component, 'getGroupArrayById').mockImplementation();
    const level='risk'
    expect(component.openToAdd(level)).toBeUndefined();
  });
  it('getNameGroup', () => {
    let complementaryData = {value:[{code: 'datos_basicos',fields: [{businessCode: 'FECHA_EMISION',dataType: {code: 'TDT13',name: 'Fecha y Hora',description:'Campo para seleccionar una fecha y hora desde un calendario',bdFieldType: 'Date',guiComponent: 'Calendar',},dependency: null,domainList: null,editable: true,fieldGroup: 1,id: 62,initializeRule: [],label: 'Fecha de emisión',name: 'Fecha de emisión',required: false,requiredEssential: false,shouldDelete: true,validateRule: [],},],id: 1,isEditing: false,name: 'Datos básicos',}]};
    component.productService.policyData = complementaryData;
    expect(component.getNameGroup('FECHA_EMISION')).toBeDefined();
  });

  

  it('addBranch',()=>{
    let item =[{businessPlans: [{name: 'Daviplata1', code: 'pc001_daviplata1', description: 'Daviplata1 Daviplata1 Daviplata1 Daviplata1 Daviplata1', coverages: [], servicePlans: []},{name: 'daviplata 3', code: 'pc002_daviplata3', description: 'daviplata 3 daviplata 3 daviplata 3 daviplata 3daviplata 3', coverages:[], servicePlans: []}, {name: 'Plan1 opcion2', code: 'pc003_plan1opcion2', description: 'Plan1 opcion2 Plan1 opcion2 Plan1 opcion2 Plan1 opcion2', coverages: [], servicePlans: []}],complementaryData: [],description: "Tipo de riesgo Mascota",id: 2,name: "Mascota"}];
    component.addBranch(item);
  });
  it('onAddBranch',()=>{
    let menu= [{ code: 'a',coverages: [],description: '',name: '',servicePlans: [],athrzdOprtn: [{name: 'Modificacion', key: 'MDF'}]}];
    component.showBranch=menu;
    component.onAddBranch(menu);
  });

it('addBranchCoverage',()=>{
  let menu= [{ code: 'a',coverages: [],description: '',name: 'aa',servicePlans: [],athrzdOprtn: [{name: 'Modificacion', key: 'MDF'}]}], itemPush={code:'a'};
  component.showBranch=menu; 
  component.addBranchCoverage(menu,itemPush);
})
  it('sendData',()=>{
    component.showCommercialPlans=true;
    component.bussinesPlans=true;
    component.sendData('p001_planA');
  });

  // it('dataSet',()=>{
  //   let data={businessPlans: [],complementaryData: [],description: "Tipo de riesgo Mascota",id: 2,name: "Mascota"};
  //   expect(component.dataSet(data)).toBeUndefined();
  // });
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
