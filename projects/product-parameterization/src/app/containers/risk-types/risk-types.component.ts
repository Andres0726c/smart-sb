import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { ComplementaryDataComponent } from '../../shared/complementary-data/complementary-data.component';
import { CommercialPlanComponentWizard } from './commercial-plan-wizard/commercial-plan-wizard.component';
import { CommercialPlanComponent } from './commercial-plan/commercial-plan.component';
import { MatStepper } from '@angular/material/stepper';
import { ProductService } from '../../services/product.service';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface RiskTypeNode {
  name: string;
  id?: number;
  children?: RiskTypeNode[];
}

interface subItemsRiskType {
  name: string,
  formArray: string,
  distance: number,
}

@Component({
  selector: 'app-risk-types',
  templateUrl: './risk-types.component.html',
  styleUrls: ['./risk-types.component.scss'],
})
export class RiskTypesComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('complementaryDataComponent')
  complementaryDataComponent!: ComplementaryDataComponent;

  @ViewChild('commercialPlanComponent') commercialPlanComponent!: CommercialPlanComponent;

  //Definition to Component Tree Angular Material
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<RiskTypeNode, RiskTypeNode>();

  private _transformer = (node: RiskTypeNode, level: number) => {
    const flatNode = {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
    this.flatNodeMap.set(flatNode, node);
    return flatNode;
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<RiskTypeNode, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource: MatTreeFlatDataSource<RiskTypeNode, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  //Finished to definition component tree angular material

  subItemsRiskTypes: subItemsRiskType[] = [
    { name: 'Datos del riesgo', formArray: 'complementaryData', distance: 1 },
    { name: 'Planes comerciales', formArray: 'businessPlans', distance: 2 },
  ];
  selectedRiskType: any = new FormGroup({});
  index: number = 0;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public fb: FormBuilder
  ) {
    this.productService.riskTypes.controls.forEach((riskType: any) => {
      this.dataSource.data.push({
        name: riskType.value.name,
        id: riskType.value.id,
        children: [
          { name: 'Datos del riesgo' },
          { name: 'Planes comerciales' },
        ],
      });
    });
    this.updateTree()
  }

  ngOnInit(): void {
    this.selectedRiskType = this.riskTypeGroup;
  }

  get riskTypeGroup(): FormGroup {
    return this.productService.riskTypes.controls[this.index] as FormGroup;
  }

  // get riskTypeControls(): FormArray {
  //   return (<FormArray>(
  //     this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
  //   )) as FormArray;
  // }
  


  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];
    
    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
        ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
        : '0';
      
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'riskTypeDataControls',
        columns: columns,
        list: this.productService.riskTypes.value,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.productService.riskTypes.length == 0) {
        this.addRiskType(res);
        this.index = 0;
        this.selectedRiskType = this.riskTypeGroup;
      } else {
        this.addRiskType(res);
      }
    });
  }

  addRiskType = (riskTypes: ElementTableSearch[]): void => {
    if (riskTypes) {
      for (let riskType of riskTypes) {
        this.productService.riskTypes.push(
          this.fb.group({
            id: this.fb.control(riskType.id, Validators.required),
            name: this.fb.control(riskType.name, Validators.required),
            description: this.fb.control(
              riskType.description,
              Validators.required
            ),
            complementaryData: this.fb.array([], Validators.required),
            businessPlans: this.fb.array([], Validators.required),
          })
        );

        //RiskModify
        this.riskTypeControls.push(
          this.fb.group({
            id: this.fb.control(riskType.id, Validators.required),
            name: this.fb.control(riskType.name, Validators.required),
            description: this.fb.control(
              riskType.description,
              Validators.required
            ),
            rskTypDtGrp:this.fb.array([],Validators.required),
            cmmrclPln:this.fb.array([],Validators.required)
          })
        )

        this.dataSource.data.push({
          name: riskType.name,
          id: riskType.id,
          children: [
            { name: 'Datos del riesgo' },
            { name: 'Planes comerciales' },
          ],
        });
      }
      this.updateTree();
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Los tipos de riesgo fueron asociados correctamente',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

  get riskTypeControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }

  removeRiskType = (node: ExampleFlatNode): void => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: `¿Está seguro de querer desasociar el tipo de riesgo "${
          this.flatNodeMap.get(node)?.name
        }"?`,
        subMessage:
        'También se eliminaran los datos del riesgo y la información de planes comerciales asociados.'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.findIndexRiskType(node);
        const id = this.productService.riskTypes.at(index).value.id;
        this.productService.riskTypes.removeAt(index);
        this.deleteRiskMdfctPrcss(node);
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id != id
        );
        if (id == this.selectedRiskType.value.id || index == 0) {
          this.index = 0;
        }
        this.selectedRiskType = this.riskTypeGroup;
        this.updateTree(); 
        if (this.complementaryDataComponent) {
          this.complementaryDataComponent?.reset();
        }
        if (this.commercialPlanComponent) {
          this.commercialPlanComponent?.reset();
        }
      }
    });
  };

  findIndexRiskType(node: ExampleFlatNode): number {
    return (
      this.dataSource.data.findIndex(
        (item) => item.id == this.flatNodeMap.get(node)?.id
      ) || 0
    );
  }

  updateTree = (): void => {
    this.dataSource.data = this.dataSource.data;
    for (let value of this.treeControl.dataNodes) {
      this.treeControl.expand(value);
    }
  };

  viewRiskType = (node: ExampleFlatNode): void => {
    this.index = this.findIndexRiskType(node);
    if(node.name !== this.selectedRiskType.get('name')?.value){
      this.selectedRiskType = this.riskTypeGroup;
      if (this.complementaryDataComponent) { this.complementaryDataComponent.reset() }
    }
  };

  quantityItems = (node: ExampleFlatNode): number => {
    const startIndex = this.treeControl.dataNodes.indexOf(node);
    const subItemsRiskType: subItemsRiskType = this.subItemsRiskTypes.filter(item => item.name == this.flatNodeMap.get(node)?.name)[0]
    const currentNode = this.treeControl.dataNodes[startIndex-subItemsRiskType.distance];
    const index = this.findIndexRiskType(currentNode);
    if(node.name==="Datos del riesgo" && this.productService.riskTypes.controls[index].get(subItemsRiskType.formArray)?.value[0]){  
      return this.productService.riskTypes.controls[index].get(subItemsRiskType.formArray)?.value[0].fields.length;
    }
     else if(node.name!=="Datos del riesgo"){
      return this.productService.riskTypes.controls[index].get(subItemsRiskType.formArray)?.value.length;
    }else{
      return 0;
    }
  };

  classToRiskTypeSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedRiskType?.value.id;
  }

  openwizzard(action: string) {
    const dialogRef = this.dialog.open(CommercialPlanComponentWizard, {
      data: { action: action, dataCoverages:this.productService.coverages},
      panelClass: 'custom-dialog-container',
      width: "800px",
      disableClose: true
    });
      dialogRef.afterClosed().subscribe((result: []) => {
    }); 
  }

  deleteRiskMdfctPrcss(node: any){
    let mdfctnPrcss = this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')?.value;

    let index =  mdfctnPrcss.findIndex((obj:any) => obj.name === node.name);

    if (index > -1) {
      (<FormArray>this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')).removeAt(index);
    }
  }

  
}
