import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Observable } from 'rxjs';
import { MyErrorStateMatcher } from '../../core/error-state-matcher/error-state-matcher';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ElementReturn, FieldArray } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
import { ModalSearchSmallComponent } from '../modal-search-small/modal-search-small.component';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from '../toast-message/toast-message.component';
import { RulesWizardComponent } from './rules-wizard/rules-wizard';

@Component({
  selector: 'app-complementary-data',
  templateUrl: './complementary-data.component.html',
  styleUrls: ['./complementary-data.component.scss'],
})
export class ComplementaryDataComponent implements OnInit {
  @ViewChild('groupNameInput') groupNameInput!: ElementRef;
  @Input() applicationLevel: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() groupName: string = '';
  @Input() emptyText: string = '';
  @Input() emptySubText: string = '';
  @Input() successAddItemMsg: string = '';
  @Input() removeItemMsg: string = '';
  @Input() titleModalCompData: string = '';
  @Input() subtitleModalCompData: string = '';
  @Input() complementaryData: any = new FormArray([], [Validators.required]);
  @Input() modifyData: boolean = false;
  @Input() policyData: boolean = false;
  @Output() action: EventEmitter<ElementTableSearch> = new EventEmitter();

  selectedField: any = new FormGroup({});
  selectedGroup = new FormGroup({});
  dependsArray: FieldArray[] = [];
  essentialData: any = [];
  contextData: any = [];
  isLoading = false;
  flagServiceError = false;

