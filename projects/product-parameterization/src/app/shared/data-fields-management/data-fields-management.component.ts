import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ElementReturn, FieldArray } from '../../core/model/SearchModal.model';
import { ProductService } from '../../services/product.service';
import { ModalSearchComponent } from '../modal-search/modal-search.component';
import { RulesWizardComponent } from '../rules-wizard/rules-wizard.component';
import { Menu } from 'primeng/menu';
import { ModalDeleteComponent } from 'libs/commons-lib/src/lib/components/modal-delete/modal-delete.component';

@Component({
  selector: 'rs-mf-data-fields-management',
  templateUrl: './data-fields-management.component.html',
  styleUrls: ['./data-fields-management.component.scss'],
  providers: [
    ConfirmationService,
    DynamicDialogRef,
    DialogService,
    MessageService,
  ],
})
export class DataFieldsManagementComponent implements OnInit {
  @ViewChild('groupNameInput') groupNameInput!: ElementRef;
  @ViewChild('menu') menu!: Menu;
  @Input() applicationLevel: string = '';
  @Input() groups: any = new FormArray([]);
  @Input() modifyData: boolean = false;
  @Input() addItemMsg: string = 'Elementos asociados correctamente';
  @Input() complementaryData: any = new FormArray([], [Validators.required]);
  @Input() emptyText: string = '';
  @Input() emptySubText: string = '';
  @Input() removeItemMsg: string = '';

