import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { MenuItem } from 'primeng/api';

import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';

import {
  DataToast,
  STATES,
} from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';
interface OptionsCommercialP {
  name: string;
  key: string;
}

interface Coverages {
  id: number;
  required: boolean;
}
interface BussinesPlans {
  code: string;
  coverages: Coverages[];
  description: string;
  name: string;
  servicePlans: Coverages[];
  athrzdOprtn?: OptionsCommercialP[];
}

@Component({
  selector: 'refactoring-smartcore-mf-modification-types',
  templateUrl: './modification-types.component.html',
  styleUrls: ['./modification-types.component.scss'],
})
export class ModificationTypesComponent implements OnInit {
  items1: MenuItem[] = [];
  titleBussinesPlan: string = '';
  titleRisk: string = '';
  titleCommercialPlan: string = '';
  bussinesPlans: boolean = false;
  data: string = '';
  riskDataCode: string = '';
  showBranch: BussinesPlans[] = [];
  riskData: boolean = false;
  riskType: string = '';
  policyData: boolean = false;
  showCommercialPlans: boolean = false;
  showCommercialPlansTypes: boolean = false;
  showRisk: boolean = false;
  nameBrach: string = '';
  titleCurrent: any = 'Datos de la póliza';
  idCommercialPlan: string = '';
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar,
    public productService: ProductService
  ) {
    this.calledMenu();
  }
  ngOnInit(): void {
   
  //this.complementaryDataControls.clear();
  }

  getGroupArrayById(id: number) {
    return <FormArray>(
      this.complementaryDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('fields')
    );
    //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }

  openToAdd(): void {
    let sendData = [];
    sendData = this.productService.policyData?.value[0].fields;

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
        code: 'emissionData',
        columns: columns,
        list: this.getAll(),
        data: this.getAllFields(),
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }

  getAllFields() {
    let res: any[] = [];
    for (const group of this.productService.policyData?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAll() {
    let res: any[] = [];
    for (const group of this.complementaryDataControls?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  get complementaryDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )) as FormArray;
  }

  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      let data: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'this.successAddItemMsg,',
      };

      let nameGruop: any;

      for (let object of obj) {
        nameGruop = this.getNameGroup(object.element.businessCode);

        if (
          this.complementaryDataControls.value.findIndex(
            (x: { id: any }) => x.id === nameGruop.id
          ) === -1
        ) {
          this.complementaryDataControls.push(
            new FormGroup({
              id: this.fb.control(nameGruop.id),
              code: this.fb.control(nameGruop.code),
              name: this.fb.control(nameGruop.name),
              fields: this.fb.array([], Validators.required),
              isEditing: this.fb.control(nameGruop.isEditing),
            })
          );
        }

        const index = this.complementaryDataControls.value.findIndex(
          (x: { id: any }) => x.id === nameGruop.id
        );
        // const index2 = this.getAll().findIndex((x: { id: number; }) => x.id === object.id);

        //   if (index2 === -1) {

        this.getGroupArrayById(index + 1).push(
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
            initializeRule: this.fb.array([], []),
            validateRule: this.fb.array([], []),
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
            fieldGroup: this.fb.control(index + 1, []),
            shouldDelete: this.fb.control(object.shouldDelete, [
              Validators.required,
            ]),
            businessCode: this.fb.control(object.element.businessCode),
            domainList: this.fb.control(object.element.domainList),
          })
        );
      }

      // console.log(this.complementaryDataControls,"test");
    }
  };

  selectGroup() {
    let newGroupName = 'Nuevo grupo';

    const Group = this.fb.group({
      id: "this.getMax(this.complementaryDataControls.value, 'id') + 1,",
      name: newGroupName,
      code: null,
      fields: this.fb.array([], Validators.required),
      isEditing: this.fb.control(false),
    });

    // this.startGroupEdit(this.complementaryData.controls[this.complementaryData.length - 1]);
  }

  getNameGroup(name: any) {
    let objGruop;

    for (let groups of this.productService.policyData.value) {
      for (let key of groups.fields) {
        if (key.businessCode === name) {
          objGruop = {
            id: groups.id,
            code: groups.code,
            name: groups.name,
            fields: this.fb.array([], Validators.required),
            isEditing: groups.isEditing,
          };
          break;
        }
      }
    }

    return objGruop;
  }

  addBranch(items: any, showMenu?: BussinesPlans[]): MenuItem[] {
    let list: MenuItem[] = [];
    for (let itempush of items) {
      let label1 = itempush.name,
        label: MenuItem = {
          id: itempush.id,
          label: label1,
          icon: 'pi pi-fw',
          command: (event: any) => {
            this.dataSet(itempush);
          },
          items: [
            {
              label: 'Planes comerciales',
              icon: 'pi pi-fw',
              command: (event: any) => {
                this.showCommercialPlan(itempush);
              },
              items: this.addBusinessPlan(itempush.businessPlans, showMenu),
            },
          ],
        };
      list.push(label);
    }
    return list;
  }

  addBusinessPlan(bussinesPlan?: any, showMenu?: BussinesPlans[]) {
    let list: MenuItem[] = [];
    if (!showMenu) {
      showMenu = [];
    }
    for (let itempush of bussinesPlan) {
      let label1 = itempush.name,
        label: MenuItem;
      label = {
        id: itempush.code,
        label: label1,
        icon: 'pi pi-fw',
        expanded: false,
        disabled: this.addBranchCoverage(showMenu, itempush),
        command: (event: any) => {
          this.titleCommercialPlan = itempush.name;
          this.sendData(event.item.id);
        },
      };
      list.push(label);
    }
    return list;
  }

  onAddBranch(showMenu: BussinesPlans[]) {
    this.calledMenu(showMenu);
    this.showBranch = showMenu;
  }

  calledMenu(showMenu?: BussinesPlans[]) {
    this.items1 = [
      {
        label: 'Datos de la póliza',
        icon: 'pi pi-fw',
        command: (event: any) => {
          this.policyData = true;
          if (this.riskData) this.riskData = false;
        },
      },
      {
        label: 'Tipos de riesgo',
        icon: 'pi pi-fw',
        expanded: true,
        command: (event: any) => {
          this.showRiskType();
        },
        items: [
          ...this.addBranch(
            this.productService.getProductObject().riskTypes,
            showMenu
          ),
        ],
      },
    ];
  }
  addBranchCoverage(showMenu: BussinesPlans[], itempush: any) {
    let validate: boolean = true;
    for (let onOption of showMenu) {
      const result = onOption.athrzdOprtn?.find(({ key }) => key === 'MDF'),
        exist = this.showBranch.find(({ name }) => name === onOption.name);
      if (onOption.code === itempush.code && result) {
        return (validate = false);
      }
    }
    return validate;
  }

  sendData(idCommercialPlan: string) {
    localStorage.setItem(idCommercialPlan, JSON.stringify(this.showBranch));
    if (idCommercialPlan) {
      this.data = idCommercialPlan;
    }
    this.showCommercialPlansTypes = true;
    if (this.showCommercialPlans || this.bussinesPlans)
      this.showCommercialPlans = false;
    this.showRisk = false;
  }
  dataSet(itempush: any) {
    console.log(itempush);
    localStorage.setItem(
      itempush.name,
      JSON.stringify(
        this.productService
          .getProductObject()
          .riskTypes.find((product: any) => product.id === itempush.id)
      )
    );
    this.riskDataCode = itempush.name;
    this.riskType = itempush.name;
    this.titleRisk = itempush.name;
  }
  showRiskType() {
    this.riskData = true;
    this.titleCurrent = this.items1[1]?.label;
    this.showRisk = true;
    if (this.policyData) this.policyData = false;
    this.showCommercialPlans = false;
    this.showCommercialPlansTypes = false;
  }

  showCommercialPlan(itempush:any) {
    this.titleRisk = itempush.name;
    this.showCommercialPlans = true;
    this.riskData = false;
    this.policyData = false;
    if (this.showCommercialPlansTypes) this.showCommercialPlansTypes = false;
    this.showRisk = false;
  }
}