  formGroupTitle: FormGroup;
  matcher = new MyErrorStateMatcher();
  Rule!: FormGroup;

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar,
    public productService: ProductService
  ) {
    this.formGroupTitle = fb.group({
      groupTitle: fb.control('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9 s]+$'),
        this.nameValidationModify(),
      ]),
    });
  }

  ngOnInit() {
    //empty
  }

  ngAfterViewInit() {
    this.loadData().then(result => {}).catch(error => {});
    this.loadContextData().then(result => {}).catch(error => {});
  }

  ngOnChanges() {
    this.loadData().then(result => {}).catch(error => {});
    this.loadContextData().then(result => {}).catch(error => {});
  }

  shootAction() {
    this.action.emit();
  }

  getInsuranceLine(){
    return(this.productService.initialParameters?.get('insuranceLine')?.value);
  }

  setInitialParameter(flag:boolean) {
    return (
      ( this.getInsuranceLine() !==
      null? 
      this.getInsuranceLine() +
          ''
        : '0') + this.setApplicationLevel(flag)
    );

  }

  setApplicationLevel(flag:boolean){
    return (flag?
      '/' +
      this.applicationLevel:'')
  }
  async loadData() {
    try {
      this.isLoading = true;

      const parameters = this.setInitialParameter(true);
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(
          `complementaryData/findEssentialDataByInsuranceLineApplicationLevel/${parameters}`
        )
      );
      this.isLoading = false;

      if (res && res.body) {
        if (Array.isArray(res.body)) {
          this.essentialData = res.body;
        } else {
          this.essentialData = [res.body];
        }
      }
    } catch (error) {
      this.isLoading = false;
      this.flagServiceError = true;
      console.log('Hubo un error:', error);
    }

 
    this.setEssentialData(this.essentialData);
    this.updateEssentialDataProperties();

  }

  async loadContextData() {
    try {
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(`domainList/DATOS_CONTEXTO`)
      );

      this.contextData = res.body.nmValueList;
      //se filtra los datos de contexto dependiendo del nivel de aplicación
      this.contextData = this.contextData.filter(
        (data: any) =>
          data.applctnLvl.includes(this.applicationLevel) ||
          data.applctnLvl.includes('*')
      );
    } catch (error) {
      this.flagServiceError = true;
    }
  }

  setEssentialData(data: any[]) {
    let dataGroup: any[] = [];

    let arrayGroups = this.fb.array(
      [
        this.fb.group({
          id: 1,
          name: 'Datos básicos',
          code: 'datos_basicos',
          isEditing: false,
          fields: this.fb.array([], Validators.required),
        }),
        this.fb.group({
          id: 2,
          name: 'Datos complementarios',
          code: 'datos_complementarios',
          isEditing: false,
          fields: this.fb.array([], Validators.required),
        }),
      ],
      Validators.required
    );

    if (arrayGroups.length > 0) {
      arrayGroups = this.fb.array(
        [
          this.fb.group({
            id: 1,
            name: this.groupName,
            code: 'datos_basicos',
            isEditing: false,
            fields: this.fb.array([], Validators.required),
          }),
        ],
        Validators.required
      );
    }

    for (let item of arrayGroups.controls) {
      const index = this.complementaryDataControls.value.findIndex(
        (x: { id: number }) => x.id === item.value.id
      );
      if (index === -1) {
        this.complementaryDataControls.push(item);
      } else {
        if (
          this.complementaryDataControls.controls[index] &&
          !(<FormGroup>this.complementaryDataControls.controls[index]).contains(
            'isEditing'
          )
        ) {
          (<FormGroup>(
            this.complementaryDataControls.controls[index]
          )).addControl('isEditing', this.fb.control(false));
        }
      }
    }

    for (let item of data) {
      const obj = {
        id: item.id,
        name: item.nmLabel,
        description: item.dsDescription,
        element: item,
        fieldGroup: 1,
        shouldDelete: false,
      };

      dataGroup.push(obj);
    }
    this.addItem(dataGroup, 1, false);
    if (this.getGroupArrayById(1).length > 0) {
      this.selectComplementaryData(
        <FormGroup>this.getGroupArrayById(1).controls[0]
      );
    }
  }

  getGroupArrayById(id: number) {
    return <FormArray>(
      this.complementaryDataControls.controls
        .find((x) => x.value.id === id)
        ?.get('fields')
    );
  }

  openDialogPolicyData(code: string): void {
    let parameter!: string;
    if (code === 'complementaryDataControls') {
      parameter = this.setInitialParameter(false);
    }

    const columns = [
      {
        name: 'name',
        header: 'Nombre',
        displayValue: ['nmLabel'],
        dbColumnName: ['nmLabel'],
      },
      {
        name: 'dataType.description',
        header: 'Descripción',
        displayValue: ['dataType.description'],
        dbColumnName: ['description'],
      },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    this.openDialog(
      code,
      this.getAllFields(),
      columns,
      true,
      parameter,
      this.titleModalCompData,
      this.subtitleModalCompData
    ).subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }

  /**
   *
   * @param code parametro para identificar el control del formulario a agregar nuestro item
   * @param list variable de tipo array con los elementos que ya están seleccionados
   * @param parameter parametro opcional para enviar al servicio
   * Funcion para abrir el modal de seleccion
   */
  /*istanbul ignore next*/
  openDialog(
    code: string,
    list: ElementTableSearch[],
    columns: any[],
    multiSelect: boolean,
    parameter?: string,
    title?: string,
    subtitle?: string
  ): Observable<ElementReturn[]> {
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code,
        columns: columns,
        list,
        parameter,
        title,
        subtitle,
        multiSelect: multiSelect,
      },
      panelClass: 'custom-dialog-container',
    });
    return dialogRef.afterClosed();
  }

  /**
   *
   * @param code parametro para identificar el control del formulario a agregar nuestro item
   * @param list variable de tipo array con los elementos que ya están seleccionados
   * @param parameter parametro opcional para enviar al servicio
   * Funcion para abrir el modal de seleccion
   */
  /*istanbul ignore next*/
  openDialogWizard(
    code: string,
    list: ElementTableSearch[],
    columns: any[],
    multiSelect: boolean,
    complementaryData: any,
    contextData: any
  ) {
    const dialogRef = this.dialog.open(RulesWizardComponent, {
      data: {
        code,
        columns: columns,
        list,
        multiSelect: multiSelect,
        complementaryData: complementaryData,
        contextData: contextData,
      },
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  /**
   * It is Open the transversal modal in the wizard step 2  for see the coverages that can be selected
   * @param code //Code that allows knowing what service and request to make to show the coverage data
   */
  openDialogEmissionData(code: string): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['label'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
      },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: code,
        columns: columns,
        list: this.getGroupArrayById(1)?.value,
        data: this.productService.policyData?.value[0].fields,
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }

  /**
   *
   * @param obj objeto con los datos complementarios seleccionados en la modal
   * Funcion para agregar item en complementaryDataControls.
   */
  /*istanbul ignore next*/
  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      let data: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: this.successAddItemMsg,
      };

      for (let object of obj) {
        const index = this.getAllFields().findIndex(
          (x: { id: number }) => x.id === object.id
        );
        this.addGroup(object,index,group);
      }

      if (
        this.getGroupArrayById(1).length > 0 &&
        !this.selectedField?.get('id')
      ) {
        this.selectComplementaryData(
          <FormGroup>this.getGroupArrayById(1).controls[0]
        );
      }

      if (showMessage) {
        this.toastMessage.openFromComponent(ToastMessageComponent, {
          data: data,
        });
      }
    }
  };
  addGroup(object:ElementReturn, index:number,group: number){

    const flIsMandatory:boolean= object.element.flIsMandatory === 'S' ? true : false;
    const nmLabel=  object.element.nmLabel? object.element.nmLabel: object.element.label;

    if (index === -1) {
      this.getGroupArrayById(group).push(
        new FormGroup({
          id: this.fb.control(object.id, [Validators.required]),
          name: this.fb.control(object.name, [Validators.required]),
          label: this.fb.control(  nmLabel,  [Validators.required]),
          dataType: this.fb.control(object.element.dataType),
          initializeRule: this.fb.array([], []),
          validateRule: this.fb.array([], []),
          dependency: this.fb.control(null, []),
          requiredEssential: this.fb.control(
            flIsMandatory,
            [Validators.required]
          ),
          required: this.fb.control(flIsMandatory,
            [Validators.required]
          ),
          editable: this.fb.control(true, [Validators.required]),
          visible: this.fb.control(true, [Validators.required]),
          fieldGroup: this.fb.control(1, []),
          shouldDelete: this.fb.control(object.shouldDelete, [
            Validators.required,
          ]),
          businessCode: this.fb.control(object.element.businessCode),
          domainList: this.fb.control(object.element.domainList),
        })
      );
    } else {
      const field = this.getGroupArrayById(group).controls[index];
      this.validateFieldGroup(field,object);
    }
  }


  validateFieldGroup(field:any, object:ElementReturn){
    if (field && !(<FormGroup>field).contains('fieldGroup')) {
      (<FormGroup>field).addControl('fieldGroup', this.fb.control(1));
    }

    if (field && !(<FormGroup>field).contains('requiredEssential')) {
      const valueRequiredEssential =
        object.element.flIsMandatory === 'S' ? true : false;
      (<FormGroup>field).addControl(
        'requiredEssential',
        this.fb.control(valueRequiredEssential)
      );
      (<FormGroup>field)
        .get('required')
        ?.setValue(valueRequiredEssential);
      if (valueRequiredEssential) {
        (<FormGroup>field).get('required')?.disable();
      } else {
        (<FormGroup>field).get('required')?.enable();
      }
    }
  }
  removeComplementaryData() {
    let obj = this.getAllFields().find(
      (x: { id: number }) => x.id === this.selectedField.value.id
    );

    let index = this.getGroupArrayById(obj.fieldGroup).value.findIndex(
      (x: { id: number }) => x.id === this.selectedField.value.id
    );

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: this.removeItemMsg,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        if (index >= 0) {
          this.validateData(obj,index)
        }
      }
    });
  }

  validateData(obj:any,index:number){
    if (!this.modifyData) {
      this.removeAssociatedReference();
    }
    this.getGroupArrayById(obj.fieldGroup).removeAt(index);
    if (this.policyData) {
      this.DeleteCascadeDateModify(obj.fieldGroup, obj.businessCode);
    }
    this.selectedField = new FormGroup({});
    if (this.getGroupArrayById(1).length > 0) {
      this.selectComplementaryData(
        <FormGroup>this.getGroupArrayById(1).controls[0]
      );
    }
  }
