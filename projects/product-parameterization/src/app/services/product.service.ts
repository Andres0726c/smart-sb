import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { environment } from 'commons-lib';
import { AppHttpResponse } from '../core/model/app-http-response.model';
import { ModalAlertComponent } from '../shared/modal-alert/modal-alert.component';

@Injectable({
  providedIn: 'root',
})

/**
 * Service for manage all product data and general processes
 */
export class ProductService {
  ramo: string = '';
  productBk = {};
  coverages: any = new FormArray<any>([]);
  policyData: any = new FormArray<any>([]);
  clauses: any = new FormArray<any>([]);
  riskTypes: any = new FormArray<any>([]);
  servicePlans: any = new FormArray<any>([]);
  accumulation: FormGroup = new FormGroup({});
  initialParameters: FormGroup = new FormGroup({});
  showAccumulationError: boolean = false;
  taxesCategories: any = new FormArray<any>([]);
  technicalControls: any = new FormArray<any>([]);
  private _isEnabledSaved: boolean = true;
  _isCreateProduct:boolean = true;
  saving = false;
  companyId:string="";
  claimReservation: any = new FormArray<any>([]);
  conceptReservation: any = new FormArray<any>([]);
  claimTechnicalControls: any = new FormArray<any>([]);
  claimData: any = new FormArray<any>([]);
  modificationTypes: any = new FormArray<any>([]);
  //mdfctnPrcss: FormGroup =new FormGroup({});
   mdfctnPrcss:FormGroup = new FormGroup({
     enabled: new FormControl(false),
   });
  cancellation:FormGroup = new FormGroup({
    enabled: new FormControl(false),
  });
  rehabilitation:FormGroup = new FormGroup({
    enabled: new FormControl(false),
  });
  renewal:FormGroup = new FormGroup({
    enabled: new FormControl(false),
  });


  defaultArrays = [
    'selectedProcess',
    'conceptReserv'
  ];

  defaultControls = [
    'cause'
  ];

