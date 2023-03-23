import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PreviewDataPolicyComponent } from './preview-data-policy.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

class toastMock {
  openFromComponent() { 
    return {
      afterClosed: () =>
        of([ {
          name:""
        }
        ])
  }
}
}
const ProductServiceMock = {
  getApiData: () => of(
    [
      {
        id: 1,
        name: 'name test return',
        nmValueList:[{code: "prdct", applctnLvl: ["*"], description: "Producto"}],
      }]),
  prvwDt: new FormGroup({
    // mdfcblDt: new FormGroup({
      plcyDtGrp: new FormArray([
        new FormGroup({
          id: new FormControl(1),
        code: new FormControl('gd002_datosdeldebito', Validators.required),
        name: new FormControl('Datos básicos', Validators.required),
        fields: new FormArray(
          [
            new FormGroup({
              id: new FormControl(1),
              name: new FormControl('Datos básicos'),
              fieldGroup: new FormControl(1),
            }),
          ],
          Validators.required
        ),
      })
    ]),
      
    // }),
  }),
  
  policyData: new FormArray([
    new FormGroup({
      code: new FormControl('datos_basicos'),
      id: new FormControl(1),
      name: new FormControl('Datos básicos'),
      isEditing: new FormControl(true),
      fields: new FormArray(
        [
          new FormGroup({
            code: new FormArray(
              [
                new FormGroup({
                  businessCode: new FormControl(
                    'datos_basicos',
                    Validators.required
                  ),
                }),
              ],
              Validators.required
            ),
            name:new FormControl(
              'test',
              Validators.required
            ),
            description:new FormControl(
              'test',
              Validators.required
            ),
            // fieldGroup: new FormControl(1)
          }),
        ],
        Validators.required
      ),
    }),
  ]),
};




















describe('PreviewDataPolicyComponent', () => {
  let component: PreviewDataPolicyComponent;
  let fixture: ComponentFixture<PreviewDataPolicyComponent>;
  let productService: ProductService;
  let formBuilderMock = new FormBuilder();
  let dialog: any;
  let res = [
    {
      id: 1,
      name: 'string',
      description: 'string',
      details: 'string',
      shouldDelete: true,
      cdRuleType: 'string',
      element: {
        id: 1,
        businessCode: 'string',
        nmLabel: 'string',
        name:'string',
        dsDescription: 'string',
        dataType: {
          code: 'string',
          name: 'string',
          description: 'string',
          bdFieldType: 'string',
          guiComponent: 'string',
          lenght: 1,
          precision: 1,
          scale: 1,
        },
        flIsMandatory: 'S',
        domainList: {
          code: 'string',
          name: 'string',
          description: 'string',
          valueList: 'String',
        },
      },
    },
  ];
  let res1 = 
    {
      id: 1,
      name: 'string',
      description: 'string',
      details: 'string',
      shouldDelete: true,
      cdRuleType: 'string',
      element: {
        id: 1,
        businessCode: 'string',
        nmLabel: 'string',
        name:'string',
        dsDescription: 'string',
        dataType: {
          code: 'string',
          name: 'string',
          description: 'string',
          bdFieldType: 'string',
          guiComponent: 'string',
          lenght: 1,
          precision: 1,
          scale: 1,
        },
        flIsMandatory: 'S',
        domainList: {
          code: 'string',
          name: 'string',
          description: 'string',
          valueList: 'String',
        },
      },
    };
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[        
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule],
        declarations: [ PreviewDataPolicyComponent ],
        providers: [
          { provide: FormBuilder, useValue: formBuilderMock },
          PreviewDataPolicyComponent,
          ProductService,
          FormBuilder,
  
          {
            provide: FormArray,
            useValue: {},
          },
  
          { provide: MatDialog, useValue: new dialogMock() },
          { provide: MatSnackBar, useValue: new toastMock() },
          {
            provide:ProductService,
            useValue:ProductServiceMock
          },
          {
            provide: FormGroup,
            useValue: {},
          },],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],


    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewDataPolicyComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit',()=>{
    const spy= jest.spyOn(component,'loadContextData').mockImplementation();
    component.ngOnInit();
    expect(spy).toBeCalled();
  });

  it('getParamValuesList',()=>{
    component.contextData=[{code:'DATOS_CONTEXTO', name:'description', description:'description'}]
    const spy=jest.spyOn(component,'getAllFields').mockReturnValue(res);
    component.getParamValuesList();
    expect(spy).toBeCalled();
  })
  it('getAllFields',()=>{
    expect(component.getAllFields()).toBeDefined();
  });
  it('openToAdd', () => {
    const spy = jest.spyOn(component, 'addItem').mockImplementation();
    const spy1 = jest.spyOn(component, 'getParamValuesList').mockImplementation();
    component.openToAdd();
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
  });
  it('addItem', () => {
    const spy = jest.spyOn(component, 'showMessageGroup').mockImplementation();
    const spy1 = jest.spyOn(component, 'getNameGroup').mockImplementation();
    const spy2 = jest
      .spyOn(component, 'addGroupArrayById')
      .mockImplementation();
    component.addItem(res, 1, true);
    expect(spy).toBeCalled();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });
  it('getNameGroup', () => {
    expect(component.getNameGroup('Datos básicos')).toBeUndefined();
  });
  it('addGroupArrayById',()=>{
    let resForm:any = new FormArray([new FormGroup({
      id:new FormControl(1),
      name: new FormControl("string"),
      label: new FormControl("string"),
      dataType: new FormControl(""),
      shouldDelete: new FormControl("S"),
      businessCode: new FormControl("string")      
    })]);
    const spy= jest.spyOn(component,'getGroupArrayById').mockReturnValue(resForm)
    console.log("res: ",res)
    expect(component.addGroupArrayById(res1,"datos_basicos")).toBeUndefined();
    expect(spy).toBeCalled();
  });
  it('showMessageGroup', () => {
    expect(component.showMessageGroup(false)).toBeUndefined();
  });
  it('showMessageGroup', () => {
    expect(component.showMessageGroup(true)).toBeUndefined();
  });
  it('getGroupArrayById',()=>{
    expect(component.getGroupArrayById(1)).toBeDefined();
  })
  it('loadContextData',()=>{
    component.applicationLevel='Póliza'
    expect(component.loadContextData()).toBeUndefined();
  })
});