getComplementaryData(group:any){
return this.complementaryDataControls.value.findIndex(
  (x: { id: number }) => x.id === group.get('id')?.value
);
}
  removeGroup(group: any) {
    let index = this.getComplementaryData(group);

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:
          '¿Está seguro de querer eliminar el grupo "' +
          group.get('name')?.value +
          '"?',
        subMessage:
          'Los datos asociados al grupo pasarán al <br> grupo de datos básicos',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

        if (index >= 0) {

          const groupBk = [
            ...this.getGroupArrayById(group.get('id')?.value).controls,
          ];

          this.complementaryDataControls.removeAt(index);
          for (let field of groupBk) {
            field.get('fieldGroup')?.setValue(1);
            this.getGroupArrayById(1).push(field);
          }
          this.removeGroupCascade(group);
        }
      }
    });
  }

  /**
   * remueve la asociación de datos de poliza y tipos de modificación
   */
  DeleteCascadeDateModify(id: number, code: any) {
    let mdfctnPrcss:any = (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )).controls
      .find((x) => x.value.id === id)
      ?.get('fields');

      if(mdfctnPrcss){
        this.deleteMdfctnPrcss(mdfctnPrcss,id,code)
  }
    //PreviewData

    let preview:any = (<FormArray>(
      this.productService.prvwDt?.get('plcyDtGrp')
    )).controls
      .find((x) => x.value.id === id)
      ?.get('fields');

      if(preview){
        this.deletePreviewData(preview,id,code);
      }
   
  }
  deleteMdfctnPrcss(mdfctnPrcss:FormArray, id:number,code:any){
    let index: any = mdfctnPrcss.controls.findIndex(
      (x) => x.value.businessCode === code
    );

    mdfctnPrcss.removeAt(index);

    if (
      (<FormArray>(
        this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
      )).value[id - 1].fields.length === 0
    ) {
      (<FormArray>(
        this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
      )).removeAt(id - 1);
    }
  }

  deletePreviewData(preview:FormArray,id:number,code:any){
    let indexPreview: any = preview.controls.findIndex(
      (x) => x.value.businessCode === code
    );

    preview.removeAt(indexPreview);
    if (
      this.getMdfctnPrcssPlcyDtGrp().value[id - 1]
        .fields.length === 0
    ) {
      this.getMdfctnPrcssPlcyDtGrp().removeAt(
        id - 1
      );
    }
  }
  getMdfctnPrcssPlcyDtGrp(){
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    ));
  }

  /**
   * remueve la asociación de grupos en los demes componentes
   */