  isLoading = false;
  flagError = false;
  selectedField: any = new FormGroup({
    initializeRule: new FormControl([], []),
    validateRule: new FormControl([], []),
  });
  selectedGroup = new FormGroup({});
  dependsArray: FieldArray[] = [];
  essentialData: any = [];
  defaultListOptions = [{ id: 0, name: '' }];
  contextData: any = [];
  paramValuesList: any = [];
  formGroupTitle: FormGroup;
  itemsMenu: any[] = [];
  selectedGroupItem: any = null;
  constructor(
    public fb: FormBuilder,
    public productService: ProductService,
    public dialogService: DialogService,
    private messageService: MessageService
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

  /**
   * Component's OnInit function
   */
  ngOnInit(): void {
    this.loadEssentialData();
    this.loadContextData();

    this.itemsMenu = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Editar título del grupo',
            icon: 'pi pi-pencil',
            command: () => this.startGroupEdit(this.selectedGroupItem),
          },
          {
            label: 'Eliminar grupo',
            icon: 'pi pi-trash',
            command: () => this.removeGroup(this.selectedGroupItem),
          },
        ],
      },
    ];
  }

  /**
   *
   * @param group Group attributes
   * Function to disable delete option from group options menu
   */
  disabledItem(group: any) {
    if (group.value.code === 'datos_basicos') {
      this.itemsMenu[0].items[1].disabled = true;
    } else {
      this.itemsMenu[0].items[1].disabled = false;
    }
  }

  /**
   * Function to get the groups
   */
  get complementaryDataControls(): FormArray {
    return this.groups as FormArray;
  }

  /**
   *
   * @param id Id group
   * @returns
   */
  getGroupArrayById(id: number) {
    return <FormArray>(
      this.complementaryDataControls.controls
        .find((x) => x.value.id === id)
        ?.get('fields')
    );
  }

  /**
   *
   * @param group Group attributes
   * @returns FormArray fields
   */
  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  /**
   *
   * @param form FormArray fields
   * @returns formArray
   */
  getFieldsFormArray(form: any) {
    return <FormArray>form;
  }

  /**
   *
   * @param event CdkDragDrop
   * @param fieldsArray FormArray fields
   * Function to drop the element in the array
   */
  drop(event: CdkDragDrop<any>, fieldsArray: FormArray) {
    fieldsArray.controls[event.previousContainer.data.index] =
      event.container.data.item;
    fieldsArray.controls[event.container.data.index] =
      event.previousContainer.data.item;
  }

  /**
   * Function to load essential data
   */
  loadEssentialData() {
    this.isLoading = true;
    const parameters =
      (this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0') +
      '/' +
      this.applicationLevel;

    this.productService
      .getApiData(
        `complementaryData/findEssentialDataByInsuranceLineApplicationLevel/${parameters}`
      )
      .subscribe({
        next: (res: any) => {
          if (res && res.body) {
            if (Array.isArray(res.body)) {
              this.essentialData = res.body;
            } else {
              this.essentialData = [res.body];
            }
          }
          this.setEssentialData(this.essentialData);
          this.updateEssentialDataProperties();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.flagError = true;
          console.error('Ha ocurrido un error al obtener los datos necesarios');
        },
      });
  }

  /**
   * Function to load context data
   */
  loadContextData() {
    this.productService.getApiData(`domainList/DATOS_CONTEXTO`).subscribe({
      next: (res: any) => {
        this.contextData = res.body.nmValueList;
        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData = this.contextData.filter(
          (data: any) =>
            data.applctnLvl.includes(this.applicationLevel) ||
            data.applctnLvl.includes('*')
        );
      },
      error: (error) => {
        this.flagError = true;
        console.error('Ha ocurrido un error al obtener los datos necesarios');
      },
    });
  }

  /**
   *
   * @param data Data attributes
   * Function to set essential data
   */
  setEssentialData(data: any[]) {
    let dataGroup: any[] = [];

    let arrayGroups: any = this.fb.array(
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
            name: 'Datos básicos', // revertir antes de subir
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

  /**
   *
   * @param itemParam attributes of the selected field
   * Function to select a complementary data
   */
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
      this.selectedField?.get('fieldGroup')?.value
    );
    if (obj && obj.value.length <= 1) {
      setTimeout(() => {
        this.selectedField?.get('fieldGroup')?.disable();
      });
    } else {
      setTimeout(() => {
        this.selectedField?.get('fieldGroup')?.enable();
      });
    }

    if (this.selectedField?.get('requiredEssential')?.value === true) {
      setTimeout(() => {
        this.selectedField?.get('required')?.disable();
      });
    } else {
      setTimeout(() => {
        this.selectedField?.get('required')?.enable();
      });
    }
  }

  /**
   *
   * @param obj object with the supplementary data selected in the modal
   * @param group Group to which the item belongs
   * @param showMessage Indicates whether or not to show the message
   * Function to add item in complementaryDataControls.
   */
  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      for (let object of obj) {
        const index = this.getAllFields().findIndex(
          (x: { id: number }) => x.id === object.id
        );

        if (this.modifyData) {
          if (index === -1) {
            this.getGroupArrayById(group).push(
              new FormGroup({
                id: this.fb.control(object.id, [Validators.required]),
                name: this.fb.control(object.name, [Validators.required]),
                label: this.fb.control(
                  object.element.nmLabel
                    ? object.element.nmLabel
                    : object.element.label,
                  [Validators.required]
                ),
                dataType: this.fb.control(object.element.dataType),
                shouldDelete: this.fb.control(object.shouldDelete, [
                  Validators.required,
                ]),
                businessCode: this.fb.control(object.element.businessCode),
                domainList: this.fb.control(object.element.domainList),
              })
            );

            if (
              this.getGroupArrayById(1).length > 0 &&
              this.getGroupArrayById(1).controls.length === 1
            ) {
              this.selectComplementaryData(
                <FormGroup>this.getGroupArrayById(1).controls[0]
              );
            }
          }
        } else {
          if (index === -1) {
            this.getGroupArrayById(group).push(
              new FormGroup({
                id: this.fb.control(object.id, [Validators.required]),
                name: this.fb.control(object.name, [Validators.required]),
                label: this.fb.control(
                  object.element.nmLabel
                    ? object.element.nmLabel
                    : object.element.label,
                  [Validators.required]
                ),
                dataType: this.fb.control(object.element.dataType),
                initializeRule: this.fb.control([], []),
                validateRule: this.fb.control([], []),
                dependency: this.fb.control(null, []),
                requiredEssential: this.fb.control(
                  object.element.flIsMandatory === 'S' ? true : false,
                  [Validators.required]
                ),
                required: this.fb.control(
                  object.element.flIsMandatory === 'S' ? true : false,
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
        }
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
        this.messageService.add({
          key: 'toast',
          severity: 'success',
          summary: 'Asociación exitosa',
          detail: this.addItemMsg,
        });
      }
    }
  };

  /**
   *
   * @returns All fields in the complementary data
   * Function to get all fields in the complementary data.
   */
  getAllFields() {
    let res: any[] = [];
    for (const group of this.complementaryDataControls.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  /**
   *
   * @returns list of values
   * Funtion to get the list of values to be used in the search of the modal.
   */
  getParamValuesList() {
    let list: any = [];

    for (let field of this.getAllFields()) {
      const objField = {
        id: field.businessCode,
        name: field.name,
      };
      list.push(objField);
    }

    for (let field of this.contextData) {
      const objContext = {
        id: field.code,
        name: field.description,
      };
      list.push(objContext);
    }

    list = list.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));

    return list;
  }

  /**
   *
   * @param code code to identify the type of the search modal to be executed
   * @param list variable of type array with the elements that already contain the fields
   * Function to open the query modal and multiple selection
   */
  openDialogAddData() {
    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmLabel'],
        dbColumnName: ['nmLabel'],
      },
      {
        field: 'dataType.description',
        header: 'Descripción',
        displayValue: ['dataType.description'],
        dbColumnName: ['dsDescription'],
      },
      { field: 'shouldDelete', displayValue: [true] },
      { field: 'element', displayValue: ['element'] },
    ];

    const parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const dialogRef = this.dialogService.open(ModalSearchComponent, {
      data: {
        code: 'complementaryDataControls',
        list: this.getAllFields(),
        columns: columns,
        parameter,
      },
      showHeader: false,
      width: '600px',
    });
    let res: ElementTableSearch[] = [];

    dialogRef.onClose.subscribe((res) => {
      this.addItem(res, 1, true);
    });
  }

  /**
   *
   * @param code Code to identify the type of the search modal to be executed
   * @param list variable of type array with the elements that already contain the fields
   * Function to open the query modal and multiple selection
   */
  openRuleWizard(code: string, field: string) {
    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmName'],
        dbColumnName: ['nmname'],
      },
      {
        field: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription'],
        dbColumnName: ['dsdescription'],
      },
      {
        field: 'cdRuleType',
        displayValue: ['cdRuleType'],
        dbColumnName: ['cdRuleType'],
      },
      { field: 'endPoint', displayValue: ['endPoint'] },
      { field: 'nmParameterList', displayValue: ['nmParameterList'] },
      { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
      { field: 'urlBs', displayValue: ['urlBs'] },
    ];

    const parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: {
        code: code,
        list: this.selectedField?.get(field)?.value,
        columns: columns,
        paramValues: this.getParamValuesList(),
      },
      showHeader: false,
      width: '600px',
    });
    let res: ElementTableSearch[] = [];

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.addRule(field, res);
      }
    });
  }

  /**
   *
   * @param field Field name of the rule to execute
   * @param objRule object with the rule data
   * Function to add the rule
   */
  addRule(field: string, objRule: any) {
    let arr: any[] = [];
    let element: any = {
      id: objRule.rule.id,
      name: objRule.rule.name,
      cdBusinessCode: objRule.rule.cdBusinessCode,
      description: objRule.rule.description,
      cdRuleType: objRule.rule.cdRuleType,
      endPoint: objRule.rule.endPoint,
      rlEngnCd: objRule.rule.rlEngnCd,
      argmntLst: objRule.parameters,
    };

    arr.push(element);
    this.selectedField?.get(field)?.setValue(arr);
  }

  /**
   *
   * @param id Id group
   * Function to associate references
   */
  associateReference(id: number) {
    if (id) {
      let obj = this.getGroupArrayById(1)!.value.find(
        (x: { id: number }) => x.id === id
      );

      if (obj.dependency !== null) {
        let objAux = this.getGroupArrayById(1)!.value.find(
          (x: { id: number }) => x.id === obj.dependency
        );

        while (objAux && objAux.dependency !== null) {
          if (objAux.dependency === this.selectedField.value.id) {
            this.messageService.add({
              key: 'toast',
              severity: 'warn',
              summary: 'Asociación con ciclos',
              detail: 'No se puede generar esta asociación',
            });
            this.selectedField?.get('dependency')?.setValue(null);
            break;
          }
          objAux = this.getGroupArrayById(1).value.find(
            (x: { id: number }) => x.id === objAux.dependency
          );
        }
      }
    } else {
      this.selectedField?.get('dependency')?.setValue(null);
    }
  }

  /**
   *
   * @param item item attributes
   * @returns true if the item is configured, false otherwise
   */
  isConfigured(item: any) {
    let req1 = item.value.required == false ? 0 : 1;
    req1 += item.value.editable == true ? 0 : 1;
    req1 += item.value.visible == true ? 0 : 1;
    req1 += item.value.initializeRule.length == 0 ? 0 : 1;
    req1 += item.value.validateRule.length == 0 ? 0 : 1;
    req1 += item.value.dependency == null ? 0 : 1;
    return req1 == 0 ? false : true;
  }

  /**
   *
   * @param id Id group
   * Function to associate groups
   */
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

  /**
   *
   * @param arr Array groups
   * @param prop property type
   * @returns max value of the property of the array groups
   */
  getMax(arr: any[], prop: string) {
    return arr.length > 0 ? Math.max(...arr.map((o) => Number(o[prop]))) : 0;
  }

  /**
   *
   * @param id Id group
   * @param name group name
   * @returns group code
   * function to get the bussinescode
   */
  getGroupBusinessCode(id: number, name: string) {
    let code = 'gd';
    code += String(id).padStart(3, '0');
    name = this.removeAccents(name);
    name = name.replace(/\s/g, '').toLowerCase();
    name = name.slice(-24);
    code += '_' + name;

    return code;
  }

  /**
   *
   * @param name Group name
   * @returns true if the name is available, false otherwise
   */
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
    return this.formGroupTitle.controls['groupTitle'].hasError('required')
      ? 'Ingrese el nombre del grupo'
      : this.formGroupTitle.controls['groupTitle'].hasError('pattern')
      ? 'El nombre del grupo no recibe caracteres especiales'
      : this.formGroupTitle.controls['groupTitle'].hasError('maxlength')
      ? 'La longitud máxima es de 200 caracteres'
      : this.formGroupTitle.controls['groupTitle'].hasError('name')
      ? 'Ya existe un grupo con el nombre ingresado'
      : '';
  }

  /**
   * Function to add a new group
   */
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
      this.complementaryDataControls.controls[
        this.complementaryDataControls.controls.length - 1
      ]
    );
  }

  /**
   *
   * @param group group attributes
   * Funtion to start group edit
   */
  startGroupEdit(group: any) {
    group?.get('isEditing')?.setValue(true);
    this.selectedGroup = group;

    setTimeout(() => {
      this.formGroupTitle
        ?.get('groupTitle')
        ?.setValue(group?.get('name')?.value);
      this.groupNameInput?.nativeElement.select();
    }, 0);
  }

  /**
   *
   * @param event capture the event
   * @param group group attributes
   * Function to finish group edit
   */
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
   *
   * @param group Group attributes
   * Function to remove group
   */
  removeGroup(group: any) {
    let index = this.complementaryDataControls.value.findIndex(
      (x: { id: number }) => x.id === group.get('id')?.value
    );

    let dialogRef = this.dialogService.open(ModalDeleteComponent, {
      data: {
        message:
          '¿Está seguro de querer eliminar el grupo "' +
          group.get('name')?.value +
          '"?',
        subMessage:
          'Los datos asociados al grupo pasarán al grupo de datos básicos',
      },
      showHeader: false,
      width: '400px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.confirmationRemovegroup(res, index, group);
    });
  }

  confirmationRemovegroup(res: any, index: any, group: any){
    if (res) {

      if (index >= 0) {

        const groupBk = [
          ...(this.getGroupArrayById(group.get('id')?.value)?.controls || []),
        ];

        this.complementaryDataControls.removeAt(index);
        for (let field of groupBk) {
          field.get('fieldGroup')?.setValue(1);
          this.getGroupArrayById(1).push(field);
        }
        this.removeGroupCascade(group);
      }
    }
  }

  /**
   *
   * @param group Group attributes
   * Removes the association of groups in the other components
   */
  removeGroupCascade(group: any): void {
    let indexGroup: any = (<FormArray>(
      this.productService.prvwDt?.get('plcyDtGrp')
    )).controls.findIndex((x) => x.value.id === group.get('id')?.value);

    (<FormArray>this.productService.prvwDt?.get('plcyDtGrp')).removeAt(
      indexGroup
    );

    let index = (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )).controls.findIndex((x) => x.value.id === group.get('id')?.value);

    (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )).removeAt(index);
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
        .filter((x) => x.name !== this.selectedGroup?.get('name')?.value);

      isValid = !array.find(
        (x: { name: string }) =>
          this.removeAccents(x.name.toLowerCase()) ===
          this.removeAccents(currentValue)
      );
      return isValid ? null : { name: true };
    };
  }

  /**
   *
   * @param text name of the field
   * @returns text without accents
   */
  removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Function to remove complementary data
   */
  removeComplementaryData() {
    let obj = this.getAllFields().find(
      (x: { id: number }) => x.id === this.selectedField.value.id
    );
    let index = this.getGroupArrayById(obj.fieldGroup).value.findIndex(
      (x: { id: number }) => x.id === this.selectedField.value.id
    );

    let dialogRef = this.dialogService.open(ModalDeleteComponent, {
      data: {
        message: `${this.removeItemMsg}`,
      },
      showHeader: false,
      width: '400px',
    });
    dialogRef.onClose.subscribe((res) => {
      this.removeConfirmation(res, index, obj);
    });
  }

  /**
   * Remove when res is true
   */
  removeConfirmation(res: any, index: any, obj: any) {
    if (res) {
      if (index >= 0) {
        this.removeAssociatedReference();
        this.getGroupArrayById(obj.fieldGroup).removeAt(index);
        if (this.groups) {
          this.DeleteCascadeDateModify(1);
        }
        this.selectedField = new FormGroup({});
        if (this.getGroupArrayById(1).length > 0) {
          this.selectComplementaryData(
            <FormGroup>this.getGroupArrayById(1).controls[0]
          );
        }
      }
    }
  }

  /**
   * Function to remove the association of the complementary data
   */
  removeAssociatedReference() {
    for (let element of this.getGroupArrayById(1).controls) {
      if (element?.get('dependency')?.value === this.selectedField.value.id) {
        element?.get('dependency')?.setValue('');
      }
    }
  }

  /**
   * Function to removes the association of policy data and modification types
   */
  DeleteCascadeDateModify(id: number) {
    for (
      let x: number = 0;
      x < this.productService.modificationTypes.length;
      x++
    ) {
      for (const obj of this.productService.modificationTypes?.value[
        x
      ].visibleNonModificableData[0]?.fields.filter(
        (x: { id: number }) => x.id === this.selectedField.value.id
      )) {
        let index =
          this.productService.modificationTypes.value[
            x
          ].visibleNonModificableData[0]?.fields.indexOf(obj);
        (<FormArray>(
          (<FormArray>(
            this.productService.modificationTypes.controls[x].get(
              'visibleNonModificableData'
            )
          )).controls[0]?.get('fields')
        )).removeAt(index);
      }
    }
  }
  /**
   * Function to update the data type of the essential data
   */
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
