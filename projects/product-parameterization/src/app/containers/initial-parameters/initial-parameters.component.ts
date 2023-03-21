import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../core/error-state-matcher/error-state-matcher';

import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component'
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { MatChipList } from '@angular/material/chips';
import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { InitialParametersService } from './services/initial-parameters.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PolicyValidityPeriod } from '../../core/model/PolicyValidityPeriod.model';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ProductService } from '../../services/product.service';
import { tableColumns } from '../../core/model/SearchModal.model';

@Component({
  selector: 'app-initial-parameters',
  templateUrl: './initial-parameters.component.html',
  styleUrls: ['./initial-parameters.component.scss'],
})
export class InitialParametersComponent implements OnInit {
  /**
   * @param matcher variable para controlar el marcado de error en los inputs de html
   * @param estateValueForm variable para establecer el formulario reactivo
   * @param ramo de tipo Ramo, opciones de carga por defecto para el input select Ramo
   * @param PolicyTypes de tipo PolicyTypes, opciones de carga por defecto para el input select Tipo de Poliza
   * @param policyValidityPeriods de tipo PolicyValidityPeriod, oppciones de carga por defecto para el input select Periodo de vigencia de la póliza
   * @param ViewChild chipListTypeCurrency, identificador# para el campo de seleccion multiple de Tipo de moneda
   * @param ViewChild chipListPayMethod, identificador# para el campo de seleccion multiple de Metodos de Pago
   * @param ViewChild chipListObjectiveGroup, identificador# para el campo de seleccion multiple de Grupos Objetivo
   * @param ViewChild chipListSalesChannel, identificador# para el campo de seleccion multiple de Canales de Venta
   * @param ViewChild chipListBillingPeriod, identificador# para el campo de seleccion multiple de Periodos de Facturacion
   * @param countPeriodValidity variable que controla la cantidad en el campo numerico de Periodo de Validez
   * @param addOnBlur Variable para controlar los eventos correspondientes del input-mat-chip y agregar chips
   * @param separatorKeysCodes Variable para controlar los eventos correspondientes del input-mat-chip y agregar chips
   * @param selected Variable por defecto para el campo de estado de producto
   * @param ClaimData de tipo ClaimData
   */
  //
  matcher = new MyErrorStateMatcher();

  policyValidityPeriods: PolicyValidityPeriod[] = []
  ramo: any;

  @ViewChild('chipListTypeCurrency') chipListTypeCurrency!: MatChipList;
  @ViewChild('chipListPayMethod') chipListPayMethod!: MatChipList;
  @ViewChild('chipListObjectiveGroup') chipListObjectiveGroup!: MatChipList;
  @ViewChild('chipListSalesChannel') chipListSalesChannel!: MatChipList;
  @ViewChild('chipListBillingPeriod') chipListBillingPeriod!: MatChipList;
  countPeriodValidity: number = 0;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  selected = 'Activo';

