import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from '../../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import { ProductService } from '../../../services/product.service';
import { CommercialPlanComponentWizard } from '../commercial-plan-wizard/commercial-plan-wizard.component';

@Component({
  selector: 'app-commercial-plan',
  templateUrl: './commercial-plan.component.html',
  styleUrls: ['./commercial-plan.component.scss'],
})
/**
 * Component in charge of to open the wizard for create and edit a commercial plan,
 * also of to delete the commercial plan
 * @author Dreamcode
 * @author BrahyanArteaga-SB
 */
export class CommercialPlanComponent implements OnInit {
  //*Data shared from father component that uses the selector of this component
  @Input() CommertialPlan: any = new FormArray([]);
  @Input() idRisk: any;

  //*It allows you to get instances of native elements, directives, and components that are in the template itself.
  @ViewChild('planCommertialTable')
  planCommertialTable!: MatTable<ElementTableSearch>;

  //*Columns to be shown in the table of each risk type in the tab commercial plan
  displayedColumns: string[] = ['name', 'description', 'actions'];
  //*Data to be shown in the table of each risk type in the tab commercial plan
  dataSource = new MatTableDataSource<any>(this.CommertialPlan.value);

  //*It allows you to get instances of native elements, directives, and components that are in the template itself.
  @ViewChild('paginatorCommercialPlan') paginatorCommercialPlan!: MatPaginator;
  currentName = '';
  nameInuranceLine: any = '';

  //*Variable for handle the wizard data as form
  CommercialPlan!: FormGroup;

