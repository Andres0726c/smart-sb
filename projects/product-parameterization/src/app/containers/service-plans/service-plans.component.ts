import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { STATES, ToastMessageComponent,DataToast } from '../../shared/toast-message/toast-message.component';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ClausesComponent } from '../../shared/clauses/clauses.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface ServicePlanNode {
  name: string;
  id?: number;
  children?: ElementTableSearch[];
}

@Component({
  selector: 'app-service-plans',
  templateUrl: './service-plans.component.html',
  styleUrls: ['./service-plans.component.scss']
})
export class ServicePlansComponent implements OnInit {

  @ViewChild(ClausesComponent) clauseComponent!: ClausesComponent;

    //Definition to Component Tree Angular Material
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ServicePlanNode, ServicePlanNode>();

  private _transformer = (node: ServicePlanNode, level: number) => {
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

  treeFlattener = new MatTreeFlattener<ServicePlanNode, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource: MatTreeFlatDataSource<ServicePlanNode, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  //Finished to definition component tree angular material

  selectedServicePlan: any = new FormGroup({});
  index: number = 0;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public fb: FormBuilder) { }

  ngOnInit(): void {
    this.selectedServicePlan = this.servicePlanGroup;
    this.updateTree();
  }


  get servicePlanGroup(): FormGroup {
    return this.productService.servicePlans.controls[this.index] as FormGroup;
  }
  getInitialParameter(){
    return(this.productService.initialParameters?.get('insuranceLine')?.value);
  }

  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['ds_description'] },
      { name: 'element', displayValue: ['element'] },
    ];

    let parameter =
    this.productService.initialParameters?.get('insuranceLine')?.value !== null
      ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
      : '0';
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'servicePlansDataControls',
        columns:columns,
        list: this.productService.servicePlans.value,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.productService.servicePlans.length == 0) {
        this.addServicePlan(res);
        this.index = 0;
        this.selectedServicePlan = this.servicePlanGroup;
      } else {
        this.addServicePlan(res);
      }
    });
  }

  addServicePlan = (servicePlans: ElementTableSearch[]): void => {
    if (servicePlans) {
      for (let servicePlan of servicePlans) {
        this.productService.servicePlans.push(
          this.fb.group({
            id: this.fb.control(servicePlan.id, Validators.required),
            name: this.fb.control(servicePlan.name, Validators.required),
            description: this.fb.control(
              servicePlan.description,
              Validators.required
            ),
            clauses: this.fb.array([], Validators.required),
          })
        );
      }
      this.updateTree();
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Los planes de servicio fueron asociados correctamente.',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

  removeServicePlan = (node: ExampleFlatNode): void => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: `¿Está seguro de querer desasociar el plan de servicio ${
          this.flatNodeMap.get(node)?.name
        }?`,
        subMessage:
          'También se eliminaran las cláusulas asociadas.',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.findIndexServicePlan(node);
        const id = this.productService.servicePlans.at(index).value.id;
        this.removeServicePlanCascade(id);
        this.productService.servicePlans.removeAt(index);
        this.updateTree();
      
        if (id == this.selectedServicePlan.value.id) {
          this.index = 0;
          this.selectedServicePlan = this.servicePlanGroup;
        }
      }
    });
  };

  findIndexServicePlan(node: ExampleFlatNode): any {
    return this.dataSource.data[0].children?.findIndex(
      (item) => item.id == this.flatNodeMap.get(node)?.id
    );
  }

  removeServicePlanCycle(idServicePlan: number, formArrayRT: FormArray) {
    for (const commercialPlan of formArrayRT.controls) {
      const formArrayServicePlans = <FormArray> commercialPlan.get('servicePlans');
      for (const servicePlan of formArrayServicePlans.controls.filter(x => x.get('id')?.value === idServicePlan)) {
        const index =  formArrayServicePlans.value.indexOf(servicePlan.value);
        formArrayServicePlans.removeAt(index);
      }
    }
  }

  removeServicePlanCascade(id: number) {
    // Eliminación de planes comerciales
    for (const riskType of this.productService.riskTypesControls.controls) {
      const formArrayRT = (<FormArray> riskType.get('businessPlans'));
      this.removeServicePlanCycle(id, formArrayRT);
    }
  }

  updateTree = (): void => {
    this.dataSource.data = [
      { name: 'Planes de servicio', children: this.productService.servicePlans.value },
    ];
    for(let value of this.treeControl.dataNodes){
      this.treeControl.expand(value);
    }
  };

  viewServicePlan = (node: ExampleFlatNode): void => {
    this.index = this.findIndexServicePlan(node);
    this.selectedServicePlan = this.servicePlanGroup;
     
  };

  classToServicePlanSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedServicePlan?.value.id;
  }

}