  policyTypes: any;
  claimData: any;
  isLoading = false;
  flagServiceError = false;
  insuranceLineTouched: string = '';
  insuranceLineFocus: any;
  isInsuranceLineFocus: boolean = true;
  /**
   *
   * @param fb variable para la creacion del formbuilder que asignara los controles reactivos de los campos en en formulario
   * @param dialog variable que permite instaciar la modal emergente para la consulta de informacion
   * @param estateValueForm contine las siguiente variables del formulario reactivo
   * @param initialParametersService variable que instacia la clase para consumo de los servicios
   * @param messageNotification variable que permite instanciar el mensaje de notificación
   * +productName Nombre de producto
   * +commercialName
   * +company
   * +insuranceLine
   * +policyType
   * +periodValidity
   * +dayRetroactivity
   * +dayMaxAdvance
   * +policyValidityPeriod
   * +policyValidityPeriodModify
   * +typeCurrency
   * +objectiveGroup
   * +salesChannel
   * +billingPeriod
   * +estateProduct
   * +coinsurance
   */
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private toastMessage: MatSnackBar,
    public initialParametersService: InitialParametersService,
    public router: Router,
    public service: ProductService
  ) {
    this.insuranceLineTouched = this.service.initialParameters.controls['insuranceLine'].value;
  }

  /**
   * Funcion On init del componente por default
   */
  ngOnInit(): void {
    this.isLoading = true;
    forkJoin({
      policyTypes: this.getDataPolicyType(),
      insuranceLines: this.getDataInsuranceLine(),
      validityPeriod: this.getDataValidityPeriod()
    }).subscribe((res: any) => {
      for (const key of Object.keys(res)) {
        if (res[key].error) {
          this.flagServiceError = true;
          break;
        }
      }
      this.isLoading = false;
    });
  }

  /**
   * Funcion submit del formulario
   */
  onFormSubmit = () => {
    this.service.initialParameters.markAllAsTouched();
  };

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * Funcion para realizar la apertura de la modal de consulta y seleccion multiple
   */
  openDialog(code: string, list: ElementTableSearch[], columns: tableColumns[]): Observable<any> {

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: { code: code, list: list, columns: columns },
    });
    let res: ElementTableSearch[] = [];
    return dialogRef.afterClosed();
  }

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * Funcion para realizar la apertura de la modal de consulta y seleccion multiple de los chips
   */
  openDialogToChips(code: string): void {
    let sendData: ElementTableSearch[] = [];
    let columns: tableColumns[] = [];
    switch (code) {
      case 'typeCurrencyControls':
        columns = [
          { name: 'name', header: 'Nombre', displayValue: ['officialName'] },
          { name: 'description', header: 'Descripción', displayValue: ['isoCode'] }
        ];
        sendData = this.service.initialParameters.get('typeCurrency')!.value
        break;
      case 'objectiveGroupControls':
        columns = [
          { name: 'name', header: 'Nombre', displayValue: ['name'] },
          { name: 'description', header: 'Descripción', displayValue: ['description'] }
        ];
        sendData = this.service.initialParameters.get('objectiveGroup')!.value
        break;
      case 'salesChannelControls':
        columns = [
          { name: 'name', header: 'Nombre', displayValue: ['nmName'] },
          { name: 'description', header: 'Descripción', displayValue: ['dsDescription'] }
        ];
        sendData = this.service.initialParameters.get('salesChannel')!.value;
        break;
      case 'billingPeriodControls':
        columns = [
          { name: 'name', header: 'Nombre', displayValue: ['name'] },
          { name: 'description', header: 'Descripción', displayValue: ['description'] }
        ];
        sendData = this.service.initialParameters.get('billingPeriod')!.value
        break;
      default:
        break;
    };
    this.openDialog(code, sendData, columns).subscribe((res) => this.addChip(code, res));
  }

  /**
   * funcion tipo get para obtener los datos de billingPeriod (periodo de facturacion)
   */
  get billingPeriodControls(): FormArray {
    //return this.estateValueForm.controls['billingPeriod'] as FormArray;
    return this.service.initialParameters.get('billingPeriod') as FormArray;
  }

  /**
   * funcion tipo get para obtener los datos de typeCurrency (tipo de moneda)
   */
  get typeCurrencyControls(): FormArray {
    return this.service.initialParameters?.controls['typeCurrency'] as FormArray;
  }

  /**
   * funcion tipo get para obtener los datos de objectiveGroup (grupos objetivos)
   */
  get objectiveGroupControls(): FormArray {
    return this.service.initialParameters.controls['objectiveGroup'] as FormArray;
  }

  /**
   * funcion tipo get para obtener los datos de salesChannel (sales)
   */
  get salesChannelControls(): FormArray {
    return this.service.initialParameters.controls['salesChannel'] as FormArray;
  }

  /**
   *
   * @param ctl parametro para identificar el control del formulario a agregar nuestro chip
   * Funcion para agregar chip en cada una de los inputs de opciones multiples como tipo de moneda etc...
   */
  /*istanbul ignore next*/
  addChip = (ctl: string, obj: ElementTableSearch[]) => {
    if (obj) {
      let data: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: '',
      };
      switch (ctl) {
        case 'typeCurrencyControls':
          for (let object of obj) {
            this.typeCurrencyControls.push(this.fb.control(object));
          }
          this.chipListTypeCurrency.errorState = false;
          data.msg = 'Los tipos de moneda fueron asociados correctamente.'

          break;

        case 'objectiveGroupControls':
          for (let object of obj) {
            this.objectiveGroupControls.push(this.fb.control(object));
          }
          this.chipListObjectiveGroup.errorState = false;
          data.msg = 'Los grupos objetivo fueron asociados correctamente.'

          break;

        case 'salesChannelControls':
          for (let object of obj) {
            this.salesChannelControls.push(this.fb.control(object));
          }
          this.chipListSalesChannel.errorState = false;
          data.msg = 'Los canales de venta fueron asociados correctamente.'

          break;

        // FIXME:
        case 'billingPeriodControls':

          for (let object of obj) {
            const grupo = (new FormGroup({
              id: new FormControl(object.id, [Validators.required]),
              name: new FormControl(object.name, [Validators.required]),
              description: new FormControl(object.description, [Validators.required]),
              percentage: new FormControl(null, [Validators.required])
            }));
            this.billingPeriodControls.push(grupo);
          }

          data.msg = 'Los periodos de facturación se han asociado correctamente.'
          break;

        default:
          break;
      }
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  };

  /**
   *
   * @param value valor a eliminar de las opciones multiples de la caja de chips
   * @param field valor del campo del cual se esta eliminando los chips
   * @param index valor para eliminar dato del array que contiene las opciones elegidas en los chips
   * Funcion para eliminar chips de los campos q tenga
   */
  remove = (value: string, field: string): void => {
    let index = -1;
    switch (field) {
      case 'typeCurrency':
        index = this.typeCurrencyControls.value.indexOf(value);

        if (index >= 0) {
          this.typeCurrencyControls.removeAt(index);
        }
        break;

      case 'objectiveGroup':
        index = this.objectiveGroupControls.value.indexOf(value);

        if (index >= 0) {
          this.objectiveGroupControls.removeAt(index);
        }
        break;

      case 'salesChannel':
        index = this.salesChannelControls.value.indexOf(value);

        if (index >= 0) {
          this.salesChannelControls.removeAt(index);
        }
        break;

      case 'billingPeriod':
        index = this.billingPeriodControls.value.indexOf(value);

        if (index >= 0) {
          this.billingPeriodControls.removeAt(index);
        }
        break;

      default:
        break;
    }
  };


  /**
   *
   * @param field variable para identificar que campo de tipo numerico queremos formaterar, dias de retroactividad, periodo de validez de la cotizacion etc.
   * Funcion para evaluar el campo de periodo de validacion, días de retroactividad y dias max de anticipo y q no se esten ingresando valores incorrectos
   */
  changeInputNumber = (field: string) => {
    this.service.initialParameters.get(field)!.setValue(Math.trunc(this.service.initialParameters.get(field)!.value));
  };

  getDataPolicyType = async (id: string = '', serviceData: string = '') => {
    try {
      let res = await lastValueFrom(this.initialParametersService.getDataInitialParameters('policyType', id));
      if (res.dataHeader.hasErrors === false) {
        this.policyTypes = res.body;
        return this.policyTypes;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
      return error;
    }
  };

  getDataInsuranceLine = async (id: string = '3', serviceData: string = '') => {
    try {
      let res = await lastValueFrom(this.initialParametersService.getDataInitialParameters('insuranceLine/findByCompany', this.service.companyId));
      if (res.dataHeader.hasErrors === false) {
        this.ramo = res.body;
        return this.ramo;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
      return error;
    }
  };

  getDataValidityPeriod = async (id: string = '', serviceData: string = '') => {
    try {
      let res = await lastValueFrom(this.initialParametersService.getDataInitialParameters('validityPeriod', id));
      if (res.dataHeader.hasErrors === false) {
        this.policyValidityPeriods = res.body;
        return this.policyValidityPeriods;
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
      return error;
    }
  };

  /**
   *
   * @param index variable para identificar la posición del periodo de facturación en la tabla
   * Funcion para eliminar el periodo de facturación seleccionado de la tabla
   */
  removeBillingPeriod = (index: number) => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: { 
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar el periodo de facturación seleccionado?'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.billingPeriodControls.removeAt(index);
      }
    });
  };

  confirmSelectInsurenceLine(id: any) {
    if (this.insuranceLineTouched != '') {
      this.isInsuranceLineFocus = true;
      const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
        data: {
          img: 'picto-delete',
          message: '¿Está seguro de querer cambiar el ramo seleccionado?',
          subMessage: 'Tenga en cuenta que toda la información del producto se borrará.',
        },
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.selectInsurenceLine(id);
        } else {
          this.service.initialParameters.get('insuranceLine')?.setValue(this.insuranceLineFocus);
        }
        this.isInsuranceLineFocus = false;
      });
    }
    this.insuranceLineTouched = id;
  }

  keepFocus() {
    if (!this.isInsuranceLineFocus) {
      this.insuranceLineFocus = this.service.initialParameters.controls['insuranceLine'].value;
    }
  }

  selectInsurenceLine(id: any) {
    if (id)
      console.log('selectInsurenceLine');

    this.service.isEnabledSave = false;

    this.initialParemetersReset();

    this.service.policyData.clear();
    this.service.coverages.clear();
    this.service.servicePlans.clear();
    this.service.riskTypes.clear();
    this.service.taxesCategories.clear();
    this.service.technicalControls.clear();
    this.service.clauses.clear();
    this.billingPeriodControls.clear();

    this.service.claimReservation.clear();

    this.service.claimData.clear();
    this.service.claimTechnicalControls.clear();
    this.service.conceptReservation.clear();
  }

  initialParemetersReset() {
    (this.service.initialParameters.controls['salesChannel'] as FormArray).clear();
    (this.service.initialParameters.controls['typeCurrency'] as FormArray).clear();
    (this.service.initialParameters.controls['objectiveGroup'] as FormArray).clear();
    (this.service.accumulation.controls['accumulationCoverages'] as FormArray).clear();
    this.service.accumulation.controls['accumulationTop'].reset();
    this.service.accumulation.controls['accumulationType'].reset();


    let productNameReset = this.service.initialParameters.controls['productName'].value;
    let commercialNameReset = this.service.initialParameters.controls['commercialName'].value;
    let companyReset = this.service.initialParameters.controls['company'].value;
    let businessCodeReset = this.service.initialParameters.controls['businessCode'].value;
    let insuranceLineReset = this.service.initialParameters.controls['insuranceLine'].value;


    this.service.initialParameters.reset({
      productName: productNameReset,
      commercialName: commercialNameReset,
      company: companyReset,
      businessCode:businessCodeReset,
      insuranceLine: insuranceLineReset
    });

    this.service.prdctDpndncy = new FormGroup({
      insrncLn: new FormArray([]),
      cs: new FormArray([]),
      rl: new FormArray([])
    });

    this.setInsDependency(insuranceLineReset);
  }

  setInsDependency(event: any) {
    let rm: any = this.ramo.find((x: any) => x.id === event);

    let objIns = {
      id: rm?.id,
      cd: rm?.businessCode,
      fnnclCd: rm?.financialCode,
      nm: rm?.nmName,
      dscrptn: rm?.dsDescription,
      sttCd: 'ACT',
      cmpnyId: this.service.companyId
    }
    
    console.log('insrncLn', objIns);
    this.service.setProductDependency('insrncLn', objIns);
   
    console.log('form', this.service);
  }
}
