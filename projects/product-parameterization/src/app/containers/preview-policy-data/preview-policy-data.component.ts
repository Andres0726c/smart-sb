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

interface ModificationTypeNode {
  name: string;
  id?: number;
  children?: ModificationTypeNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-preview-policy-data',
  templateUrl: './preview-policy-data.component.html',
  styleUrls: ['./preview-policy-data.component.scss']
})
export class PreviewPolicyDataComponent implements OnInit {

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

  previewPolicyData: any = new FormArray<any>([]);

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

  selectedModificationType: any = new FormGroup({});

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

  get modificationTypeGroup(): FormGroup {
    return this.productService.modificationTypes.controls[this.index] as FormGroup;
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
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      
      if (this.previewPolicyData == 0) {
        this.addPreview(res);
        this.index = 0;
        this.selectedModificationType = this.modificationTypeGroup;
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

      console.log(this.previewPolicyData);
      
    }
  };

  updateTree = (): void => {
    this.dataSource.data = this.dataSource.data;
    for (let value of this.treeControl.dataNodes) {
      this.treeControl.expand(value);
    }
  };

}
