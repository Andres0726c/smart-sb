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
interface OptionsCommercialP {
  name: string;
  key: string;
}

interface BussinesPlans {
  code: string;
  coverages: any[];
  description: string;
  name: string;
  servicePlans: any[];
  athrzdOprtn: [];
}
interface Coverages {
  description: string;
  id: number;
  name: string;
  cvrgDtGrp: any;
  athrzdOprtn: any;
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
  flagInit:boolean=true;
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar,
    public productService: ProductService
  ) {}
  ngOnInit(): void {

    console.log(this.productService.mdfctnPrcss?.get('mdfcblDt'))

    if (
      (<FormArray>(
        this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
      )).length === 0
    ) {
      this.productService.addRisk();
    }

    if (this.getcmmrclPln(2).length === 0 || this.getcmmrclPln(2).controls[0]?.get('coverages')) {
      this.getcmmrclPln(2).clear();
      this.addDataRisk();
    }
    //console.log(this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp'))
    this.calledMenu();
  }
 
  addDataRisk() {
    let coverages:any = this.fb.array([]);
    let servicePlans:any = this.fb.array([]);
 
    for (const risk of this.productService.riskTypes.value) {
      for (let plan of risk.businessPlans) {
        coverages.clear();
        servicePlans.clear();
        for (let coverage of plan.coverages) {
          coverages.push(
            this.fb.group({
              id: this.fb.control(coverage.id),
              required: this.fb.control(coverage.required),
              name: this.fb.control(
                this.getDataCoverages(coverage.id, 'name')?.value
              ),
              description: this.fb.control(
                this.getDataCoverages(coverage.id, 'description')?.value
              ),
              athrzdOprtn: this.fb.array([]),
              cvrgDtGrp: this.fb.array([], []),
            })
          );
  
        }
        for (let servicePlan of plan.servicePlans) {
          servicePlans.push(
            this.fb.group({
              id: this.fb.control(servicePlan.id),
              required: this.fb.control(servicePlan.required),
              name: this.fb.control(
                this.getServicesPlan(servicePlan.id, 'name')?.value
              ),
              description: this.fb.control(
                this.getServicesPlan(servicePlan.id, 'description')?.value
              ),
              athrzdOprtn: this.fb.array([]),
            })
          );
        }
        this.getcmmrclPln(risk.id).push(
          this.fb.group({
            name: this.fb.control(plan.name),
            code: this.fb.control(plan.code),
            description: this.fb.control(plan.description),
            athrzdOprtn: this.fb.array([]),
            cvrg:coverages ,
            srvcPln:servicePlans,
          })
        );
      }

    }

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

  
  getcmmrclPln(id: number) {
    return (<FormArray>(
      this.policyDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('cmmrclPln')
    )) as FormArray;
  }

  getGroupArrayById(id: number) {
    return <FormArray>(
      this.complementaryDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('fields')
    );
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
        title:level === 'risk' ?'Seleccionar datos del riesgo':'Seleccionar datos de la póliza',
        subtitle:level === 'risk' ?'Seleccione los datos de riesgo que desea asociar':'Seleccione los datos de la póliza que desea asociar',
        columns: columns,
        list: level === 'risk' ? this.getAllRiskField() : this.getAll(),
        data: level === 'risk' ? this.getAllRisk() : this.getAllFields(),
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

  getAllRiskField() {
    let res: any[] = [];
    for (const group of this.getRiskArrayByIdModify(2)?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAllRisk() {
    let res: any[] = [];

    for (const group of this.getRiskArraydById(2).getRawValue()) {
      res = res.concat(group.fields);
    }

    return res;
  }

  get complementaryDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('plcyDtGrp')
    )) as FormArray;
  }

  get policyDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }

  getRiskArrayByIdModify(id: number) {
    return <FormArray>(
      this.policyDataControls.controls
        .find((x) => x.value.id === id)
        ?.get('rskTypDtGrp')
    );
  }
  getAthrzdOprtn(code: string) {
    return   (<FormArray>(this.getcmmrclPln(2)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('athrzdOprtn') )) as FormArray;
  }


  getRiskArraydById(id: number) {
    return <FormArray>(
      this.productService.riskTypes.controls
        .find((x: { value: { id: number } }) => x.value.id === 2)
        ?.get('complementaryData')
    );
  }

  getGroupArrayByIdModify(id: number) {
    return <FormArray>this.getRiskArrayByIdModify(2)
      .controls.find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('fields');
    //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }

  showMessageGroup(showMessage: boolean) {
    let data: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg: 'Los datos de la póliza fueron asociados correctamente.',
    };
    if (showMessage) {
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  }

  addGroupArrayById(object: any, nameGruop: any) {
    const index = this.complementaryDataControls.value.findIndex(
      (x: { id: any }) => x.id === nameGruop.id
    );

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
        fieldGroup: this.fb.control(index + 1, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
  }
  addGroupArrayByIdRisk(object: any, nameGruop: any) {
    const index = this.getRiskArraydById(2).value.findIndex(
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
        fieldGroup: this.fb.control(index + 1, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
  }

  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      this.showMessageGroup(showMessage);
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

  addRisk(nameGroup: any) {
    if (
      this.getRiskArrayByIdModify(2).value.findIndex(
        (x: { id: any }) => x.id === nameGroup.id
      ) === -1
    )
      this.getRiskArrayByIdModify(2).push(
        new FormGroup({
          id: this.fb.control(nameGroup.id),
          code: this.fb.control(nameGroup.code),
          name: this.fb.control(nameGroup.name),
          fields: this.fb.array([], Validators.required),
          isEditing: this.fb.control(nameGroup.isEditing),
        })
      );
  }
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

  getNameGroup(name: any) {
    let objGruop;

    if (this.policyData) {
      objGruop = this.addGroupObj(this.productService.policyData.value, name);
    }

    if (this.riskData) {
      objGruop = this.addGroupObj(this.getRiskArraydById(2).value, name);
    }
    return objGruop;
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
  addBranch(items: any, showMenu?: any[]): MenuItem[] {
    let list: MenuItem[] = [];

    for (let itempush of items) {
      let label1 = itempush.name,
        label: MenuItem = {
          id: itempush.id,
          label: label1,
          icon: 'pi pi-fw',
          items: [
            {
              label: 'Planes comerciales',
              icon: 'pi pi-fw',
              command: (event: any) => {
                
                this.showCommercialPlan(itempush);
              },
              items: this.addBusinessPlan(itempush.cmmrclPln, showMenu),
            },
          ],
        };
      list.push(label);
    }
    return list;
  }

  addBusinessPlan(bussinesPlan: any, showMenu?: any[]) {
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
        expanded: true,
        disabled: this.flagInit? itempush.athrzdOprtn.find((x:any)=>x==='MDF')? false: true :this.addBranchCoverage(showMenu, itempush),
        command: (event: any) => {
          console.log(event);
          this.titleCommercialPlan = itempush.name;
          this.sendData(itempush.code, itempush.name);
        },
      };
      list.push(label);
    }
    this.flagInit=false;
    return list;
  }

  
  onAddBranch(showMenu: any[]) {
    this.calledMenu(showMenu);
    this.showBranch = showMenu;
  }

  calledMenu(showMenu?: any[]) {
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
        items: [...this.addBranch(this.policyDataControls.value, showMenu)],
      },
    ];
  }
  addBranchCoverage(showMenu: any[], itempush: any) {
    let validate: boolean = true;
    for (let onOption of showMenu) {
      const result = onOption.athrzdOprtn?.find((key: any) => key === 'MDF');
      if (onOption.code === itempush.code && result) {
        return (validate = false);
      }
    }
    
    
    return validate;


  }

  sendData(idCommercialPlan: string, title: string) {
    if (idCommercialPlan) {
      this.data = idCommercialPlan;
      this.titleBussinesPlan = title;
    }
    this.showCommercialPlansTypes = true;
    if (this.showCommercialPlans)
      this.showCommercialPlans = false;
    this.showRisk = false;
  }
  showRiskType() {
    this.riskData = true;
    this.titleCurrent = this.items1[1]?.label;
    this.showRisk = true;
    if (this.policyData) this.policyData = false;
    this.showCommercialPlans = false;
    this.showCommercialPlansTypes = false;
  }

  showCommercialPlan(itempush: any) {
    this.titleRisk = itempush.name;
    this.showCommercialPlans = true;
    this.riskData = false;
    this.policyData = false;
    if (this.showCommercialPlansTypes) this.showCommercialPlansTypes = false;
    this.showRisk = false;
  }
}
