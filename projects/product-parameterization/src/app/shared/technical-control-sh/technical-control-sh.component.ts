import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from '../toast-message/toast-message.component';
import { TechnicalControlService } from '../../containers/technical-control/services/technical-control.service';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-technical-control-sh',
  templateUrl: './technical-control-sh.component.html',
  styleUrls: ['./technical-control-sh.component.scss'],
})
export class TechnicalControlShComponent implements OnInit {
  @Input() applicationLevel: string = '';
  @Input() arrayTechnicalControls: any = new FormArray([]);
  @Input() layoutType: string = 'child';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() emptyText: string = '';
  @Input() emptySubText: string = '';

  process: string[] = [];
  executionLevels: string[] = [];
  @ViewChild('controlTecnicoTable')
  controlTecnicoTable!: MatTable<ElementTableSearch>;

  displayedColumns: string[] = ['name', 'description', 'level', 'actions'];
  dataSource = new MatTableDataSource<any>(this.TechnicalControls.controls);
  @ViewChild('paginatorTechnical') paginatorTechnical!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    private toastMessage: MatSnackBar,
    public technicalControlServices: TechnicalControlService,
    public fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    this.updateTable();
  }

  ngOnInit(): void {
    this.getProcess();
    this.getRunLevel();
  }

  get TechnicalControls(): FormArray {
    return this.arrayTechnicalControls;
  }

  /** Get data from the process microservice  */
  getProcess() {
    this.technicalControlServices.getProcess().subscribe((res) => {
      this.process = res.body.map((item) => item.name);
    });
  }

  /** Get data from the Execution Level microservice  */
  getRunLevel() {
    this.technicalControlServices.getExecutionLevel().subscribe((res) => {
      this.executionLevels = res.body.map((item) => item.name);
    });
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

  openToAdd(): void {
    const columns = [
      {
        name: 'name',
        header: 'Nombre',
        displayValue: ['name'],
        dbColumnName: ['nmname'],
      },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
        dbColumnName: ['dsdescription'],
      },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'controlTechnicalControls',
        columns: columns,
        list: this.TechnicalControls.value,
        parameter: this.applicationLevel,
      },
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.addItem(res);
    });
  }

  addItem(result: any) {
    if (result) {
      for (let object of result) {
        this.TechnicalControls.push(
          this.fb.group({
            id: this.fb.control(object.id),
            name: this.fb.control(object.name),
            description: this.fb.control(object.description),
            executionLevel: this.fb.control('', [Validators.required]),
            selectedProcess: this.fb.control(
              [this.applicationLevel],
              [Validators.required]
            ),
          })
        );
        this.updateTable();
      }
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          'Los controles técnicos fueron asociados correctamente.'
        ),
      });
    }
  }

  /** @returns data to inject in multi-select */
  selectedOptions(i: number) {
    return this.TechnicalControls.get(i.toString())?.get('selectedProcess');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data.value).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };

    if (filterValue.length >= 3) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  deleteTechnical(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar el control técnico?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.TechnicalControls.controls.indexOf(row);
        this.TechnicalControls.removeAt(index);
        this.updateTable();
      }
    });
  }

  updateTable() {
    this.dataSource = new MatTableDataSource<any>(
      this.TechnicalControls.controls
    );
    this.dataSource.paginator = this.paginatorTechnical;
  }
}
