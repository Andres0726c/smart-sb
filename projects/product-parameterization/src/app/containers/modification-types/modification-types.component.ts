import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { DataToast, STATES, ToastMessageComponent } from '../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface ModificationTypeNode {
  name: string;
  id?: number;
  children?: ModificationTypeNode[];
}

interface SubItemsModificationType {
  name: string,
  formArray: string,
  distance: number,
}

@Component({
  selector: 'app-modification-types',
  templateUrl: './modification-types.component.html',
  styleUrls: ['./modification-types.component.scss']
})
export class ModificationTypesComponent implements OnInit {

  //Definition to Component Tree Angular Material
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ModificationTypeNode, ModificationTypeNode>();

  private _transformer = (node: ModificationTypeNode, level: number) => {
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

  treeFlattener = new MatTreeFlattener<ModificationTypeNode, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource: MatTreeFlatDataSource<ModificationTypeNode, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  //Finished to definition component tree angular material

  subItemsModificationTypes: SubItemsModificationType[] = [
    { name: 'Datos a previsualizar', formArray: 'visibleNonModificableData', distance: 1 }
  ];

  selectedModificationType: any = new FormGroup({});
  index: number = 0;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public fb: FormBuilder
  ) {
    this.productService.modificationTypes.controls.forEach((modificationType: any) => {

      this.dataSource.data.push({
        name: modificationType.value.name,
        id: modificationType.value.id,
        children: [
          { name: 'Datos a previsualizar' }
        ],
      });

    });
    this.updateTree()
  }

  ngOnInit(): void {
    this.selectedModificationType = this.modificationTypeGroup;
  }

  get modificationTypeGroup(): FormGroup {
    return this.productService.modificationTypes.controls[this.index] as FormGroup;
  }

  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'],dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'modificationTypeDataControls',
        parameter: 'Modificacion',
        columns: columns,
        list: this.productService.modificationTypes.value,
      },

      panelClass: 'custom-dialog-container',
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((res) => {
      if (this.productService.modificationTypes.length == 0) {
        this.addModificationType(res);
        this.index = 0;
        this.selectedModificationType = this.modificationTypeGroup;
      } else {
        this.addModificationType(res);
      }
    });
  }

  addModificationType = (modificationTypes: ElementTableSearch[]): void => {
    if (modificationTypes) {
      for (let modificationType of modificationTypes) {
        this.productService.modificationTypes.push(
          this.fb.group({
            id: this.fb.control(modificationType.id, Validators.required),
            name: this.fb.control(modificationType.name, Validators.required),
            description: this.fb.control(
              modificationType.description,
              Validators.required
            ),
            visibleNonModificableData: this.fb.array([], Validators.required)
          })
        );
        this.dataSource.data.push({
          name: modificationType.name,
          id: modificationType.id,
          children: [
            { name: 'Datos a previsualizar' }
          ],
        });
      }
      this.updateTree();
      let dataToast: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: 'Los tipos de modificación fueron asociados correctamente',
      };
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: dataToast,
      });
    }
  };

  removeModificationType = (node: ExampleFlatNode): void => {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar el tipo de modificación seleccionado?',
        subMessage: 'También se eliminarán los datos a previsualizar asociados.'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.findIndexModificationType(node);
        const id = this.productService.modificationTypes.at(index).value.id;
        this.productService.modificationTypes.removeAt(index);
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id != id
        );
        if (id == this.selectedModificationType.value.id || index == 0) {
          this.index = 0;
        }
        this.selectedModificationType = this.modificationTypeGroup;
        this.updateTree();
      }
    });
  };

  findIndexModificationType(node: ExampleFlatNode): number {
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

  viewModificationType = (node: ExampleFlatNode): void => {
    this.index = this.findIndexModificationType(node);
    if(node.name !== this.selectedModificationType.get('name')?.value){
      this.selectedModificationType = this.modificationTypeGroup;
    }
  };

  quantityItems = (node: ExampleFlatNode): number => {
    const startIndex = this.treeControl.dataNodes.indexOf(node);
    const subItemsModificationType: SubItemsModificationType = this.subItemsModificationTypes.filter(item => item.name == this.flatNodeMap.get(node)?.name)[0]
    const currentNode = this.treeControl.dataNodes[startIndex-subItemsModificationType.distance];
    const index = this.findIndexModificationType(currentNode);
    if(node.name==="Datos a previsualizar" && this.productService.modificationTypes.controls[index].get(subItemsModificationType.formArray)?.value[0]){
      return this.productService.modificationTypes.controls[index].get(subItemsModificationType.formArray)?.value[0].fields.length;
    } else{
      return 0;
    }
  };

  classToModificationTypeSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedModificationType?.value.id;
  }

}
