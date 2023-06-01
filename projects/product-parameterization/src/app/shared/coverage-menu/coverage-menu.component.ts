import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { ProductService } from '../../services/product.service';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface CoverageNode {
  name: string;
  id?: number;
  children?: ElementTableSearch[];
}


@Component({
  selector: 'app-coverage-menu',
  templateUrl: './coverage-menu.component.html',
  styleUrls: ['./coverage-menu.component.scss']
})
export class CoverageMenuComponent implements OnInit {

   //Definition to Component Tree Angular Material
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<CoverageNode, CoverageNode>();

  private _transformer = (node: CoverageNode, level: number) => {
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

  treeFlattener = new MatTreeFlattener<CoverageNode, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource: MatTreeFlatDataSource<CoverageNode, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  //Finished to definition component tree angular material

  index: number = 0;

  @Input() edit: boolean = true;
  selectedCoverage: FormGroup = new FormGroup({})
  @Output() emitSelectedCoverage: EventEmitter<FormGroup> = new EventEmitter<FormGroup>()

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.selectedCoverage = this.coverageGroup;
    this.emitSelectedCoverage.emit(this.coverageGroup)
    this.updateTree();
  }

  get coverageGroup(): FormGroup {
    return this.productService.coverages?.controls[this.index] as FormGroup;
  }

  initializateColumn(){
    return([
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ]);
  }
  validateInitialParameter(){
    return(this.productService.initialParameters?.get('insuranceLine')?.value !== null
    ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
    : '0');
  }
  openToAdd(): void {

    const columns = this.initializateColumn();

    let parameter =this.validateInitialParameter();

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'coverageDataControls',
        columns:columns,
        list: this.productService.coverages?.value,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (this.productService.coverages.length == 0) {
        this.addCoverage(res);
        this.index = 0;
        this.selectedCoverage = this.coverageGroup;
        this.emitSelectedCoverage.emit(this.coverageGroup)
      } else {
        this.addCoverage(res);
      }
    });
  }

  addCoverage = (coverages: ElementTableSearch[]): void => {
    if (coverages) {
      for (let coverage of coverages) {
        this.productService.coverages.push(
          this.fb.group(this.addNewGroup(coverage))
        );
      }
      this.updateTree();
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Las coberturas fueron asociadas correctamente',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

  addNewGroup(coverage:any){
    let quantity={value:0, disabled: true}, period={value:'', disabled: true};
    return({
      id: this.fb.control(coverage.id, Validators.required),
      name: this.fb.control(coverage.name, Validators.required),
      description: this.fb.control(
        coverage.description,
        Validators.required
      ),
      waitingTime: this.fb.group({
        waitingTime: this.fb.control(false),
        quantity: this.fb.control(quantity,[Validators.required]),
        period: this.fb.control(period,[Validators.required])
      }),
      events: this.fb.group({
        events: this.fb.control(false),
        quantityEvents: this.fb.control(quantity,[Validators.required, Validators.min(1), Validators.max(999)]),
        periodEvents: this.fb.control(period,[Validators.required])
      }),
      clauses: this.fb.array([], Validators.required),
      businessRules: this.fb.group({
        selectionRule: this.fb.array([]),
        initializeRule: this.fb.array([]),
        validateRule: this.fb.array([]),
      }),
      complementaryData: this.fb.array([], Validators.required),
      deductibles: this.fb.array([], Validators.required),
      rates: this.fb.array([], Validators.required),
      payRollData: this.fb.array([], Validators.required),
      claimReservation: this.fb.array([]),
    })
  }
  removeCoverage = (node: ExampleFlatNode): void => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: `¿Está seguro de querer eliminar la cobertura ${
          this.flatNodeMap.get(node)?.name
        }?`,
        subMessage:
          'También se eliminaran la carencia, eventos, las clausulas, reglas, deducibles, datos complementarios, datos de nómina y tarifas.',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.findIndexCoverage(node);
        const id = this.productService.coverages.at(index).value.id;
        this.removeCoverageCascade(id);
        this.productService.coverages.removeAt(index);
        this.updateTree();
        if (id == this.selectedCoverage.value.id) {
          this.index = 0;
          this.selectedCoverage = this.coverageGroup;
        }
      }
    });
  };

  findIndexCoverage(node: ExampleFlatNode): any {
    return this.dataSource.data[0].children?.findIndex(
      (item) => item.id == this.flatNodeMap.get(node)?.id
    );
  }

  updateTree = (): void => {
    this.dataSource.data = [
      { name: 'Coberturas', children: this.productService.coverages?.value },
    ];
    for(let value of this.treeControl.dataNodes){
      this.treeControl.expand(value);
    }
  };

  viewCoverage = (node: ExampleFlatNode): void => {
    this.index = this.findIndexCoverage(node);
      this.selectedCoverage = this.coverageGroup;
    this.emitSelectedCoverage.emit(this.selectedCoverage)

  };

  classToCoverageSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedCoverage?.value.id;
  }

  removeCoverageCycle(idCoverage: number, formArrayRT: FormArray) {
    for (const commercialPlan of formArrayRT.controls) {
      const formArrayCoverages = <FormArray> commercialPlan.get('coverages');
      for (const coverage of formArrayCoverages.controls.filter(x => x.get('id')?.value === idCoverage)) {
        const index =  formArrayCoverages.value.indexOf(coverage.value);
        formArrayCoverages.removeAt(index);
      }
    }
  }

  removeCoverageCascade(id: number) {
    // Eliminación en planes comerciales
    for (const riskType of this.productService.riskTypesControls.controls) {
      const formArrayRT = (<FormArray> riskType.get('businessPlans'));
      this.removeCoverageCycle(id, formArrayRT);
    }

    let aux =  this.productService.accumulation.get('accumulationCoverages')?.value.filter((x: { id: number; }) => x.id === id);
    // Eliminación en cúmulos
    for (const coverage of aux) {
      const index =  this.productService.accumulation.get('accumulationCoverages')?.value.indexOf(coverage);
      (<FormArray> this.productService.accumulation.get('accumulationCoverages')).removeAt(index);
    }
  }

}
