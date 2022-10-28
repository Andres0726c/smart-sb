import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PolicyDataComponent } from './policy-data.component';

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

describe('PolicyDataComponent', () => {
  let component: PolicyDataComponent;
  let fixture: ComponentFixture<PolicyDataComponent>;
  

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule,HttpClientTestingModule],
      declarations: [],
      providers: [ PolicyDataComponent ,
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
    component = TestBed.inject(PolicyDataComponent);
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PolicyDataComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Componente inicializado', () => {
      component.ngOnInit();
      expect(component).toBeDefined();
    });


  

  /*it('complementaryDataControls',()=>{
    expect(component.complementaryDataControls).toBeUndefined();
  });*/

});
