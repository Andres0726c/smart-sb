import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalSearchComponent } from '../modal-search/modal-search.component';
import { ProductService } from '../../services/product.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coverage } from './coverage.model';
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

  selectedFile!: TreeNode;

  @Input() coverages: any = new FormGroup({});
  @Output() eventCoverages: EventEmitter<any> = new EventEmitter<any>();
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
    
    this.eventCoverages.emit(true);
    
  }

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
      if (id == this.selectedCoverage?.value.id) {
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
