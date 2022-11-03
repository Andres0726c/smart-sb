import { ModalAutomaticReservationComponent } from './modal-automatic-reservation/modal-automatic-reservation.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  STATES,
} from '../../shared/toast-message/toast-message.component';
import { InitialParametersService } from '../initial-parameters/services/initial-parameters.service';
import { ClaimReservationConceptService } from './services/claim-reservation-concept.service';
import { MultiSelectComponent } from '../../shared/multi-select/multi-select.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-claim-reservation-concept',
  templateUrl: './claim-reservation-concept.component.html',
  styleUrls: ['./claim-reservation-concept.component.scss'],
})
export class ClaimReservationConceptComponent implements OnInit {
  causes: { name: string; id: number }[] = [];
  causesAux: { name: string; id: number }[] = [];
  concept: { name: string; id: number }[] = [];
  id: any = 0;
  @ViewChild('claimTable') claimTable!: MatTable<ElementTableSearch>;
  @ViewChild(MultiSelectComponent) MultiSelectComponent!: MultiSelectComponent;
  concepto: any[] = [];



  selectedCoverage: any = new FormGroup({});
  index: number = 0;
  displayedColumns: string[] = ['select', 'causa', 'concepto'];
  dataSourcetable = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  @ViewChild('paginatorClaim') paginatorClaim!: MatPaginator;
  nameInuranceLine: any = [];


