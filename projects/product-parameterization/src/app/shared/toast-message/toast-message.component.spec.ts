import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastMessageComponent,DataToast,STATES } from './toast-message.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
class SnackBarMock{
  open(){
    return {
      onAction: () => of({})
    }
  }
  dismiss(){
  }
}
describe('ToastMessageComponent', () => {
  let component: ToastMessageComponent;
  let fixture: ComponentFixture<ToastMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [ToastMessageComponent,
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: MatSnackBarRef,
          useValue:  new SnackBarMock()
        }, {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {status:STATES.success, title:'titulo ejemplo',msg:'msg ejemplo'}
        }
      ],
    });
    component = TestBed.inject(ToastMessageComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dismiss',()=>{
    component.dismiss()
    expect(component).toBeDefined();
  })
});