  /* Get data variables */
  private apiUrl: string = environment.urlParameterizerMS;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': environment.apiKeyServices
  });
  /* Get data variables */

  dataValidators = [
    /* Initial parameters */
    { field: 'commercialName', validators: [Validators.required, Validators.maxLength(200), Validators.minLength(4), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]+$')] },
    { field: 'businessCode',validators: [Validators.required, Validators.maxLength(30), Validators.minLength(4), Validators.pattern('^([a-zA-Z0-9_])*([a-zA-Z0-9s][a-zA-Z0-9_]*)+$')]},
    { field: 'company', validators: [Validators.required] },
    { field: 'insuranceLine', validators: [Validators.required] },
    { field: 'policyType', validators: [Validators.required] },
    { field: 'periodValidity', validators: [Validators.min(1), Validators.max(365)] },
    { field: 'dayRetroactivity', validators: [Validators.min(0), Validators.max(365)] },
    { field: 'dayMaxAdvance', validators: [Validators.min(0), Validators.max(365)] },
    { field: 'percentage', validators: [Validators.required] },
    { field: 'typeCurrency', validators: [Validators.required] },
    { field: 'objectiveGroup', validators: [Validators.required] },
    { field: 'salesChannel', validators: [Validators.required] },
    { field: 'billingPeriod', validators: [Validators.required] },
    { field: 'estateProduct', validators: [Validators.required] },
    { field: 'policyValidityPeriod', validators: [Validators.required] },

    /* Policy data */
    { field: 'policyData', validators: [Validators.required] },

    /* Coverages */
    { field: 'coverages', validators: [Validators.required] },
    { field: 'quantity', validators: [Validators.required] },
    { field: 'period', validators: [Validators.required] },

    { field: 'quantityEvents', validators: [Validators.required, Validators.min(1), Validators.max(999)] },
    { field: 'periodEvents', validators: [Validators.required] },

    /* Risk types */
    { field: 'riskTypes', validators: [Validators.required] },

    /* Technical Controls */
    { field:'technicalControls', validators: [] },

    /* Product clauses */
    { field: 'clauses', validators: [Validators.required] },

    /* Taxes categories */
    { field: 'taxesCategories', validators: [Validators.required] },

    /* Claim data */
    { field: 'claimData', validators: [Validators.required] },

    /* Claim Tecnical Controls */
    { field: 'claimTechnicalControls', validators: [] },

    /* Modification Types */
    { field: 'modificationTypes', validators: [] },

    { field: 'mdfctnPrcss', validators: [] },
  ]

  constructor(
    private httpClient: HttpClient,
    public fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.initializeData();
  }

  initializeData() {

    this._isCreateProduct=true;
    this.saving = false;
    this.initialParameters = this.fb.group({
      productName: this.fb.control({ value: '', disabled: true }, []),
      commercialName: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.maxLength(200), Validators.minLength(4), Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]+$')]),
      businessCode: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.maxLength(30), Validators.minLength(4), Validators.pattern('^([a-zA-Z0-9_])*([a-zA-Z0-9s][a-zA-Z0-9_]*)+$')]),
      company: this.fb.control({ value: '', disabled: true }, [
        Validators.required,
      ]),
      insuranceLine: this.fb.control('', [Validators.required]),
      policyType: this.fb.control('', [Validators.required]),
      periodValidity: this.fb.control(
        null,
        Validators.compose([Validators.min(1), Validators.max(365)])
      ),
      dayRetroactivity: this.fb.control(
        0,
        Validators.compose([Validators.min(0), Validators.max(365)])
      ),
      dayMaxAdvance: this.fb.control(
        0,
        Validators.compose([Validators.min(0), Validators.max(365)])
      ),
      policyValidityPeriod: this.fb.control(5, [Validators.required]), // 5 es anual
      policyValidityPeriodModify: this.fb.control(true),
      policyValidityTimeModify: this.fb.control(false),

      typeCurrency: this.fb.array([], [Validators.required]),
      objectiveGroup: this.fb.array([], [Validators.required]),
      salesChannel: this.fb.array([], [Validators.required]),

      billingPeriod: this.fb.array([], [Validators.required]),
      estateProduct: this.fb.control({ value: 'Activo', disabled: true }, [Validators.required]),
      coinsurance: this.fb.control(false),
    });
    this.policyData = this.fb.array([], [Validators.required]);
    this.coverages = this.fb.array([], [Validators.required]);
    this.servicePlans = this.fb.array([], [Validators.required]);
    this.riskTypes = this.fb.array([], [Validators.required]);
    this.taxesCategories = this.fb.array([], [Validators.required]);
    this.technicalControls = this.fb.array([], [])
    this.clauses = this.fb.array([], [Validators.required]);
    this.accumulation = this.fb.group({
      accumulationType: this.fb.control(null, []),
      accumulationTop: this.fb.control(null, []),
      accumulationCoverages: this.fb.array([]),
    });
    this.claimReservation = this.fb.array([], [Validators.required]);
    this.conceptReservation =   this.fb.array([], [Validators.required]);
    this.claimTechnicalControls = this.fb.array([], []);
    this.claimData = this.fb.array([], [Validators.required]);
    this.modificationTypes = this.fb.array([], [Validators.required]);
    this.mdfctnPrcss = this.fb.group ({ 
      enabled: new FormControl(false),
      mdfcblDt: this.fb.group ({ 
          plcyDtGrp:this.fb.array([]),
          rskTyp:this.fb.array([]),
          cls:this.fb.array([])
        }),
      mdfctnTchnclCntrl:this.fb.array([])
     })
     this.cancellation = new FormGroup({
        enabled: new FormControl(false),
      });
      this.rehabilitation = new FormGroup({
        enabled: new FormControl(false),
      });
      this.renewal = new FormGroup({
        enabled: new FormControl(false),
      });
      //autosave enabled
      // this.autoSaveProduct();
  }

  getCoverageById = (id: number) => {
    return this.coveragesControls.value.find((x: { id: number; }) => x.id === id);
  }

  getServicePlanById = (id: number) => {
    return this.servicePlansControls.value.find((x: { id: number; }) => x.id === id);
  }

  getConceptReservationById = (id: number) => {
    return this.conceptReservationControls.value.find((x: { id: number; }) => x.id === id);
  }

  /**
   * Function that returns controls for coverages formArray
   */
  get coveragesControls(): any {
    return this.coverages;
  }

  /**
   * Function that returns controls for service plans formArray
   */
  get servicePlansControls(): any {
    return this.servicePlans;
  }

  /**
   * Function that returns controls for risk types formArray
   */
  get riskTypesControls(): any {
    return this.riskTypes;
  }

  /**
   * Function that returns controls for taxes categories formArray
   */
  get taxesCategoriesControls(): any {
    return this.taxesCategories;
  }

  get conceptReservationControls(): any {
    return this.conceptReservation;
  }
  /**
   * Function that returns "enable" status for the save button
   */
  get isEnabledSave(): boolean {
    return this._isEnabledSaved;
  }

  /**
   * Function that sets "enable" status for the save button
   */
  public set isEnabledSave(isEnabledSave: boolean) {
    this._isEnabledSaved = isEnabledSave;
  }

  /**
   * Function that returns data from general microservices
   */
  getApiData = (serviceData: string = '', id: string = '', search: string = '0') => {
    id = (id !== '' ? `/${id}` : '');

    let contentType:any = this.headers.get('Content-Type');
    let xApiKey:any = this.headers.get('x-api-key');
    let header = new HttpHeaders();
    if (search === '0') {
      header = new HttpHeaders({
        'Content-Type': contentType,
        'x-api-key': xApiKey
        //'search': search
      })
    }else{
      header = new HttpHeaders({
        'Content-Type': contentType,
        'x-api-key': xApiKey,
        'search': search
      })
    }
    

    return this.httpClient.get(`${this.apiUrl}${serviceData}${id}`, { headers: header });
  };

  getProductObject() {

    return {
      initialParameters: this.initialParameters.getRawValue(),
      policyData: this.policyData.getRawValue(),
      coverages: this.coverages.getRawValue(),
      servicePlans: this.servicePlans.getRawValue(),
      riskTypes: this.riskTypes.getRawValue(),
      taxesCategories: this.taxesCategories.getRawValue(),
      technicalControls: this.technicalControls.getRawValue(),
      clauses: this.clauses.getRawValue(),
      accumulation: this.accumulation.getRawValue(),
      claimData: this.claimData.getRawValue(),
      claimTechnicalControls: this.claimTechnicalControls.getRawValue(),
      conceptReservation: this.conceptReservation.value,
      modificationTypes: this.modificationTypes.getRawValue(),
      mdfctnPrcss: this.mdfctnPrcss.getRawValue(),
      cancellation: this.cancellation.getRawValue(),
      rehabilitation: this.rehabilitation.getRawValue(),
      renewal: this.renewal.getRawValue(),
    
    };
  }

  enableSaveButton() {
    if (!this.initialParameters.get('commercialName')?.value || !this.initialParameters.get('insuranceLine')?.value) {
      return false;
    }

    return !this.noProductChanges(this.productBk, this.getProductObject());
  }

  noProductChanges = (obj1: any, obj2: any) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if(obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let objKey of obj1Keys) {
        if (objKey !== 'isEditing' && obj1[objKey] !== obj2[objKey]) {
            if(typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
                if(!this.noProductChanges(obj1[objKey], obj2[objKey])) {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }

    return true;
  }

  /**
   * Function that saves all data for the current product
   */
  public saveProduct(showAlerts: boolean): void {
    this.saving = true;
    let product = {
      nombre: this.initialParameters.get("productName")?.value,
      descripcion: this.initialParameters.get("commercialName")?.value,
      businessCode: this.initialParameters.get("businessCode")?.value,
      insuranceLine: this.initialParameters.get("insuranceLine")?.value,
      productJson: JSON.stringify(this.getProductObject())
    }

    this.httpClient.post<AppHttpResponse<any>>(`${this.apiUrl}product/save`,  product, { headers: this.headers }).subscribe((response) => {
      let jsonString: string = response.body.Product.productJson;
      let parseString: string = jsonString.replace(/=/g, ':');
      this.productBk = JSON.parse(parseString);

      if (showAlerts) {
        if (this.isSomeRelationEmpty(this.productBk)) {
          this.showErrorMessage('No se podrá exportar', 'Tener en cuenta que se creó una<br>relación causa-concepto de reserva sin datos');
        }

        if (!this.isSomeRelationEmpty(this.productBk) && this.isSomeRelationIncomplete(this.productBk)) {
          this.showErrorMessage('No se podrá exportar', 'La relación causa-concepto de reserva está incompleta');
        }
      }

      this.saving = false;

    });
  }

  /**
   * Function to verify empty status of cause-reservationConcept relations
   * @param product product configuration
   * @returns verification status
   */
  isSomeRelationEmpty(product: any) {
    let res = false;
    for(let coverage of product.coverages) {
      if (coverage.claimReservation.length > 0 && (!coverage.claimReservation[0].cause.id && coverage.claimReservation[0].relCauseConcept.length === 0)) {
        res = true;
        break;
      }
    }
    return res;
  }

  /**
   * Function to verify incomplete status of cause-reservationConcept relations
   * @param product product configuration
   * @returns verification status
   */
  isSomeRelationIncomplete(product: any) {
    let res = false;
    for(let coverage of product.coverages) {
      if (coverage.claimReservation.length > 0 && (!coverage.claimReservation[0].cause.id || coverage.claimReservation[0].relCauseConcept.length === 0)) {
        res = true;
        break;
      }
    }
    return res;
  }

  /**
   * Function for get all product data and sets it on corresponding variables
   * @param response Json string with product info
   */
  public getProduct(response: string): any {
    //this.httpClient.get<AppHttpResponse<any>>(`${this.apiUrl}product/findById/${productName}`, { headers: this.headers }).subscribe((response) => {
      //let product = JSON.parse(response.body.Product.productJson.replace(/=/g, ':'));
      this._isCreateProduct=false;
      let product = JSON.parse(response);
      this.productBk = {...product};
      this.initialParameters = product.initialParameters ? this.setFields('initialParameters', product.initialParameters) : new FormGroup({});
      this.policyData = product.policyData ? this.setFields('policyData', product.policyData) : new FormArray<any>([]);
      this.coverages = product.coverages ? this.setFields('coverages', product.coverages) : new FormArray<any>([]);
      this.servicePlans = product.servicePlans ? this.setFields('servicePlans', product.servicePlans) : new FormArray<any>([]);
      this.riskTypes = product.riskTypes ? this.setFields('riskTypes', product.riskTypes) : new FormArray<any>([]);
      this.taxesCategories = product.taxesCategories ? this.setFields('taxesCategories', product.taxesCategories) : new FormArray<any>([]);
      this.technicalControls = product.technicalControls ? this.setFields('technicalControls', product.technicalControls) : new FormArray<any>([]);
      this.clauses = product.clauses ? this.setFields('clauses', product.clauses) : new FormArray<any>([]);
      this.accumulation = product.accumulation ? this.setFields('accumulation', product.accumulation) : new FormGroup({});
      this.conceptReservation = product.conceptReservation ? this.setFields('conceptReservation', product.conceptReservation) : new FormArray<any>([]);
      this.claimData = product.claimData ? (this.setFields('claimData', product.claimData)) : new FormArray<any>([]);
      this.claimTechnicalControls = product.claimTechnicalControls ? (this.setFields('claimTechnicalControls', product.claimTechnicalControls)) : new FormArray<any>([]);
      this.modificationTypes = product.modificationTypes ? (this.setFields('modificationTypes', product.modificationTypes)) : new FormArray<any>([]);
     // this.mdfctnPrcss = product.mdfctnPrcss ? (this.setFields('mdfctnPrcss', product.mdfctnPrcss)) :new FormGroup({});
     
      this.mdfctnPrcss = product.mdfctnPrcss ? this.setFields('mdfctnPrcss', product.mdfctnPrcss) : new FormGroup({
         enabled: new FormControl(false),
       });
      this.cancellation = product.cancellation ? this.setFields('cancellation', product.cancellation) : new FormGroup({
        enabled: new FormControl(false),
      });
      this.rehabilitation = product.rehabilitation ? this.setFields('rehabilitation', product.rehabilitation) : new FormGroup({
        enabled: new FormControl(false),
      });
      this.renewal = product.renewal ? this.setFields('renewal', product.renewal) : new FormGroup({
        enabled: new FormControl(false),
      });
      
      

      this.initialParameters.get('productName')?.disable();
      this.initialParameters.get('company')?.disable();

      if (!this.initialParameters.contains('businessCode')){
        this.initialParameters.addControl('businessCode',this.fb.control( this.initialParameters.get('productName')?.value,
          Validators.compose( [Validators.required, Validators.maxLength(30), Validators.minLength(4), Validators.pattern('^([a-zA-Z0-9_])*([a-zA-Z0-9s][a-zA-Z0-9_]*)+$')])))
      }
      if (!this.initialParameters.contains('policyValidityTimeModify')){
        this.initialParameters.addControl('policyValidityTimeModify',this.fb.control(false))
      }
      if (this.policyData.length > 0 && !(<FormGroup>this.policyData.controls[0]).contains('code')){
        (<FormGroup>this.policyData.controls[0]).addControl('code', this.fb.control('datos_basicos'));
      }
      if (this.coverages.length > 0) {
        for (const coverage of this.coverages.controls) {
          let complementaryData: any = (<FormArray>coverage.get('complementaryData'));
          let payRollData: any = (<FormArray>coverage.get('payRollData'));

          if (complementaryData.length > 0 && !(<FormGroup>complementaryData.controls[0]).contains('code')){
            (<FormGroup>complementaryData.controls[0]).addControl('code', this.fb.control('datos_basicos'));
          }
          if (payRollData.length > 0 && !(<FormGroup>payRollData.controls[0]).contains('code')){
            (<FormGroup>payRollData.controls[0]).addControl('code', this.fb.control('datos_basicos'));
          }
          if (!(<FormGroup>coverage).contains('waitingTime')){
            (<FormGroup>coverage).addControl('waitingTime',this.fb.group({
              waitingTime: this.fb.control(false),
              quantity: this.fb.control(1,[Validators.required]),
              period: this.fb.control('',[Validators.required])
            }));
          }
          if (!(<FormGroup>coverage).contains('events')){
            (<FormGroup>coverage).addControl('events',this.fb.group({
              events: this.fb.control(false),
              quantityEvents: this.fb.control(1,[Validators.required, Validators.min(1), Validators.max(999)]),
              periodEvents: this.fb.control('',[Validators.required])
            }));
          }
        }
      }
      if (this.riskTypes.length > 0) {
        for (const riskType of this.riskTypes.controls) {
          let riskTypes: any = (<FormArray>riskType.get('complementaryData'));
          if (riskTypes.length > 0 && !(<FormGroup>riskTypes.controls[0]).contains('code')){
            (<FormGroup>riskTypes.controls[0]).addControl('code', this.fb.control('datos_basicos'));
          }
        }
      }

      if (this.claimData.length > 0 && !(<FormGroup>this.claimData.controls[0]).contains('code')){
        (<FormGroup>this.claimData.controls[0]).addControl('code', this.fb.control('datos_basicos'));
      }

      if (this.modificationTypes.length > 0) {
        for (const modificationType of this.modificationTypes.controls) {
          let modificationTypes: any = (<FormArray>modificationType.get('visibleNonModificableData'));
          if (modificationTypes.length > 0 && !(<FormGroup>modificationTypes.controls[0]).contains('code')) {
            (<FormGroup>modificationTypes.controls[0]).addControl('code', this.fb.control('datos_basicos'));
          }
        }
      }

      // if (this.modificationProcess.length > 0) {
      //   for (const modificationProcess of this.modificationProcess.controls) {
      //     let modificationProcess: any = (<FormArray>this.modificationProcess.get('visibleNonModificableData'));
      //     if (modificationProcess.length > 0 && !(<FormGroup>modificationProcess.controls[0]).contains('code')) {
      //       (<FormGroup>modificationProcess.controls[0]).addControl('code', this.fb.control('datos_basicos'));
      //     }
      //   }
      // }

      this.modificationTypes = product.modificationTypes ? this.setFields('modificationTypes', product.modificationTypes) : new FormArray<any>([]);
      this.isEnabledSave = false;
      //autosave enabled
      this.autoSaveProduct();
      return product;
    //});
  }

  /**
   * Function that returns if an element is object
   */
  public isObject(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  /**
   * Function that returns if an element is array
   */
  public isArray(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor == Array;
  }

  /**
   * Recursive and aux function that sets forms, controls, values and validators for all product data
   * @param fieldKey control name
   * @param obj control value
   * @returns control, formGroup or formArray depending on parent control value
   */
  public setFormArrayValue(fieldKey: string, obj: any) {
    let retorno = null;

    if (this.isArray(obj)) {
      if (this.defaultArrays.find(x => x === fieldKey)) {
        retorno = this.fb.control(obj, this.setFieldValidators(fieldKey));
      } else {
        retorno = this.fb.array([], this.setFieldValidators(fieldKey));
        obj.forEach((element: any) => {
        let formGroup = this.fb.group({});
        if (this.isObject(element)) {
          Object.keys(element).forEach(key => {
            formGroup.addControl(key, this.setFormArrayValue(key, element[key]));
          });
          retorno.push(formGroup);
        }
        });
      }
    } else {
      if (this.isObject(obj) && !this.defaultControls.find(x => x === fieldKey) && Object.keys(obj).length > 1) {
        let formAux = this.fb.group({});
        Object.keys(obj).forEach(key => {
          formAux.addControl(key, this.setFormArrayValue(key, obj[key]));
        });
        retorno = formAux;
      } else {
        retorno = this.fb.control(obj, this.setFieldValidators(fieldKey));
      }
    }

    return retorno;
  }

  /**
   * Recursive function that sets forms, controls, values and validators for all product data
   * @param fieldKey control name
   * @param obj control value
   * @returns control, formGroup or formArray depending on parent control value
   */
  public setFields(fieldKey: string, obj: any): any {

    let control: any = null;

    if (this.isArray(obj)) {
      control = this.setFormArrayValue(fieldKey, obj);
    } else {

      if (this.isObject(obj) && !this.defaultControls.find(x => x === fieldKey)) {
        control = this.fb.group({});
        Object.keys(obj).forEach(key => {
          control.addControl(key, (this.setFormArrayValue(key, obj[key])));
        });
      } else {
        control = this.fb.control(obj, this.setFieldValidators(fieldKey));
      }

    }

    return control;
  }

  /**
   * Function that returns validators based on control name
   * @param key control name
   * @returns valitadors for control
   */
  public setFieldValidators(key: string) {
    let validators: any[] = [];
    const obj = this.dataValidators.find(x => x.field === key);
    if (obj) validators = obj.validators;
    return validators;
  }

  /**
   * Function that export the product by productName
   * @param key productName
   */
  public downloadFile(productName:string = 'product'){


      this.httpClient.get(`${this.apiUrl}product/exportArtifact/${productName}`,{headers: this.headers }
       ).subscribe({
        next: (response: any) => {
            if (response.dataHeader && response.dataHeader.code !== 200) {
              let text = response.dataHeader.errorList[0].errorDescription;
              this.showErrorMessage('No se puede exportar.', text);
            } else {
              const newBlob = new Blob([JSON.stringify(response, null, 2)], {
                type: 'application/json',
              });
              const downloadURL = window.URL.createObjectURL(newBlob);

              const link = document.createElement('a');
              link.href = downloadURL;
              link.download = productName + '.json';

              link.dispatchEvent(
                new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                })
              );
            }
          },
          error: (error) => {
            console.log('error', error);
            if (error.status === 400 && error.error.dataHeader.hasErrors
            ) {
              const msg: string = error.error.dataHeader.errorList[0].errorDescription;
              this.showErrorMessage('No se puede exportar.', msg);
            }
          },
        });
  }

  showErrorMessage(message: string, text: string){
    this.dialog.open(ModalAlertComponent, {
      data: {
        message: message,
        complementary_message: 'El producto presenta inconsistencias.',
        text: text
      },
    });
  }

  valid ():boolean {
    return this.initialParameters.valid && this.accumulation.valid;
 }

/**
 * enabled the autosave action..
 */
 autoSaveProduct():void
 {
    if(environment.productAutosave)
    {
      let formArrayList: any[] = [this.coverages, this.policyData, this.clauses, this.riskTypes, this.servicePlans, this.taxesCategories, this.technicalControls, this.conceptReservation, this.claimData, this.claimTechnicalControls, this.modificationTypes];
      let formGroupList: FormGroup[] = [this.accumulation, this.initialParameters, this.mdfctnPrcss, this.cancellation, this.rehabilitation, this.renewal];
         this.registerFormEvent(formArrayList);
         this.registerFormEvent(formGroupList);
    }
 }

 /**
  * register the FormArray and FormGroup events..
  * @param formInstance FormArray or FormGroup instance param
  */
 registerFormEvent(formInstance: any[]):void
 {
     formInstance.forEach((element)=>
     {
          element.valueChanges.pipe(map(value => { return value; })).subscribe(() =>
          {
            if(element.valid === true)
            {
              this.saveProduct(false);
            }
          })
     });
 }

}
