import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DataToast, STATES, ToastMessageComponent } from '../../shared/toast-message/toast-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';

interface PreviewPolicyTypeNode {
  name: string;
  id?: number;
  children?: PreviewPolicyTypeNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface SubItemsPreviewType {
  name: string,
  formArray: string,
  distance: number,
}

@Component({
  selector: 'app-preview-policy-data',
  templateUrl: './preview-policy-data.component.html',
  styleUrls: ['./preview-policy-data.component.scss']
})
export class PreviewPolicyDataComponent implements OnInit {

  flatNodeMap = new Map<PreviewPolicyTypeNode, PreviewPolicyTypeNode>();

  private _transformer = (node: PreviewPolicyTypeNode, level: number) => {
    const flatNode = {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
    this.flatNodeMap.set(flatNode, node);
    return flatNode;
  };

  previewPolicyData: any = new FormArray<any>([]);

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<PreviewPolicyTypeNode, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource: MatTreeFlatDataSource<PreviewPolicyTypeNode, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  subItemsPreviewTypes: SubItemsPreviewType[] = [
    { name: 'Datos a previsualizar', formArray: 'visibleNonModificableData', distance: 1 }
  ];

  selectedPreviewData: any = new FormGroup({});
  index: number = 0;
  
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    private toastMessage: MatSnackBar,
    public productService: ProductService,
  ) { 

  }

  ngOnInit(): void {
    //
  }

  /* get previewPolicyGroup(): FormGroup {
    return this.previewPolicyData.controls[this.index] as FormGroup;
  }

  openToAdd() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['dsDescription'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'],dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'complementaryDataControls',
        parameter: '22',
        columns: columns,
        list: this.productService.policyData.value,
      },

      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (this.previewPolicyData.length == 0) {
        this.addPreview(res);
        this.index = 0;
        this.selectedPreviewData = this.previewPolicyGroup;
      } else {
        this.addPreview(res);
      }
    });
  }

  addPreview = (data: ElementTableSearch[]): void => {
    if (data) {
      for (let element of data) {
        this.previewPolicyData.push(
          this.fb.group({
            id: this.fb.control(element.id, Validators.required),
            name: this.fb.control(element.name, Validators.required),
            description: this.fb.control(
              element.description,
              Validators.required
            ),
            visibleNonModificableData: this.fb.array([], Validators.required)
          })
        );
        this.dataSource.data.push({
          name: element.name,
          id: element.id,
          children: [
            { name: 'Datos a previsualizar' }
          ],
        });
      }
      this.updateTree();
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Los datos fueron asociados correctamente',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

  updateTree = (): void => {
    for (let value of this.treeControl.dataNodes) {
      this.treeControl.expand(value);
    }
  };

  quantityItems = (node: ExampleFlatNode): number => {
    const startIndex = this.treeControl.dataNodes.indexOf(node);
    const subItemsPreviewType: SubItemsPreviewType = this.subItemsPreviewTypes.filter(item => item.name == this.flatNodeMap.get(node)?.name)[0]
    const currentNode = this.treeControl.dataNodes[startIndex-subItemsPreviewType.distance];
    const index = this.findIndexPolicyData(currentNode);
    if(node.name==="Datos a previsualizar" && this.previewPolicyData.controls[index].get(subItemsPreviewType.formArray)?.value[0]){
      return this.previewPolicyData.controls[index].get(subItemsPreviewType.formArray)?.value[0].fields.length;
    } else{
      return 0;
    }
  };

  classToModificationTypeSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedPreviewData?.value.id;
  }

  viewPolicyData = (node: ExampleFlatNode): void => {
    this.index = this.findIndexPolicyData(node);
    if(node.name !== this.selectedPreviewData.get('name')?.value){
      this.selectedPreviewData = this.previewPolicyGroup;
    }
  };

  removePolicyData = (node: ExampleFlatNode): void => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar el dato seleccionado?',
        subMessage: 'También se eliminarán los datos a previsualizar asociados.'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.findIndexPolicyData(node);
        const id = this.previewPolicyData.at(index).value.id;
        this.previewPolicyData.removeAt(index);
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id != id
        );
        if (id == this.selectedPreviewData.value.id || index == 0) {
          this.index = 0;
        }
        this.selectedPreviewData = this.previewPolicyGroup;
        this.updateTree();
      }
    });
  };

  findIndexPolicyData(node: ExampleFlatNode): number {
    return (
      this.dataSource.data.findIndex(
        (item) => item.id == this.flatNodeMap.get(node)?.id
      ) || 0
    );
  } */
}
