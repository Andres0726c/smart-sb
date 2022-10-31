import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface Node {
  name: string;
  id?: number;
  children?: ElementTableSearch[];
}


@Component({
  selector: 'app-claim-liquidation-concept',
  templateUrl: './claim-liquidation-concept.component.html',
  styleUrls: ['./claim-liquidation-concept.component.scss']
})
export class ClaimLiquidationConceptComponent implements OnInit {

  constructor(    
    public dialog: MatDialog,
    public productService: ProductService,
    private fb: FormBuilder
    ) { }

  //Definition to Component Tree Angular Material
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<Node, Node>();

  private _transformer = (node: Node, level: number) => {
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

  treeFlattener = new MatTreeFlattener<Node, ExampleFlatNode>(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );
  index: number = 0;
  dataSource: MatTreeFlatDataSource<Node, ExampleFlatNode> =
    new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  
  classToLiquidationConceptSelected(node: ExampleFlatNode): boolean {
    return this.flatNodeMap.get(node)?.id == this.selectedLiquidationConcept?.value.id;
   }
  
  //Finished to definition component tree angular material

  selectedLiquidationConcept: any = new FormGroup({});

  displayedColumns: string[] = ['select','name', 'description'];
  dataSourceTable= new MatTableDataSource<any>();
  @ViewChild('paginator') paginator!: MatPaginator;

  get liquidationConceptGroup(): FormGroup {
    if(this.productService.conceptReservation){
      return this.productService.conceptReservation?.controls[this.index] as FormGroup;
    }
    return new FormGroup({});
  }

  ngOnInit(): void {
    this.updateConceptReservations();
    this.selectedLiquidationConcept = this.liquidationConceptGroup;
    this.updateTree();
    if(this.selectedLiquidationConcept != null){
      this.dataSourceTable = new MatTableDataSource<any>(this.selectedLiquidationConcept.get('claimLiquidation')?.value);
      this.dataSourceTable.paginator = this.paginator;
    }
  }

  ngAfterViewInit() {
    if(this.selectedLiquidationConcept != null){
      this.dataSourceTable = new MatTableDataSource<any>(this.selectedLiquidationConcept.get('claimLiquidation')?.value);
      this.dataSourceTable.paginator = this.paginator;
    }
  }

  viewLiquidationConcept = (node: ExampleFlatNode): void => {
    this.index = this.findIndexNode(node);
     if(node.name !== this.selectedLiquidationConcept.get('name')?.value){
       this.selectedLiquidationConcept = this.liquidationConceptGroup;
       this.dataSourceTable = new MatTableDataSource<any>(this.selectedLiquidationConcept.get('claimLiquidation')?.value);
       this.dataSourceTable.paginator = this.paginator;
       this.selection.clear();
     }
  };

  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    let list = this.selectedLiquidationConcept.get('claimLiquidation')?.value !==null? this.selectedLiquidationConcept.get('claimLiquidation')?.value : [];

    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
        ?  this.productService.initialParameters?.get('insuranceLine')?.value + ''
        : '0';
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'liquidationConcept',
        columns:columns,
        list: list,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
         this.addItemLiquidationConcept(res);
    });
  }

  addItemLiquidationConcept(selected: ElementTableSearch[]) {
    if (selected) {
      let element: any;
      for (let object of selected) {
        element = this.fb.group( {
          id: object.id,
          name: object.name,
          description: object.description
          });
        (<FormArray> this.selectedLiquidationConcept.get('claimLiquidation')).push(element);
      }
      this.dataSourceTable = new MatTableDataSource<any>(this.selectedLiquidationConcept.get('claimLiquidation')?.value);
      this.dataSourceTable.paginator = this.paginator;
    }
  }
  
  removeItems(){
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar los conceptos de liquidación seleccionados?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.selection.selected.forEach(row =>{
          let index = this.selectedLiquidationConcept.get('claimLiquidation')?.value.indexOf(row);
          (<FormArray> this.selectedLiquidationConcept.get('claimLiquidation')).removeAt(index);
        });
    
        this.selection.clear();
      
        this.dataSourceTable = new MatTableDataSource<any>(this.selectedLiquidationConcept.get('claimLiquidation')?.value);
        this.dataSourceTable.paginator = this.paginator;
      }
     
    });
   
  }

  findIndexNode(node: ExampleFlatNode): any {
    return this.dataSource.data[0].children?.findIndex(
      (item) => item.id == this.flatNodeMap.get(node)?.id
    );
  }

  updateTree = (): void => {
    if(this.productService.conceptReservation?.value.length>0){
      this.dataSource.data = [
        { name: 'Concepto de reserva', children: this.productService.conceptReservation?.value },
     ];
    }else{
      this.dataSource.data = [
        { name: 'Concepto de reserva', children: [ { id:0, name:""  }] },
     ];
    }
 
    for(let value of this.treeControl.dataNodes){
      this.treeControl.expand(value);
    }
  };

  get conceptReservations():FormArray{
    return this.productService.conceptReservation as FormArray;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();
  }

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceTable.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllDisplayedSelected() ?
      this.deselectRows() :
      this.selectRows();
  }

  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;

    if (this.selection.selected.length === 0 || this.dataSourceTable.filteredData.length === 0) {
      return false;
    }

    for(let element of this.dataSourceTable.connect().value) {
      if (!this.selection.isSelected(element)) {
        isAllDisplayedSelected = false;
        return isAllDisplayedSelected;
      }
    }
    return isAllDisplayedSelected;
  }
  deselectRows() {
    const itemsToBeUnselected = this.dataSourceTable.connect().value;
    itemsToBeUnselected.forEach((element: ElementTableSearch) => {
      this.selection.deselect(element);
    });
  }

  selectRows() {
    const currentlyDisplayedRows = this.dataSourceTable.connect().value;

    currentlyDisplayedRows.forEach((element: ElementTableSearch) => {
      this.selection.select(element);
    });
  }

  isSomeDisplayedSelected(): boolean {
    let pageSize = this.dataSourceTable.connect().value.length;
    let countSelected = 0;

    //pageSize = pageSize <= 10 ? pageSize : 10;

    for(let element of this.dataSourceTable.connect().value) {
      if (this.selection.isSelected(element)) {
        countSelected++;
      }
    }

    return countSelected > 0 && countSelected < pageSize;
  }

  updateConceptReservations(){
    let conceptReservations: any = new FormArray([])
    this.conceptReservations.controls.forEach(element => {
      conceptReservations.push(element)
    });
    this.conceptReservations.clear();
    for(const coverage of this.productService.coverages.value){
      for(const claimReservation of coverage.claimReservation){      
        for(const rel of claimReservation.relCauseConcept){
          let elementExists = this.conceptReservations.value.find((concept:any) => concept.id == rel.concept.id)
          if(!elementExists)
          {
            let obj = conceptReservations.controls.find((item: any) => item.value.id == rel.concept.id)
            if(obj){         
              this.conceptReservations.push(obj)
            }
          }
        }
      }
    }
  }

}
