import { Component, OnInit } from '@angular/core';
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
  ToastMessageComponent,
} from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';

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
  data: string = '';
  riskDataCode: string = '';
  showBranch: any[] = [];
  riskData: boolean = false;
  riskType: string = '';
  policyData: boolean = true;
  showCommercialPlans: boolean = false;
  showCommercialPlansTypes: boolean = false;
  showRisk: boolean = false;
  nameBrach: string = '';
  titleCurrent: any = 'Datos de la póliza';
  idCommercialPlan: string = '';
  flagInit: boolean = true;
  flagModify: boolean = false;
  flagButton: boolean = true;
  breadcrumbItem: any = [];

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar,
    public productService: ProductService
  ) {}
 
  ngOnInit(): void {
    this.updateRiskTypes();
    this.updateTree();
  }

  get complementaryDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    ));
  }

  get riskTypeMdfctnPrcss(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    ));
  }

  updateRiskTypes() {
    let risks = this.productService.riskTypes?.value;
    let riskTypeMdfctnPrcss = this.riskTypeMdfctnPrcss?.value;

    //Verificar que no exista nada en riskTypeMdfctnPrcss y añadir
    if (riskTypeMdfctnPrcss.length === 0) {
      for (let item of risks) {
        this.riskTypeMdfctnPrcss.push(
          this.fb.group({
            id: this.fb.control(item.id, Validators.required),
            name: this.fb.control(item.name, Validators.required),
            description: this.fb.control(item.description, Validators.required),
            rskTypDtGrp: this.fb.array([], Validators.required),
            cmmrclPln: this.fb.array(item.businessPlans, Validators.required),
          })
        );
      }
    } else {
      for (const item of risks) {
        let riskDiff = riskTypeMdfctnPrcss.filter((obj: any) => {
          return obj.name === item.name;
        });
        if (riskDiff.length === 0) {
          this.riskTypeMdfctnPrcss.push(
            this.fb.group({
              id: this.fb.control(item.id, Validators.required),
              name: this.fb.control(item.name, Validators.required),
              description: this.fb.control(
                item.description,
                Validators.required
              ),
              rskTypDtGrp: this.fb.array([], Validators.required),
              cmmrclPln: this.fb.array(item.businessPlans, Validators.required),
            })
          );
        }
      }
    }
  }

  updateTree(showMenu?: any[]) {
    let riskTypeMdfctnPrcss = this.riskTypeMdfctnPrcss?.value;
    this.items1 = [
      {
        label: 'Datos de la póliza',
        icon: 'pi pi-fw',
        command: (event: any) => {
          this.titleCurrent = 'Datos de la póliza';
          this.policyData = true;
          this.flagButton = true;
          if (this.riskData) this.riskData = false;
        },
        items: [],
      },
      {
        label: 'Tipos de riesgo',
        icon: 'pi pi-fw',
        expanded: true,
        command: (event: any) => {
          this.titleCurrent = 'Tipos de riesgo';
          this.flagButton = false;
        },
        items: this.flagModify ? [...this.verifyCheck(showMenu)] : [...this.addBranch(riskTypeMdfctnPrcss, showMenu)],
      },
    ];
  }

  addBranch(items: any, showMenu?: any[]): MenuItem[] {
    let list: MenuItem[] = [];

    for (let itempush of items) {
      let label: MenuItem = {
        id: itempush.id,
        label: itempush.name,
        icon: 'pi pi-fw',
        items: [
          {
            label: 'Planes comerciales',
            icon: 'pi pi-fw',
            command: (event: any) => {
              this.showCommercialPlan(itempush);
            },
            items: this.addBusinessPlan(itempush, showMenu),
          },
          {
            label: 'Datos del riesgo',
            icon: 'pi pi-fw',
            command: (event: any) => {
              this.breadcrumbItem = [{ label: itempush.name }, { label: 'Datos del riesgo' }];
              this.showRiskType(itempush);
            },
            items: [],
          },
        ],
      };

      list.push(label);
    }
    return list;
  }

  showCommercialPlan(itempush: any) {
    this.titleRisk = itempush.name;
    this.showCommercialPlans = true;
    this.riskData = false;
    this.policyData = false;
    if (this.showCommercialPlansTypes) this.showCommercialPlansTypes = false;
    this.showRisk = false;
  }

  showRiskType(itempush: any) {
    this.titleRisk = itempush.name;
    this.riskData = true;
    this.showRisk = true;
    if (this.policyData) this.policyData = false;
    this.showCommercialPlans = false;
    this.showCommercialPlansTypes = false;
  }

  addBusinessPlan(item: any, showMenu?: any[]) {
    let list: MenuItem[] = [];
    if (!showMenu) {
      showMenu = [];
    }
    for (let itempush of item.cmmrclPln) {
      const result = itempush.athrzdOprtn?.find(
        (key: any) => key === 'MDF'
      );
      
      let label = {
        id: itempush.code,
        label: itempush.name,
        icon: 'pi pi-fw',
        expanded: true,
        disabled: result ? false : true,
        command: (event: any) => {
          this.titleCommercialPlan = itempush.name;
          this.sendData(itempush.code, itempush.name, item.name);
        },
      };
      list.push(label);
    }

    this.flagInit = false;
    return list;
  }

  sendData(idCommercialPlan: string, title: string, titlerisk: string) {
    this.titleRisk = titlerisk;
    if (idCommercialPlan) {
      this.data = idCommercialPlan;
      this.titleBussinesPlan = title;
    }
    this.showCommercialPlansTypes = true;
    if (this.showCommercialPlans) this.showCommercialPlans = false;
    this.showRisk = false;
  }

  openToAdd(level: any): void {
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
        title:
          level === 'risk'
            ? 'Seleccionar datos del riesgo'
            : 'Seleccionar datos de la póliza',
        subtitle:
          level === 'risk'
            ? 'Seleccione los datos de riesgo que desea asociar'
            : 'Seleccione los datos de la póliza que desea asociar',
        columns: columns,
        list: level === 'risk' ? this.getAllRiskField() : this.getAll(),
        data: level === 'risk' ? this.getAllRisk() : this.getAllFields(),
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true, level);
    });
  }

  addItem = (
    obj: ElementReturn[],
    group: number,
    showMessage: boolean,
    level: string
  ) => {
    if (obj) {
      this.showMessageGroup(showMessage, level);
      let nameGruop: any;

      for (let object of obj) {
        nameGruop = this.getNameGroup(object.element.businessCode);

        if (this.riskData) {
          this.addRisk(nameGruop);
          this.addGroupArrayByIdRisk(object, nameGruop);
        }

        if (this.policyData) {
          this.add(nameGruop);
          this.addGroupArrayById(object, nameGruop);
        }
      }
    }
  };

  add(nameGroup: any) {
    if (
      this.complementaryDataControls.value.findIndex(
        (x: { id: any }) => x.id === nameGroup.id
      ) === -1
    )
      this.complementaryDataControls.push(
        new FormGroup({
          id: this.fb.control(nameGroup.id),
          code: this.fb.control(nameGroup.code),
          name: this.fb.control(nameGroup.name),
          fields: this.fb.array([], Validators.required),
          isEditing: this.fb.control(nameGroup.isEditing),
        })
      );
  }

  addGroupArrayById(object: any, nameGruop: any) {
 

    this.getGroupArrayById(nameGruop.id).push(
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
        fieldGroup: this.fb.control(nameGruop.id, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
  }

  addGroupArrayByIdRisk(object: any, nameGruop: any) {
    const index = this.getRiskArraydById(this.titleRisk).value.findIndex(
      (x: { id: any }) => x.id === nameGruop.id
    );
    this.getGroupArrayByIdModify(index + 1).push(
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
        fieldGroup: this.fb.control(nameGruop.id, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
  }

  addRisk(nameGroup: any) {
    if (
      this.getRiskArrayByIdModify(this.titleRisk).value.findIndex(
        (x: { id: any }) => x.id === nameGroup.id
      ) === -1
    )
      this.getRiskArrayByIdModify(this.titleRisk).push(
        new FormGroup({
          id: this.fb.control(nameGroup.id),
          code: this.fb.control(nameGroup.code),
          name: this.fb.control(nameGroup.name),
          fields: this.fb.array([], Validators.required),
          isEditing: this.fb.control(nameGroup.isEditing),
        })
      );
  }

  getNameGroup(name: any) {
    let objGruop;

    if (this.policyData) {
      objGruop = this.addGroupObj(this.productService.policyData.value, name);
    }

    if (this.riskData) {
      objGruop = this.addGroupObj(
        this.getRiskArraydById(this.titleRisk).value,
        name
      );
    }
    return objGruop;
  }

  getGroupArrayById(id: number) {
    return <FormArray>(
      this.complementaryDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('fields')
    );
  }
  addGroupObj(groupName: any, name: any) {
    let objGruop;
    for (let groups of groupName) {
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

  showMessageGroup(showMessage: boolean, level: string) {
    let data: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg:
        level == 'risk'
          ? 'Los tipos de riesgo fueron asociados correctamente.'
          : 'Los datos de la póliza fueron asociados correctamente.',
    };
    if (showMessage) {
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  }

  getAll() {
    let res: any[] = [];
    let aux = this.complementaryDataControls?.getRawValue();
    for (const group of aux) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getRiskArrayByIdModify(nameRisk: string) {
    return <FormArray>(
      this.riskTypeMdfctnPrcss.controls
        .find((x) => x.value.name === nameRisk)
        ?.get('rskTypDtGrp')
    );
  }

  getAllRiskField() {
    let res: any[] = [];
    let aux = this.getRiskArrayByIdModify(this.titleRisk)?.getRawValue();
    for (const group of aux) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAllRisk() {
    let res: any[] = [];

    for (const group of this.getRiskArraydById(this.titleRisk).getRawValue()) {
      res = res.concat(group.fields);
    }

    return this.sortParameterBy('name', res);
  }

  getRiskArraydById(name: string) {
    return <FormArray>(
      this.productService.riskTypes.controls
        .find((x: { value: { name: string } }) => x.value.name === name)
        ?.get('complementaryData')
    );
  }

  getAllFields() {
    let res: any[] = [];
    let aux = this.productService.policyData?.getRawValue();
    for (const group of aux) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getGroupArrayByIdModify(id: number) {
    return <FormArray>this.getRiskArrayByIdModify(this.titleRisk)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('fields');
  }
  sortParameterBy(property: any, complementaryData: any) {
    return complementaryData.sort((a: any, b: any) => {
      return a[property] >= b[property] ? 1 : -1;
    });
  }

  onAddBranch(showMenu: any[]) {
    this.flagModify = true;
    this.flagInit = true;
    this.updateTree(showMenu);
    this.showBranch = showMenu;
  }

  verifyCheck(showMenu?: any[]) {
    if (!showMenu) {
      showMenu = [];
    }
    let list:any = [];
    let risk: any = this.items1[1].items;
    for (let item of risk) {
      for (let obj of item.items[0].items) {
        if (showMenu?.length > 0 && showMenu[0].code === obj.id) {
          const result = showMenu[0].athrzdOprtn?.find(
            (key: any) => key === 'MDF'
          );
          if (result) {
            obj.disabled = false;
          } else {
            obj.disabled = true;
          }
        }
      }
    }
    list = this.items1[1].items;
    return list;
  }
}