getPlcyDtGrp(group:any){
  return (<FormArray>(
    this.productService.prvwDt?.get('plcyDtGrp')
  )).controls.findIndex((x) => x.value.id === group.get('id')?.value);
}

getMdfcblDtPlcyDtGrp(group:any){
  return(<FormArray>(
    this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
  )).controls.findIndex((x) => x.value.id === group.get('id')?.value);


}

  removeGroupCascade(group: any): void {
    let indexGroup: any = this.getPlcyDtGrp(group);

    (<FormArray>this.productService.prvwDt?.get('plcyDtGrp')).removeAt(
      indexGroup
    );

    let index = this.getMdfcblDtPlcyDtGrp(group);

    (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )).removeAt(index);
  }

  removeAssociatedReference() {
    for (let element of this.getGroupArrayById(1).controls) {
      if (element?.get('dependency')?.value === this.selectedField.value.id) {
        element?.get('dependency')?.setValue('');
      }
    }
  }

  selectComplementaryData(itemParam: any) {
    this.selectedField = itemParam;
    this.dependsArray = [];

    for (const item of this.getGroupArrayById(1).value.filter(
      (e: any) => e.id != this.selectedField?.get('id')?.value
    )) {
      this.dependsArray.push(item);
    }
    this.dependsArray.sort((a, b) => (a.name < b.name ? -1 : 1));

    let obj = this.getGroupArrayById(
      this.selectedField.get('fieldGroup')?.value
    );
    if (obj && obj.value.length <= 1) {
      this.selectedField.get('fieldGroup')?.disable();
    } else {
      this.selectedField.get('fieldGroup')?.enable();
    }
    this.validateComplementaryData();

  }

  validateComplementaryData(){
 if (this.selectedField.get('requiredEssential')?.value === true) {
      setTimeout(() => {
        this.selectedField.get('required')?.disable();
      });
    } else {
      setTimeout(() => {
        this.selectedField.get('required')?.enable();
      });
    }
  }
  isConfigured(item: any) {
    let req1 = 0;

    if(item.value.required || item.value.requiredEssential)
      req1+=1;

    if(!item.value.editable)
      req1+=1;


    if(!item.value.visible)
    req1+=1;

    req1 += item.value.initializeRule.length == 0 ? 0 : 1;
    req1 += item.value.validateRule.length == 0 ? 0 : 1;
    req1 += item.value.dependency == null ? 0 : 1;
    return req1 == 0 ? false : true;
  }

  associateReference(id: string) {
    if (id) {
      let obj = this.getGroupArrayById(1).value.find(
        (x: { businessCode: string }) => x.businessCode === id
      );
      if (obj.dependency !== null) {
        let objAux = this.getGroupArrayById(1).value.find(
          (x: { businessCode: string }) => x.businessCode === obj.dependency
        );
        this.showMessageError(objAux)
      }
    } else {
      this.selectedField?.get('dependency')?.setValue(null);
    }
  }

  showMessageError(objAux:any){

    while (objAux && objAux.dependency !== null) {
      if (objAux.dependency === this.selectedField.value.id) {
        this.showToastMessage(
          STATES.warning,
          'Asociación con ciclos',
          'No se puede generar esta asociación'
        );
        this.selectedField?.get('dependency')?.setValue(null);
        break;
      }
      objAux = this.getGroupArrayById(1).value.find(
        (x: { businessCode: any }) =>
          x.businessCode === objAux.dependency
      );
    }
  }

  showToastMessage(state: any, title: string, msg: string) {
    let dataToast: DataToast = {
      status: state,
      title: title,
      msg: msg,
    };

    this.toastMessage.openFromComponent(ToastMessageComponent, {
      data: dataToast,
    });
  }

  /**
   * Retorna la instancia de asociaci\u00f3n exitosa.
   * @returns instancia DataToast
   */
  getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    };
  };

  /**
   * Abre el modal de carga de datos de reglas de inicializaci\u00f3n.
   */
  openModalInitializeRule() {
    const columns = this.initializateColumn();
    this.openModalWizard(columns,'ruleInitializeControls','initializeRule','inicialización');
  }

  /**
   * remueve la regla de inicialización previamente seleccionada
   */
  removeInitializeRule = (): void => {
    (<FormArray>this.selectedField?.get('initializeRule')).removeAt(0);
  };

  /**
   * Abre el modal de carga de datos de reglas de inicializaci\u00f3n.
   */
  openModalValidateRule() {
    const columns = this.initializateColumn() ;
    this.openModalWizard(columns,'ruleValidationControls','validateRule','validación');
  }

  initializateColumn(){
    return(
      [
        {
          name: 'name',
          header: 'Nombre',
          displayValue: ['nmName'],
          dbColumnName: ['nmname'],
        },
        {
          name: 'description',
          header: 'Descripción',
          displayValue: ['dsDescription'],
          dbColumnName: ['dsdescription'],
        },
        {
          name: 'cdRuleType',
          displayValue: ['cdRuleType'],
          dbColumnName: ['cdRuleType'],
        },
        { name: 'endPoint', displayValue: ['endPoint'] },
        { name: 'nmParameterList', displayValue: ['nmParameterList'] },
        { name: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
        { name: 'rlEngnCd', displayValue: ['rlEngnCd'] },
      ]
    );
  }
openModalWizard(columns:any,typeRule:string,rule:string,messageRule:string){
  this.openDialogWizard(
    typeRule,
    this.selectedField.get(rule)?.value,
    columns,
    false,
    this.complementaryData,
    this.contextData
  ).subscribe((response: any) => {
    if (response) {
      let element: any = {
        id: response.RulesForm.rule.id,
        name: response.RulesForm.rule.name,
        cdBusinessCode: response.RulesForm.rule.cdBusinessCode,
        description: response.RulesForm.rule.description,
        cdRuleType: response.RulesForm.rule.cdRuleType,
        endPoint: response.RulesForm.rule.endPoint,
        rlEngnCd: response.RulesForm.rule.rlEngnCd,
        argmntLst: response.RulesForm.parameters,
      };
      (<FormArray>this.selectedField?.get(rule)).removeAt(0);
      (<FormArray>this.selectedField?.get(rule)).push(
        this.fb.control(element)
      );

      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          `La regla de ${messageRule} fue asociada correctamente.`
        ),
      });
    }
  });
}

  /**
   * remueve la regla de validación previamente seleccionada
   */
  removeValidateRule = (): void => {
    (<FormArray>this.selectedField?.get('validateRule')).removeAt(0);
  };

  get complementaryDataControls(): FormArray {
    return this.complementaryData as FormArray;
  }

  //metodos drag and drop

  drop(event: CdkDragDrop<any>, fieldsArray: FormArray) {
    fieldsArray.controls[event.previousContainer.data.index] =
      event.container.data.item;
    fieldsArray.controls[event.container.data.index] =
      event.previousContainer.data.item;
  }

  reset() {
    this.complementaryData = new FormArray([], [Validators.required]);
    this.selectedField = new FormGroup({});
    this.loadData().then(result => {}).catch(error => {});
    this.loadContextData().then(result => {}).catch(error => {});
  }

  getFieldsFormArray(form: any) {
    return <FormArray>form;
  }

  associateGroup(id: number) {
    let obj = this.getGroupArrayById(id);
    for (const element of this.complementaryDataControls.controls) {
      let fields = element.get('fields');
      let index = (<FormArray>fields).value.indexOf(this.selectedField.value);
      if (index >= 0) {
        let objectAux = (<FormArray>fields).controls[index];
        (<FormArray>fields).removeAt(index);
        obj.push(objectAux);
        break;
      }
    }
  }

  getMax(arr: any[], prop: string) {
    return arr.length > 0 ? Math.max(...arr.map((o) => Number(o[prop]))) : 0;
  }

  getGroupBusinessCode(id: number, name: string) {
    let code = 'gd';
    code += String(id).padStart(3, '0');
    name = this.removeAccents(name);
    name = name.replace(/\s/g, '').toLowerCase();
    name = name.slice(-24);
    code += '_' + name;

    return code;
  }

  isAvailableName(name: string) {
    return this.complementaryDataControls.value.find(
      (x: { name: string }) => x.name === name
    )
      ? false
      : true;
  }

  /**
   * Function to handle the error of the name field in the form that is in step 1
   */
  get errorMessageName(): string {
    if(this.formGroupTitle.controls['groupTitle'].hasError('required'))
    return 'Ingrese el nombre del grupo';

    if(this.formGroupTitle.controls['groupTitle'].hasError('pattern'))
    return'El nombre del grupo no recibe caracteres especiales';

    if(this.formGroupTitle.controls['groupTitle'].hasError('maxlength'))
      return 'La longitud máxima es de 200 caracteres';

    if(this.formGroupTitle.controls['groupTitle'].hasError('name'))
      return 'Ya existe un grupo con el nombre ingresado';

    return '';
  }

  addNewGroup() {
    let newGroupName = 'Nuevo grupo';
    let nameDiff = 0;

    while (!this.isAvailableName(newGroupName)) {
      nameDiff++;
      newGroupName = 'Nuevo grupo';
      newGroupName += ' ' + nameDiff;
    }

    const newGroup = this.fb.group({
      id: this.getMax(this.complementaryDataControls.value, 'id') + 1,
      name: newGroupName,
      code: null,
      fields: this.fb.array([], Validators.required),
      isEditing: this.fb.control(false),
    });

    this.complementaryDataControls.push(newGroup);
    this.startGroupEdit(
      this.complementaryData.controls[this.complementaryData.length - 1]
    );
  }

  startGroupEdit(group: any) {
    group.get('isEditing')?.setValue(true);
    this.selectedGroup = group;

    setTimeout(() => {
      this.formGroupTitle.get('groupTitle')?.setValue(group.get('name')?.value);
      this.actionEvent();
    }, 0);
  }
  actionEvent(){
    this.groupNameInput.nativeElement.select();
  }

  finishGroupEdit(event: any, group: any) {
    const nameValue = (event.target as HTMLInputElement).value;
    group.get('isEditing')?.setValue(false);
    if (this.formGroupTitle.valid) {
      group.get('name')?.setValue(nameValue.trim());
      if (!group.get('code')?.value) {
        group
          .get('code')
          ?.setValue(
            this.getGroupBusinessCode(group.get('id')?.value, nameValue.trim())
          );
      }
    } else {
      if (!group.get('code')?.value) {
        const index = this.complementaryDataControls.value.findIndex(
          (x: { id: number }) => x.id === group.get('id')?.value
        );
        this.complementaryDataControls.removeAt(index);
      }
    }

    this.selectedGroup = this.fb.group({});
    this.formGroupTitle.reset();
  }

  /**
   * validation of field name
   * @returns ValidatorFn instance
   */
  private nameValidationModify(): ValidatorFn {
    let isValid = true;

    return (control: AbstractControl): ValidationErrors | null => {
      let currentValue = ('' + (control.value || '').toLowerCase()).trim();
      let array: any[] = this.complementaryDataControls
        .getRawValue()
        .filter((x) => x.name !== this.selectedGroup.get('name')?.value);

      isValid = !array.find(
        (x: { name: string }) =>
          this.removeAccents(x.name.toLowerCase()) ===
          this.removeAccents(currentValue)
      );
      return isValid ? null : { name: true };
    };
  }

  removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  getAllFields() {
    let res: any[] = [];
    for (const group of this.complementaryDataControls.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  updateEssentialDataProperties() {
    for (const group of this.complementaryDataControls.controls) {
      (<FormArray>group.get('fields')).controls.forEach((controlsGroup) => {
        const essentialField = this.essentialData.find(
          (obj: any) => obj.id === controlsGroup.get('id')?.value
        );

        if (essentialField) {
          (<FormGroup>controlsGroup).controls['dataType'].setValue(
            essentialField.dataType
          );
        }
      });
    }
  }
}
