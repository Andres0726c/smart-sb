import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalSearchComponent } from '../modal-search/modal-search.component';
import { ProductService } from '../../services/product.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coverage } from './coverage.model';
import {
  ModalConfirmDeleteComponent,
  ConfirmationDialogData,
} from 'commons-lib';
import { ModalDeleteComponent } from 'libs/commons-lib/src/lib/components/modal-delete/modal-delete.component';

@Component({
  selector: 'refactoring-smartcore-mf-coverage-tree',
  templateUrl: './coverage-tree.component.html',
  styleUrls: ['./coverage-tree.component.scss'],
  providers: [ConfirmationService, DialogService],
})
/**
 * transverse component to handles the tree
 */
export class CoverageTreeComponent implements OnInit {
  index: number = 0;
  coverageTree: TreeNode<Coverage>[];
  @Input() edit: Boolean = true;
  selectedCoverage: FormGroup = new FormGroup({});
  @Output() emitSelectedCoverage: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();
  @ViewChild('confirmDelete') confirmDelete!: ModalConfirmDeleteComponent;

  selectedFile!: TreeNode;

  /**
   * initialize the tree structure
   * @param dialogService
   * @param dialog
   * @param toastMessage
   * @param productService
   * @param fb
   */
  constructor(
    public dialogService: DialogService,
    public dialog: MatDialog,
    private toastMessage: MatSnackBar,
    public productService: ProductService,
    public fb: FormBuilder
  ) {
    this.coverageTree = [
      {
        label: 'Coberturas',
        children: [],
      },
    ];
  }

  /**
   * initialize the data for tree
   */
  ngOnInit() {
    this.selectedCoverage = this.coverageGroup;
    this.emitSelectedCoverage.emit(this.coverageGroup);
    this.updateTree();
  }

  /**
   * gets the product coverages
   */
  get coverageGroup(): FormGroup {
    return this.productService.coverages?.controls[this.index] as FormGroup;
  }

  /**
   * method that opens the coverages modal
   */
  openToAdd(): void {
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
    ];

    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';
    const dialogRef = this.dialogService.open(ModalSearchComponent, {
      data: {
        code: 'coverageDataControls',
        list: this.productService.coverages?.value,
        columns: columns,
        parameter,
      },
      showHeader: false,
      width: '550px',
    });
    dialogRef.onClose.subscribe((res) => {
      if (this.productService.coverages.length == 0) {
        this.addCoverage(res);
        this.index = 0;
        this.selectedCoverage = this.coverageGroup;
        this.emitSelectedCoverage.emit(this.coverageGroup);
      } else {
        this.addCoverage(res);
      }
    });
  }

  /**
   * method that according to the response of the modal adds elements to tree
   * @param coverages 
   */
  addCoverage = (coverages: ElementTableSearch[]): void => {
    if (coverages) {
      for (let coverage of coverages) {
        this.productService.coverages.push(
          this.fb.group({
            id: this.fb.control(coverage.id, Validators.required),
            name: this.fb.control(coverage.name, Validators.required),
            description: this.fb.control(
              coverage.description,
              Validators.required
            ),
            waitingTime: this.fb.group({
              waitingTime: this.fb.control(false),
              quantity: this.fb.control({ value: 0, disabled: true }, [
                Validators.required,
              ]),
              period: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
              ]),
            }),
            events: this.fb.group({
              events: this.fb.control(false),
              quantityEvents: this.fb.control({ value: 0, disabled: true }, [
                Validators.required,
                Validators.min(1),
                Validators.max(999),
              ]),
              periodEvents: this.fb.control({ value: '', disabled: true }, [
                Validators.required,
              ]),
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

  /**
   * update tree with the coverages data
   */
  updateTree = (): void => {
    const coverages = this.productService.coverages?.value as Coverage[];
    console.log('coberturas', this.productService.coverages?.value);
    let coveragesMap = coverages.map((coverage): TreeNode<Coverage> => {
      return {
        data: coverage,
        label: coverage.name,
        styleClass: 'ml-2 border-l-2',
        type: 'children',
      };
    });
    this.coverageTree[0].children = coveragesMap;
    this.coverageTree[0].expanded = true;
  };

  /**
   * allows view the data of coverage selected
   * @param node 
   */
  viewCoverage = (node: TreeNode<Coverage>): void => {
    console.log('node', node);

    this.index = this.findIndexCoverage(node);
    this.selectedCoverage = this.coverageGroup;
    this.emitSelectedCoverage.emit(this.selectedCoverage);
  };

  /**
   * method that removes coverage selected
   * @param node 
   */
  removeCoverage = (node: TreeNode<Coverage>): void => {
    let dialogRef = this.dialogService.open(ModalDeleteComponent, {
      data: {
        message: `¿Está seguro de querer eliminar la cobertura ${node.data?.name}?`,
        subMessage:
          'También se eliminaran la carencia, eventos, las clausulas, reglas, deducibles, datos complementarios, datos de nómina y tarifas.',
      },
      showHeader: false,
      width: '400px',
    });

    dialogRef.onClose.subscribe((res) => {
      this.removeConfirmation(res, node);
    });
  };

  /**
   * Remove when res is true
   */
  removeConfirmation(res: any, node: TreeNode<Coverage>) {
    if (res) {
      const index = this.findIndexCoverage(node);
      const id = this.productService.coverages.at(index)!.value.id;
      this.productService.coverages?.removeAt(index);
      this.updateTree();
      if (id == this.selectedCoverage.value.id) {
        this.index = 0;
        this.selectedCoverage = this.coverageGroup;
      }
    }
  }

  /**
   * returns the coverage in the product according the id
   * @param node 
   * @returns 
   */
  findIndexCoverage(node: TreeNode): number {
    return (
      this.coverageTree[0].children?.findIndex(
        (coverage) => coverage.data?.id == node.data.id
      ) || 0
    );
  }
}
