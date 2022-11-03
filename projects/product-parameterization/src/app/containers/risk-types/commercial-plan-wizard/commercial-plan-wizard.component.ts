import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperIntl } from '@angular/material/stepper';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from '../../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import { ProductService } from '../../../services/product.service';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';


@Component({
  selector: 'app-commercial-plan-wizard',
  templateUrl: './commercial-plan-wizard.component.html',
  styleUrls: ['./commercial-plan-wizard.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]

})
/**
 * Component responsible for the functionality of the wizard 
 * for creating and editing a commercial plan in the selected risk types
 * @author Dreamcode
 * @author BrahyanArteaga-SB
 */
export class CommercialPlanComponentWizard implements OnInit {
  /**
   * It allows you to get instances of native elements, directives, 
   * and components that are in the template itself.
   * Applies to all ViewChild directives
   */
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('servicePlansTable')
  servicePlansTable!: MatTable<ElementTableSearch>;
  @ViewChild('coveragesTable') coveragesTable!: MatTable<ElementTableSearch>;
  @ViewChild('rmServicePlanModal', { static: true })
  rmServicePlanModal!: TemplateRef<any>;
  @ViewChild('dcCommertialPlanModal', { static: true })
  dcCommertialPlanModal!: TemplateRef<any>;

  
  dsCoverages:  any = new FormArray([]);//ElementTableSearch[] = [];

  //*Columns to be shown in the table of  wizard step 2 
  colsCoverages: string[] = ['name', 'description', 'required', 'actions'];

  dsServicePlans: any = new FormArray([]);

  //*Columns to be shown in the table of  wizard step 3
  colsServicePlans: string[] = ['name', 'description','requerid', 'actions'];

  /**
   * It allows you to get instances of native elements, directives, 
   * and components that are in the template itself.
   * Applies to all ViewChild directives
   */
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorServicePlan') paginatorServicePlan!: MatPaginator;

  rmServicePlanDialogRef!: MatDialogRef<any>;
  dcCommertialPlanDialogRef!: MatDialogRef<any>;

  //*It is used for the handling and construction of forms.
  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;

  //*Data to be shown in the table of  wizard step 2 & 3, when selecting the coverages and service plans of the modal
  coverageData = new FormArray([]);
  servicePlanData = new FormArray([]);
  dataSource = new MatTableDataSource<any>(this.coverageData.value);
  dataSourceServicePlan = new MatTableDataSource<any>(this.servicePlanData.value);
  
  checkbox = new FormControl(true);

  /**
   * It is done dependency injection and the different forms used are initialized
   * @param _matStepperIntl 
   * @param dialog 
   * @param productService 
   * @param toastMessage 
   * @param fb 
   * @param data 
   */
  constructor(
    private _matStepperIntl: MatStepperIntl,
    public dialog: MatDialog,
    public productService: ProductService,
    public toastMessage: MatSnackBar,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; dataCoverages: FormArray; CommercialPlan:FormGroup }
  ) {
    this.formStep1 = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(200), Validators.minLength(4)]),
      code: this.fb.control('', [Validators.required, Validators.maxLength(2000), Validators.minLength(20)]),
      description: this.fb.control('', [Validators.required, Validators.maxLength(2000), Validators.minLength(20)]),
    });
    this.formStep2 = this.fb.group({
      coverages: this.fb.array([], []),
      checkbox: this.checkbox,
    });
    this.formStep3 = this.fb.group({});
  }

  /**
   * The data source used for the table of wizard step 2 & 3 is initialized
   * In addition, the options of the _matStepperIntl is initialized
   */
  ngOnInit(): void {
    this.dataSourceServicePlan = new MatTableDataSource<any>(this.ServicePlansControls?.value);
    this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);
    this._matStepperIntl.optionalLabel = 'Opcional';
    this._matStepperIntl.changes.next();
  }

  ngAfterViewInit() {
    this.dataSourceServicePlan = new MatTableDataSource<any>(this.ServicePlansControls.value);
    this.dataSourceServicePlan.paginator = this.paginatorServicePlan;

    this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);
    this.dataSource.paginator = this.paginator

  }



  /**
   * Returns the instance of successful association.
   * @returns instance DataToast
   */
  getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    };
  };

  /**
   * It is Open the transversal modal in the wizard step 2  for see the coverages that can be selected
   * @param code //Code that allows knowing what service and request to make to show the coverage data
   */
  openDialogCoverages(code: string): void {

    let sendData = [];
    sendData = this.CoveragesControls.value;
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'] },
      { name: 'code', header: 'code', displayValue: ['code'] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'CommertialPlanCoverages',
      data: {
        code: code,
        columns:columns,
        list: sendData,
        data: this.productService.coverages.value,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addItemCoverage(result);
    });
  }
  /**
   * The coverages selected in the transversal modal are added to the datasource 
   * and table of the step 2 wizard.
   * @param selected 
   */
  addItemCoverage(selected: ElementTableSearch[]) {
    if (selected) {
      let element: any;
      for (let object of selected) {
        element = this.fb.group( {
          id: object.id,
          required:this.fb.control(true)
        });
        this.CoveragesControls.push(element);
      }
      this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);
      this.dataSource.paginator = this.paginator;
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          'Las coberturas fueron asociadas correctamente.'
        ),
      });
    }
  }

  /**
   * Function that deletes elements from the datasource 
   * and at the same time deletes from the table of the step 2 wizard.
   * @param element 
   */
  deleteCoverage(element: any) {

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar la cobertura seleccionada?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.CoveragesControls.removeAt(this.CoveragesControls.value.indexOf(element));
        this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);   
        this.dataSource.paginator = this.paginator
      }
     
    });
  }
  
  /**
   * Close the modal (Wizard)
   */
  closeWizard() {
    this.dialog.closeAll();
  }

  /**
   * get services plan data
   */
  get ServicePlansControls(): FormArray {
    return (<FormArray> this.data.CommercialPlan?.get('servicePlans'));
  }

  /**
   * get form data in step 1
   */
  get FormCommercialPlan(): FormGroup {
    return (<FormGroup> this.data.CommercialPlan?.get('step1'));
  }

  /**
   * get coverages data
   */
  get CoveragesControls(): FormArray {
    return (<FormArray> this.data.CommercialPlan?.get('coverages'));
  }

  /**
   * It is Open the transversal modal in the wizard step 3 for see the service plans that can be selected
   */
  openModalPlans(code: string): void {

    let sendData = [];
    sendData = this.ServicePlansControls.value;
    
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'] },
      { name: 'code', header: 'code', displayValue: ['code'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'] }
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'CommertialPlanCoverages',
      data: {
        code: code,
        columns: columns,
        list: sendData,
        data: this.productService.servicePlans.value,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.addItemServicePlan(result);
    });
  }

  /**
     * The coverages selected in the transversal modal are added to the datasource 
     * and table of the step 3 wizard.
     * @param selected 
     */
   addItemServicePlan(selected: ElementTableSearch[]) {
    if (selected) {
      let element: any;
      for (let object of selected) {
        element = this.fb.group( {
          id: object.id,
          required: this.fb.control(true)
        });
        this.ServicePlansControls.push(element);
      }
      this.dataSourceServicePlan = new MatTableDataSource<any>(this.ServicePlansControls.value);
      this.dataSourceServicePlan.paginator = this.paginatorServicePlan;
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          'Los planes de servicio fueron asociados correctamente.'
        ),
      });
    }
  }

  /**
   * Function that allows you to filter or search for elements in the table (Wizard step 2)
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Function that allows you to filter or search for elements in the table (Wizard step 3)
   * @param event 
   */
  applyFilterServicePlan(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceServicePlan.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Function that deletes elements from the datasource 
   * and at the same time deletes from the table of the step 3 wizard.
   * @param element 
   */
  deleteServicePlan( element : any) {

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:'¿Está seguro de querer desasociar el plan de servicio seleccionado?'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
          this.ServicePlansControls.removeAt(this.ServicePlansControls.value.indexOf(element));
          this.dataSourceServicePlan = new MatTableDataSource<any>(this.ServicePlansControls.value); 
          this.dataSourceServicePlan.paginator = this.paginatorServicePlan;           
      }
    });
  }

  /**
   * Based on the steps of the wizard, an object for the configuration of a commercial plan is created
   * @returns obj
   */
  createCommertialPlan() {
    let servicePlans: any = this.fb.array([]);
    let coverages: any = this.fb.array([]);

    for (const coverage of this.CoveragesControls.value) {
      coverages.push(this.fb.group({
        id: this.fb.control(coverage.id),
        required: this.fb.control(coverage.required)
      }));
    }

    for (const servicePlan of this.ServicePlansControls.value) {
      servicePlans.push(this.fb.group({
        id: this.fb.control(servicePlan.id),
        required: this.fb.control(servicePlan.required)
      }));
    }
    return {
      step1:this.data.CommercialPlan?.get('step1'),
      servicePlans: servicePlans,
      coverages: coverages
    };
  }

  /**
   * The checkbox status is saved in the tables of wizard step 2 & 3
   * @param element 
   * @param required 
   */
  requeridForm(element: any, required: boolean){
    element.required = required;
  }

  /**
   * Function to handle the error of the name field in the form that is in step 1
   */
  get errorMessageName(): string {
    let form: FormGroup = (<FormGroup> this.data.CommercialPlan?.get('step1'));
    return form.controls['name'].hasError('required') ? 'El campo nombre del plan comercial es obligatorio' :
            form.controls['name'].hasError('pattern')  ? 'El campo nombre del plan comercial no recibe caracteres especiales' :
            form.controls['name'].hasError('maxlength')? 'La longitud ingresada no es válida, recuerde que este debe ser mínimo de 4 y máximo de 200' :
            form.controls['name'].hasError('minlength')? 'La longitud ingresada no es válida, recuerde que este debe ser mínimo de 4 y máximo de 200' : 
            form.controls['name'].hasError('name')? 'El nombre del plan ya se encuentra registrado' : '';

  }

  
  

  /**
   * Function to handle the error of the description field in the form that is in step 1
   */
  get errorMessageDesc(): string {
    let form: FormGroup = (<FormGroup> this.data.CommercialPlan?.get('step1'));

    return form.controls['description'].hasError('required') ? 'El campo descripción del plan comercial es obligatorio' :
            form.controls['description'].hasError('pattern')  ? 'El campo descripción del plan comercial no recibe caracteres especiales' :
            form.controls['description'].hasError('maxlength')? 'La longitud ingresada no es válida, recuerde que este debe ser mínimo de 20 y máximo de 2000' :
            form.controls['description'].hasError('minlength')? 'La longitud ingresada no es válida, recuerde que este debe ser mínimo de 20 y máximo de 2000' : '';

  }
}