  filteredOptions: any = [];


  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    public fb: FormBuilder,
    public claimReservationConceptService: ClaimReservationConceptService,
    public initialParametersService: InitialParametersService
  ) {}
  ngOnInit(): void {
    this.selectedCoverage = this.coverageGroup;
    this.getRunLevel();

    if (this.selectedCoverage != null) {
      this.dataSourcetable = new MatTableDataSource<any>(
        (<FormArray>this.selectedCoverage.get('claimReservation')).controls
      );
      this.dataSourcetable.paginator = this.paginatorClaim;
    }
  }

  filterOptionsCause(event: any) {
    const filterValue = event.target.value;
    this.causesAux = this.causes.filter((cause) => {
      return cause.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  ngAfterViewInit() {
    if (this.selectedCoverage != null) {
      this.dataSourcetable = new MatTableDataSource<any>(
        (<FormArray>this.selectedCoverage.get('claimReservation')).controls
      );
      this.dataSourcetable.paginator = this.paginatorClaim;
    }
  }

  /**
   * Update the information according to the selected coverage
   * @param selectedCoverage coverage selected from the tree menu
   */
  changeCoverage(selectedCoverage: FormGroup) {
    this.selectedCoverage = selectedCoverage;
    this.dataSourcetable = new MatTableDataSource<any>(
      (<FormArray>this.selectedCoverage.get('claimReservation')).controls
    );
    this.dataSourcetable.paginator = this.paginatorClaim;
    this.ListCauses();
  }

  /**
   * Retorna la instancia de asociaci\u00f3n exitosa.
   * @returns instancia DataToast
   */
  getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    };
  };

  get coverageGroup(): FormGroup {
    return this.productService.coverages?.controls[this.index] as FormGroup;
  }

  /** Get data from the Execution Level microservice  */
  getRunLevel() {
    const insuranceLine =
      this.productService.initialParameters.get('insuranceLine')?.value;
    if (insuranceLine) {
      this.claimReservationConceptService
        .getExecutionLevel(insuranceLine, this.productService.companyId)
        .subscribe((res) => {
          this.causes = res.body?.map((item) => {
            return { id: item.id, name: item.name };
          });
          this.causesAux = [...this.causes];
          this.ListCauses();
        });
    }
  }

  displayFn(cause: { name: string; id: number }): string {
    return cause && cause.name ? cause.name : '';
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcetable.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllDisplayedSelected() ? this.deselectRows() : this.selectRows();
  }
  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;
    if (
      this.selection.selected.length === 0 ||
      this.dataSourcetable.filteredData.length === 0
    ) {
      return false;
    }
    for (let element of this.dataSourcetable.connect().value) {
      if (!this.selection.isSelected(element)) {
        isAllDisplayedSelected = false;
        return isAllDisplayedSelected;
      }
    }
    return isAllDisplayedSelected;
  }
  deselectRows() {
    const itemsToBeUnselected = this.dataSourcetable.connect().value;
    itemsToBeUnselected.forEach((element: ElementTableSearch) => {
      this.selection.deselect(element);
    });
  }
  selectRows() {
    const currentlyDisplayedRows = this.dataSourcetable.connect().value;
    currentlyDisplayedRows.forEach((element: ElementTableSearch) => {
      this.selection.select(element);
    });
  }
  isSomeDisplayedSelected(): boolean {
    let pageSize = this.dataSourcetable.connect().value.length;
    let countSelected = 0;
    //pageSize = pageSize <= 10 ? pageSize : 10;
    for (let element of this.dataSourcetable.connect().value) {
      if (this.selection.isSelected(element)) {
        countSelected++;
      }
    }
    return countSelected > 0 && countSelected < pageSize;
  }

  get claimReservations(): FormArray {
    return this.selectedCoverage?.get('claimReservation') as FormArray;
  }

  get conceptReservations(): FormArray {
    return this.productService.conceptReservation as FormArray;
  }

  addRelation() {
    let element: any;

    if (this.claimReservations.value.length === 0) {
      this.id = 1;
    } else {
      this.id = this.getMax(this.claimReservations.value, 'id') + 1;
    }

    let concept = this.concept[this.id];

    this.claimReservations.insert(
      0,
      this.fb.group({
        id: this.id,
        cause: this.fb.control({
          id: null,
          name: '',
        }),
        relCauseConcept: this.fb.array([]),
      })
    );
    this.updateTable();
  }

  updateTable() {
    this.dataSourcetable = new MatTableDataSource<any>(
      this.claimReservations.controls
    );
    this.dataSourcetable.paginator = this.paginatorClaim;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcetable.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data.value).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };

    if (filterValue.length >= 3) {
      this.dataSourcetable.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSourcetable.filter = '';
    }
  }

  DeleteRelation() {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:
          '¿Está seguro de querer desasociar los conceptos de reserva seleccionados?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.selection.selected.forEach((row) => {
          let element = this.claimReservations.value.find(
            (x: any) => x.id === row.value.id
          );
          let index = this.claimReservations.value.indexOf(element);
          this.claimReservations.removeAt(index);
        });
        this.selection.clear();
        this.updateTable();
        this.ListCauses();
      }
    });
  }

  /**
   * Update the list of values ​​of the causes so as not to repeat the values
   */
  ListCauses() {
    let obj: string[] = [];
    if (this.claimReservations) {
      for (let object of this.claimReservations.value) {
        obj.push(object.cause.id);
      }
    }

    this.causesAux = this.causes.filter((item: any) =>
      obj.every((element: any) => element != item.id)
    );
  }

  getMax(arr: any[], prop: string) {
    let max;
    for (let i = 0; i < arr.length; i++) {
      if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
        max = arr[i].id;
    }
    return Number(max);
  }

  openModalReservation(id: number) {
    let arrayConcept = new FormArray([]);
    let cause = '';
    this.claimReservations.value.forEach((element: any) => {
      if (element.id == id) {
        arrayConcept = element.relCauseConcept;
        cause = element.cause.name;
      }
    });
    const dialogRef = this.dialog.open(ModalAutomaticReservationComponent, {
      data: {
        title: 'Conceptos de reserva',
        subtitle: `Seleccione los conceptos de reserva para la causa ${cause} de la cobertura ${
          this.selectedCoverage.get('name')?.value
        }`, //Cambiar subtitulo,
        concept: arrayConcept,
      },
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addRelationConpet(id, result);
        this.updateConceptReservation(result);
      }
    });
  }

  addRelationConpet(id: number, result: []) {
    this.claimReservations.controls.forEach((element) => {
      if (element.value.id == id) {
        (<FormArray>element.get('relCauseConcept')).clear();
        result.forEach((elementResult: any) => {
          let obj = {
            concept: {
              id: elementResult.id,
            },
            isAutomaticReservation: elementResult.automatic,
            calculationRule: elementResult.calcRule,
          };
          (<FormArray>element.get('relCauseConcept')).push(this.fb.group(obj));
        });
      }
    });
  }

  /**
   * Add the new reservation concepts to the conceptReservation variable of the productservice
   * @param result the reserve concepts associated with the cause
   */
  updateConceptReservation(result: []) {
    result.forEach((item: any) => {
      let index = this.conceptReservations.value.find(
        (concept: any) => concept.id == item.id
      );

      if (!index) {
        let element = this.fb.group({
          id: item.id,
          name: item.name,
          description: item.description,
          claimLiquidation: this.fb.array([]),
        });
        this.conceptReservations.push(element);
      }
    });
  }
}
