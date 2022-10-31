import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClausesComponent } from './clauses.component';
import { HttpClientModule } from '@angular/common/http';
import { Clauses } from '../../core/model/Clauses.model';
import { ProductService } from '../../services/product.service';

class dialogMock {
  open() {
    return {
      afterClosed: () => of([{
        id         : 1,
        name       : 'name test return',
        description: 'description test return',
        details    : "details test return" 
      }])
    };
  }
}

class toastMock {
  openFromComponent() {} 
}

describe('ClausesComponent', () => {
  let component: ClausesComponent;
  let fixture: ComponentFixture<ClausesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule, HttpClientModule],
      declarations: [],
      providers: [ ClausesComponent ,ProductService,
        {
          provide: MatDialog,
          useValue: new dialogMock()
        },
        FormBuilder,
        {
          provide: FormArray,
          useValue: {}
        },
        {
          provide: FormGroup,
          useValue: {}
        },{
          provide: MatSnackBar,
          useValue: new toastMock()
        }
        ],
       schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    component = TestBed.inject(ClausesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngAfterViewInit Ok', () => {
    expect(component.ngAfterViewInit()).toBeUndefined();
  });

  it('ngOnInit Ok', () => {
    expect(component.ngOnInit()).toBeUndefined();
  });

  it('openModalC Ok', () => {
    let element = {"id":1, "name":"data 1", "description":"description 1", "details" :  "details"};
    component.clauseControls.push(component.fb.control(element));
    
    expect(component.openModalC()).toBeUndefined();
  });

  it('deleteClause Ok', () => {
    let element = {"id":1, "name":"data 1", "description":"description 1", "details" :  "details"};
    component.clauseControls.push(component.fb.control(element));

    expect(component.deleteClause('')).toBeUndefined();
  });

  it('openModal Ok', () => {
    let element = {"id": "1", "version": "1", "name": "name", "description": "description", "legalText": "legal text"}
    let clause: Clauses = <Clauses>element;
    expect(component.openModal(clause)).toBeUndefined();
  });

 /* it('prepararDatos Ok', () => {
    let element:any = {legalText: ""};
    let paramater = {details: element.legalText}
    let details = paramater.details;
    
    expect(component.prepararDatos(details)).toBeDefined();
  });
*/
  it('getSuccessStatus Ok', () => {
    expect(component.getSuccessStatus("", "")).toBeDefined();
  });

  
  it('openModalC OK_1', () => {
    let element = {"id":1, "name":"data 1", "description":"description 1", "details" :  "details"};
    component.clauseControls.push(component.fb.control(element));

    let spy = jest.spyOn(component.dialog, 'open');
    component.openModalC();
    expect(spy).toBeCalledTimes(1);
  });

  it('reset', () => {
    expect(component.reset()).toBeUndefined();
  });
  it('prepararDatos', () => {
    let obj: any = "\\t\\t\\t\\tRestablecimiento automático del valor asegurado\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tpor pago De siniestro\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t01012000-1327-a-03-cd-014\\n\\nEn caso de que el asegurado reemplace o repare los bienes\\nafectados por el siniestro, el valor asegurado que se haya\\nrebajado por concepto de la indemnización se restablecerá\\nautomáticamente a su valor inicial obligándose el asegurado\\na pagar la prima correspondiente.\\n\\nExcepto para ahmcc/amit que no habrá restablecimiento."
    let objEsperado = '&nbsp;&nbsp;&nbsp;&nbsp;Restablecimiento automático del valor asegurado<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;por pago De siniestro<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;01012000-1327-a-03-cd-014<br /><br />En caso de que el asegurado reemplace o repare los bienes<br />afectados por el siniestro, el valor asegurado que se haya<br />rebajado por concepto de la indemnización se restablecerá<br />automáticamente a su valor inicial obligándose el asegurado<br />a pagar la prima correspondiente.<br /><br />Excepto para ahmcc/amit que no habrá restablecimiento.'
    expect(component.prepararDatos(obj)).toEqual(objEsperado);
  });
  it('applyFilter Ok', () => {
    const event = { target: { value: 'hello' } } as any;
    expect(component.applyFilter(event)).toBeUndefined();
  });
  it('ngOnChanges Ok', () => {
    expect(component.ngOnChanges()).toBeUndefined();
  });
});