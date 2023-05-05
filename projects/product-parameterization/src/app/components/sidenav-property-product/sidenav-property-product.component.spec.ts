import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPropertyProductComponent } from './sidenav-property-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('SidenavPropertyProductComponent', () => {
  let component: SidenavPropertyProductComponent;
  let fixture: ComponentFixture<SidenavPropertyProductComponent>;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [],
      providers: [
        SidenavPropertyProductComponent,
        ProductService,
        FormBuilder,
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(true),
              beforeClosed: ()=> of(true)
            }),
        }
      },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(SidenavPropertyProductComponent);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Componente inicializado', () => {
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('Componente inicializado', () => {
    component.productService.initialParameters = new FormGroup({});
    component.ngOnInit();
    expect(component).toBeDefined();
  });

  it('validateShow modification process', () => {
    component.formProcess = new FormGroup({
      modification: new FormGroup({ enabled: new FormControl(true) }),
    });
    component.validateShow(component.menus[1]);
    expect(component.menus[1].showEnable).toEqual(false);
  });

  it('validateShow doesnt find modification process into formProcess', () => {
    component.formProcess = new FormGroup({});
    component.validateShow(component.menus[1]);
    expect(component.menus[1].show).toEqual(false);
  });

  it('validateShow emision process', () => {
    component.validateShow(component.menus[0]);
    expect(component.menus[0].show).toEqual(false);
  });

  it('clearData Ok', () => {
    component.formProcess = new FormGroup({
      cancellation: new FormGroup({ enabled: new FormControl(true) }),
      rehabilitation: new FormGroup({ enabled: new FormControl(true) }),
      renewal: new FormGroup({ enabled: new FormControl(true) }),
    });

    expect(component.clearData('cancellation')).toBeUndefined();
    expect(component.clearData('rehabilitation')).toBeUndefined();
    expect(component.clearData('renewal')).toBeUndefined();

    component.formProcess = new FormGroup({
      cancellation: new FormGroup({ enabled: new FormControl(false) }),
      rehabilitation: new FormGroup({ enabled: new FormControl(false) }),
      renewal: new FormGroup({ enabled: new FormControl(false) }),
    });
    expect(component.clearData('cancellation')).toBeUndefined();
    expect(component.clearData('rehabilitation')).toBeUndefined();
    expect(component.clearData('renewal')).toBeUndefined();
  });

  describe('changeCheck', () => {

    it('changeCheckEnableTrue', () => {
      component.formProcess.get('modification')?.get('enabled')?.setValue(true);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      const spy = jest.spyOn(component, 'showMessage').mockImplementation();
      component.changeCheck(menu, 'modification');
      expect(spy).toBeCalled();
    });

    it('changeCheckEnableFalse', () => {
      component.formProcess
        .get('modification')
        ?.get('enabled')
        ?.setValue(false);
      let menu = {
        name: 'Modificación',
        formControlName: 'modification',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      expect(component.changeCheck(menu, 'modification')).toBeUndefined();
    });

    it('changeCheckFormControlNameFalse', () => {
      component.formProcess
        .get('modification')
        ?.get('enabled')
        ?.setValue(false);
      let menu = {
        name: 'Modificación',
        showEnable: true,
        show: true,
        isExpanded: true,
      };
      expect(component.changeCheck(menu, 'modification')).toBeUndefined();
    });

    
  });

  it('showMessage',()=>{
    let menu = {
      name: 'Modificación',
      showEnable: true,
      show: true,
      isExpanded: true,
    };
    const spy2 = jest.spyOn(component, 'setValues').mockImplementation();
    const spy3 = jest.spyOn(component, 'deleteDataModification').mockImplementation();
    const spy4 = jest.spyOn(component, 'navigateGeneralParams').mockImplementation();

    component.showMessage(menu);
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();
    expect(spy4).toBeCalled();

    
  })

  it('navigateGeneralParams',()=>{
    expect(component.navigateGeneralParams()).toBeDefined();
  })
  it('setValues',()=>{
    component.formProcess
    .get('modification')
    ?.get('enabled')
    ?.setValue(false);

    let menu = {
      name: 'Modificación',
      showEnable: true,
      show: true,
      isExpanded: true,
    };

    component.setValues(menu,true);
    
  });

  it('deleteDataModification',()=>{

    let productServiceM= component.fb.array([]);
   
    productServiceM.push( new FormControl(1) );
 
     const spy1 = jest.spyOn(component, 'getComplementaryDataControls').mockReturnValue(productServiceM);
     const spy2 = jest.spyOn(component, 'getRiskTypeMdfctnPrcss').mockReturnValue(productServiceM);
     const spy3 = jest.spyOn(component, 'getMdfctnTchnclCntrl').mockReturnValue(productServiceM);

    component.deleteDataModification();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
    expect(spy3).toBeCalled();

  })
 
});
