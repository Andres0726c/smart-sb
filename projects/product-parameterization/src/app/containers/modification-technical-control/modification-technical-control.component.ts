import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { DataToast, STATES, ToastMessageComponent } from '../../shared/toast-message/toast-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { TechnicalControlService } from '../technical-control/services/technical-control.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-modification-technical-control',
  templateUrl: './modification-technical-control.component.html',
  styleUrls: ['./modification-technical-control.component.scss']
})
export class ModificationTechnicalControlComponent {

  process: string[] = []
  executionLevels: string[] = []
  applicationLevel: string = 'Póliza';
  @ViewChild('controlTecnicoTable') controlTecnicoTable!: MatTable<ElementTableSearch>;

  arrayTechnicalControls: any = new FormArray([]);
  displayedColumns: string[] = ['select', 'name', 'description', 'level'];
  dataSource = new MatTableDataSource<any>(this.arrayTechnicalControls);
  @ViewChild('paginatorTechnical') paginatorTechnical!: MatPaginator;

  selection = new SelectionModel<any>(true, []);
  

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public technicalControlServices: TechnicalControlService,
    public fb: FormBuilder
  ) {
  }


  /*ngAfterViewInit() {

    this.updateTable()
  }


  ngOnInit(): void {
    this.getProcess();
    this.getRunLevel();

  }

  get TechnicalControls(): FormArray {
    return this.arrayTechnicalControls;
  }*/

  /** Get data from the process microservice  */
  /*getProcess() {
    this.technicalControlServices.getProcess().subscribe(res => {
      this.process = res.body.map(item => item.name)
    })
  }*/

  /** Get data from the Execution Level microservice  */
  /*getRunLevel() {
    this.technicalControlServices.getExecutionLevel().subscribe(res => {
      this.executionLevels = res.body.map(item => item.name)
    })
  }*/

  /**
  * Retorna la instancia de asociaci\u00f3n exitosa.
  * @returns instancia DataToast
  */
  /*getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    }
  }

  openToAdd(): void {

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'],dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'],dbColumnName:['dsdescription'] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'controlTechnicalControls',
        columns: columns,
        list: this.TechnicalControls.value,
        parameter: this.applicationLevel
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.addItem(res);
    });
  }

  addItem(result: any) {

    let element: any;

    if (result) {
      for (let object of result) {

        this.TechnicalControls.push(this.fb.group({
          id: this.fb.control(object.id),
          name: this.fb.control(object.name),
          description: this.fb.control(object.description),
          executionLevel: this.fb.control('', [Validators.required]),
          selectedProcess: this.fb.control([], [Validators.required]),
        }))
        this.updateTable()
      }
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          'Los controles técnicos fueron asociados correctamente.'
        ),
      });
    }
  }*/

  /** @returns data to inject in multi-select */
  /*selectedOptions(i: number) {
    return this.TechnicalControls.get(i.toString())?.get('selectedProcess');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data.value).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }

    if (filterValue.length() >= 3) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = "";
    }
  }

  deleteTechnical() {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: { 
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar los controles técnicos seleccionados?' 
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        for(let row of this.selection.selected) {
          const index = this.TechnicalControls.controls.indexOf(row);
          this.TechnicalControls.removeAt(index);
        }
        this.selection.clear();
        this.updateTable();
      }
    });
  }

  updateTable(){
    this.dataSource = new MatTableDataSource<any>(this.TechnicalControls.controls);
    this.dataSource.paginator = this.paginatorTechnical;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllDisplayedSelected() ?
      this.deselectRows() :
      this.selectRows();
  }
  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;
    if (this.selection.selected.length === 0 || this.dataSource.filteredData.length === 0) {
      return false;
    }
    for (let element of this.dataSource.connect().value) {
      if (!this.selection.isSelected(element)) {
        isAllDisplayedSelected = false;
        return isAllDisplayedSelected;
      }
    }
    return isAllDisplayedSelected;
  }
  deselectRows() {
    const itemsToBeUnselected = this.dataSource.connect().value;
    itemsToBeUnselected.forEach((element: ElementTableSearch) => {
      this.selection.deselect(element);
    });
  }
  selectRows() {
    const currentlyDisplayedRows = this.dataSource.connect().value;
    currentlyDisplayedRows.forEach((element: ElementTableSearch) => {
      this.selection.select(element);
    });
  }
  isSomeDisplayedSelected(): boolean {
    let pageSize = this.dataSource.connect().value.length;
    let countSelected = 0;
    //pageSize = pageSize <= 10 ? pageSize : 10;
    for (let element of this.dataSource.connect().value) {
      if (this.selection.isSelected(element)) {
        countSelected++;
      }
    }
    return countSelected > 0 && countSelected < pageSize;
  }*/
}