  /**
   * It is done dependency injection for implement MatDialog and use modal or popup,
   * also of MatSnackBar for use the SnackBar or notifications, productService for use of the service
   * and fb for the handling and construction of form
   * @param dialog
   * @param productService
   * @param fb
   * @param toastMessage
   */
  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log(
      'componente de riesgo: ',
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    );
    console.log(this.idRisk);
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.CommertialPlan.value);
    this.dataSource.paginator = this.paginatorCommercialPlan;
  }

  /**
   * A lifecycle hook that is called when any data-bound property of a directive changes
   * Used for render the table linked with commercial plan at change of risk type
   */
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.CommertialPlan.value);
    this.dataSource.paginator = this.paginatorCommercialPlan;
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
   * Function that allows to open the wizard for create and
   * configure the plan commercial instances in their different steps
   * @param action //For (edit or create)
   */
  openwizzard(action: string) {
    this.CommercialPlan = this.fb.group({
      step1: this.fb.group({
        name: this.fb.control('', [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(4),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 s]+$'),
          this.nameValidation(),
        ]),
        code: this.fb.control(''),
        description: this.fb.control('', [
          Validators.required,
          Validators.maxLength(2000),
          Validators.minLength(20),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 s]+$'),
        ]),
      }),
      coverages: this.fb.array([]),
      servicePlans: this.fb.array([]),
    });
    const dialogRef = this.dialog.open(CommercialPlanComponentWizard, {
      data: {
        action: action,
        dataCoverages: this.productService.coverages,
        CommercialPlan: this.CommercialPlan,
      },
      panelClass: 'custom-dialog-container',
      width: '800px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.addItemPlan(result);
      }
    });
  }

  /**
   * get commercial plan data
   */
  get CommertialPlanControls(): FormArray {
    return this.CommertialPlan as FormArray;
  }

  /**
   * get form data in step 1
   */
  get FormCommercialPlan(): FormGroup {
    return <FormGroup>this.CommercialPlan?.get('step1');
  }

  /**
   * In base at configuration done in the wizard, an object is created that is added to table
   * that is linked with commercial plan for each risk type
   * @param result
   */
  addItemPlan(result: any) {
    let coverages = this.fb.array([]);
    let servicePlans = this.fb.array([]);

    for (const coverage of result['coverages'].controls) {
      coverages.push(coverage);
    }

    for (const servicePlan of result['servicePlans'].controls) {
      servicePlans.push(servicePlan);
    }

    let element: any;
    element = this.fb.group({
      //id: this.fb.control(this.getMax(this.CommertialPlanControls.value, 'id')+1),
      name: this.fb.control(result['step1'].value.name),
      code: this.fb.control(
        this.autoIncrementCustomId(
          this.getMax(this.CommertialPlanControls.value, 'code') + 1,
          result['step1'].value.name
        )
      ),
      description: this.fb.control(result['step1'].value.description),
      coverages: coverages,
      servicePlans: servicePlans,
    });

    this.CommertialPlanControls.push(element);
    this.addDataSource();


    // addModifyRisk

    this.addRiskModify(result, 'add');


    this.toastMessage.openFromComponent(ToastMessageComponent, {
      data: this.getSuccessStatus(
        'Asociaci\u00f3n exitosa',
        'Los planes comerciales fueron asociados correctamente.'
      ),
    });
  }
  addDataSource() {
    this.dataSource = new MatTableDataSource<any>(
      this.CommertialPlanControls.value
    );
    this.dataSource.paginator = this.paginatorCommercialPlan;
    this.planCommertialTable.renderRows();
  }

  autoIncrementCustomId(lastRecordId: any, name: string) {
    let textValue = '';

    if (lastRecordId.toString().length > 1) {
      for (let i = 0; i < lastRecordId.toString().length; i++) {
        if (i < 1) {
          textValue += '0';
        }
      }
      textValue += lastRecordId;
    } else {
      textValue = '00' + lastRecordId;
    }

    let lastCharacter = '';
    name = name.replace(/ /g, '').replace(/[^a-zA-Z0-9 ]/g, '');
    if (name.length > 24) {
      lastCharacter = name.substr(name.length - 24);
    } else {
      lastCharacter = name;
    }

    return 'pc' + textValue + '_' + lastCharacter.toLocaleLowerCase();
  }
  /**
   * Function that deletes elements from the datasource
   * and at the same time deletes from the main table
   * @param element
   */
  deletePlan(element: any) {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:
          '¿Está seguro de querer eliminar el plan comercial seleccionado?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.CommertialPlanControls.removeAt(
          this.CommertialPlanControls.value.indexOf(element)
        );
        this.dataSource = new MatTableDataSource<any>(
          this.CommertialPlanControls.value
        );
        this.dataSource.paginator = this.paginatorCommercialPlan;
        this.getRiskArrayById(this.idRisk.value).removeAt(
          this.getRiskArrayById(this.idRisk.value).value.indexOf(element)
        );
      }
    });
  }

  /**
   * Open the wizard for edit mode, their function is allows edit
   * the configuration done in the creation of commercial plan
   * @param action
   * @param element
   */
  editWizard(action: string, element: any) {
    console.log(element);
    let coverages: any = this.fb.array([]);
    let servicePlans: any = this.fb.array([]);

    for (const coverage of element.coverages) {
      coverages.push(
        this.fb.group({
          id: this.fb.control(coverage.id),
          required: this.fb.control(coverage.required),
        })
      );
    }

    for (const servicePlan of element.servicePlans) {
      servicePlans.push(
        this.fb.group({
          id: this.fb.control(servicePlan.id),
          required: this.fb.control(servicePlan.required),
        })
      );
    }

    this.CommercialPlan = this.fb.group({
      step1: this.fb.group({
        name: this.fb.control(element.name, [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(4),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 s]+$'),
          this.nameValidationModify(),
        ]),
        code: this.fb.control(element.code),
        description: this.fb.control(element.description, [
          Validators.required,
          Validators.maxLength(2000),
          Validators.minLength(20),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 s]+$'),
        ]),
      }),
      coverages: coverages,
      servicePlans: servicePlans,
    });
    const dialogRef = this.dialog.open(CommercialPlanComponentWizard, {
      data: {
        action: action,
        dataCoverages: this.productService.coverages,
        CommercialPlan: this.CommercialPlan,
      },
      panelClass: 'custom-dialog-container',
      width: '800px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.CommertialPlanControls.value.indexOf(element);

        const coveragesArray = this.fb.array([]);
        for (const coverage of result['coverages'].controls) {
          coveragesArray.push(coverage);
        }

        const servicesPlansArray = this.fb.array([]);
        for (const servicePlan of result['servicePlans'].controls) {
          servicesPlansArray.push(servicePlan);
        }
        const commercialGroup = this.fb.group({
          name: result['step1'].value.name,
          code: result['step1'].value.code,
          description: result['step1'].value.description,
          coverages: coveragesArray,
          servicePlans: servicesPlansArray,
        });

        this.CommertialPlanControls.controls[index] = commercialGroup;
        this.CommertialPlanControls.value[index] = commercialGroup.value;
        this.editRiskModiy(element, result);
        this.dataSource = new MatTableDataSource<any>(
          this.CommertialPlanControls.value
        );
        this.dataSource.paginator = this.paginatorCommercialPlan;
      }
    });
  }

  /**
   * Allows update the table linked to commercial plan
   */
  reset() {
    this.CommertialPlan = new FormArray([]);
    this.dataSource = new MatTableDataSource<any>(this.CommertialPlan.value);
  }

  /**
   * Function that allows you to filter or search for elements in the table
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * validation of field name
   * @returns ValidatorFn instance
   */
  private nameValidation(): ValidatorFn {
    let keys = Object.keys(this.CommertialPlanControls.getRawValue());
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid = true;
      let i = 0;

      for (const element of keys) {
        let currentValue = '' + control.value;
        let indexValue =
          '' + this.CommertialPlanControls.get(element)?.value.name;

        isValid = !(
          this.eliminarDiacriticos(indexValue.toLowerCase().trim()) ===
          this.eliminarDiacriticos(currentValue.toLowerCase().trim())
        );
        if (isValid == false) {
          return { name: true };
        }
        i++;
      }

      return isValid ? null : { name: true };
    };
  }

  /**
   * validation of field name
   * @returns ValidatorFn instance
   */
  private nameValidationModify(): ValidatorFn {
    let i = 0;
    let isValid = true;
    return (control: AbstractControl): ValidationErrors | null => {
      let currentValue = '' + control.value;
      let object = this.CommertialPlanControls.getRawValue().find(
        (x) => x.name === currentValue
      );

      if (object != null) {
        if (i < 1) {
          this.currentName = object.name;
        }
      }

      let array: any[] = this.CommertialPlanControls.getRawValue().filter(
        (x) => x.name !== this.currentName
      );

      let index = array.findIndex(
        (x: { name: string }) => x.name === currentValue
      );
      if (index != -1) {
        isValid = false;
      } else {
        isValid = true;
      }
      i++;
      return isValid ? null : { name: true };
    };
  }
  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getMax(arr: any[], prop: string) {
    return arr.length > 0
      ? Math.max(...arr.map((o) => parseInt(o[prop].match(/\d+/g))))
      : 0;
  }

  // Component Modify

  get riskTypeControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }

  getRiskArrayById(id: number) {
    return (<FormArray>(
      this.riskTypeControls.controls
        .find((x) => x.value.id === id)
        ?.get('cmmrclPln')
    )) as FormArray;
  }

  getDataCoverages(id: number, position: any) {
    return (<FormArray>this.productService.coverages).controls
      .find((x) => x.value.id === id)
      ?.get(position);
  }
  getServicesPlan(id: number, position: any) {
    return (<FormArray>this.productService.servicePlans).controls
      .find((x) => x.value.id === id)
      ?.get(position);
  }

  getAthrzdOprtn(code: string) {
    return (<FormArray>this.getRiskArrayById(this.idRisk.value)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('athrzdOprtn')) as FormArray;
  }
  getcoveragesPln(code: string) {
    return (<FormArray>this.getRiskArrayById(this.idRisk.value)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('cvrg')) as FormArray;
  }
  getAthrzdOprtnCoveragePln(id: number, code: string) {
    return (<FormArray>this.getcoveragesPln(code)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('athrzdOprtn')) as FormArray;
  }

  getSrvcPln(code: string) {
    return (<FormArray>this.getRiskArrayById(this.idRisk.value)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('srvcPln')) as FormArray;
  }
  getAthrzdOprtnSrvcPln(id: number, code: string) {
    return (<FormArray>this.getSrvcPln(code)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('athrzdOprtn')) as FormArray;
  }
  addNewCommercialModify(result: any, objCoverages: any, objservicePlans: any) {
    this.getRiskArrayById(this.idRisk.value).push(
      this.fb.group({
        name: this.fb.control(result['step1'].value.name),
        code: this.fb.control(
          this.autoIncrementCustomId(
            this.getMax(this.CommertialPlanControls.value, 'code'),
            result['step1'].value.name
          )
        ),
        description: this.fb.control(result['step1'].value.description),
        athrzdOprtn: this.fb.array([]),
        cvrg: objCoverages,
        srvcPln: objservicePlans,
      })
    );
    console.log("risk: ",this.getRiskArrayById(this.idRisk.value));
  }
  addRiskModify(result: any, action: any, index?: any) {
    let objCoverages: any = this.fb.array([]);
    let objservicePlans: any = this.fb.array([]);

    for (const coverage of result['coverages'].controls) {
      objCoverages.push(
        this.fb.group({
          id: this.fb.control(coverage.value.id),
          required: this.fb.control(coverage.value.required),
          name: this.fb.control(
            this.getDataCoverages(coverage.value.id, 'name')?.value
          ),
          description: this.fb.control(
            this.getDataCoverages(coverage.value.id, 'description')?.value
          ),
          athrzdOprtn: this.fb.array([]),
          cvrgDtGrp: this.fb.array([], []),
        })
      );
    }

    for (const servicePlan of result['servicePlans'].controls) {
      objservicePlans.push(
        this.fb.group({
          id: this.fb.control(servicePlan.value.id),
          required: this.fb.control(servicePlan.value.required),
          name: this.fb.control(
            this.getServicesPlan(servicePlan.value.id, 'name')?.value
          ),
          description: this.fb.control(
            this.getServicesPlan(servicePlan.value.id, 'description')?.value
          ),
          athrzdOprtn: this.fb.array([]),
        })
      );
    }

    if (action == 'add')
      this.addNewCommercialModify(result, objCoverages, objservicePlans);

    if (action == 'edit')
      this.modifyCommericalRisk(result, objCoverages, objservicePlans, index);
  }
  validateMadatory(array: any, required: any) {
    if (required) {
      array.removeAt(array.value.indexOf('RMV'));
      console.log(array);
      return array;
    }
    return array;
  }

  editRiskModiy(element: any, result: any) {
    const index = this.getRiskArrayById(this.idRisk.value).controls.findIndex(
      (x: { value: { code: string } }) => x.value.code === element.code
    );
    this.addRiskModify(result, 'edit', index);
  }
  modifyCommericalRisk(
    result: any,
    objCoverages: any,
    objservicePlans: any,
    index: any
  ) {
    const commercialGroup = this.fb.group({
      name: result['step1'].value.name,
      code: result['step1'].value.code,
      description: result['step1'].value.description,
      athrzdOprtn: this.getAthrzdOprtn(result['step1'].value.code)
        ? this.getAthrzdOprtn(result['step1'].value.code)
        : this.fb.array([]),
      cvrg: objCoverages,
      srvcPln: objservicePlans,
    });

    this.modifyGroup(index, commercialGroup);
  }
  modifyGroup(index: any, commercialGroup: any) {
    this.getRiskArrayById(this.idRisk.value).controls[index] = commercialGroup;
    this.getRiskArrayById(this.idRisk.value).value[index] =
      commercialGroup.value;
  }
}
