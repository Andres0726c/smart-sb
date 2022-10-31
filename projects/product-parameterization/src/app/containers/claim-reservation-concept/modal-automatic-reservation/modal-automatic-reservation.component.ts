import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormArray, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../services/product.service';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';

@Component({
  selector: 'app-modal-automatic-reservation',
  templateUrl: './modal-automatic-reservation.component.html',
  styleUrls: ['./modal-automatic-reservation.component.scss'],
})
export class ModalAutomaticReservationComponent implements OnInit {
  recallFilter = true;
  displayedColumns: string[] = [
    'select',
    'reservation-concept',
    'automatic',
    'rule',
  ];

  elementTableDataSource: any = new FormArray([]);
  dataSource = new MatTableDataSource<any>(this.elementTableDataSource.value);

  selection = new SelectionModel<any>(true, []);

  @ViewChild('paginatorConcept') paginatorConcept!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getConcept();
    this.updateTable();
  }

  ngAfterViewInit() {
    this.updateTable();
  }

  getConcept() {
    if (this.data.concept.length > 0) {
      let item: any;
      this.data.concept.forEach((element: any) => {
        let data = this.productService.getConceptReservationById(
          element.concept.id
        );
        item = {
          id: data.id,
          name: data.name,
          description: data.description,
          automatic: element.isAutomaticReservation,
          calcRule: element.calculationRule,
        };
        this.elementTableDataSource.push(this.fb.control(item));
      });
      this.dataSource = new MatTableDataSource<any>(
        this.elementTableDataSource.value
      );
    }
  }

  addConcept() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription']
        , dbColumnName:['dsdescription']
      },
      { name: 'element', displayValue: ['element'] },
    ];

    let company = this.productService.companyId;
    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? `${company}/` +
          this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'reserveConcept',
        columns: columns,
        list: this.elementTableDataSource.value,
        parameter,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.addItems(res);
      }
    });
  }

  addItems(elements: ElementTableSearch[]) {
    let element: any;
    for (let object of elements) {
      element = {
        id: object.id,
        name: object.name,
        description: object.description,
        automatic: false,
        calcRule: {},
      };
      this.elementTableDataSource.push(this.fb.control(element));
    }
    this.dataSource = new MatTableDataSource<any>(
      this.elementTableDataSource.value
    );

    this.updateTable();
  }

  masterToggle() {
    this.isAllDisplayedSelected() ? this.deselectRows() : this.selectRows();
  }
  isAllDisplayedSelected(): boolean {
    let isAllDisplayedSelected = true;
    if (
      this.selection.selected.length === 0 ||
      this.dataSource.filteredData.length === 0
    ) {
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
  }

  /**
   * The checkbox status is saved in the tables
   * @param element
   * @param required
   */
  requeridForm(element: any, automatic: boolean) {
    element.automatic = automatic;
  }
/**
 *  validate if there is a slide rule
 * @returns disabled (button "Aceptar")
 */
  checkElements() {
    let disabled = false;
    this.dataSource.data.forEach(data => {
      if(data.automatic && !data.calcRule?.id) {
        disabled = true;
        return;
      }
    })
    return disabled;
  }

  addElements() {
    return this.dataSource.data;
  }

  openModalRule(id: number, automatic: boolean) {
    if (automatic) {
      const columns = [
        { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']},
        {
          name: 'description',
          header: 'Descripción',
          displayValue: ['dsDescription'], dbColumnName:['dsdescription']
        }


      ];
      let rule = this.elementTableDataSource.value.find((element:any) => element?.id == id)?.calcRule
      const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
        data: {
          code: 'ruleCalculationControls',
          columns: columns,
          list: rule?.id ? [rule] : [],
          multiSelect: false,
        },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
          this.addChip(res, id);
        }
      });
    }
  }

  addChip(obj: ElementTableSearch[], id: number) {
    if (obj) {
      for (let object of obj) {
        this.dataSource.data.forEach((element) => {
          if (element.id == id) {
            element.calcRule = object;
          }
        });
      }
    }
  }

  deleteConcept() {
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
          let element = this.elementTableDataSource.value.find(
            (x: any) => x.id === row.id
          );
          let index = this.elementTableDataSource.value.indexOf(element);
          this.elementTableDataSource.removeAt(index);
        });
        this.selection.clear();
        this.updateTable();
      }
    });
  }

  updateTable() {
    this.dataSource = new MatTableDataSource<any>(
      this.elementTableDataSource.value
    );
    this.dataSource.paginator = this.paginatorConcept;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.name.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };

    if (filterValue.trim().toLowerCase().length >= 3) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  /*
  Method to close the dialog
  */
  closeModal(): void {
    this.dialog.closeAll();
  }

  removeRule(element:any){
    element.calcRule = {}
  }

}
