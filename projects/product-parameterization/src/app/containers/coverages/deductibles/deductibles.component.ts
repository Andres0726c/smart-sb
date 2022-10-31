import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import {
  DataToast,
  ToastMessageComponent,
  STATES,
} from '../../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
@Component({
  selector: 'app-deductibles',
  templateUrl: './deductibles.component.html',
  styleUrls: ['./deductibles.component.scss'],
})
export class DeductiblesComponent implements OnInit {

  

  @Input() formDeductibles:any = new FormArray([], [Validators.required]);
  @Input() dataSource:any = new MatTableDataSource<ElementTableSearch>([]);
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataToast: DataToast = {
    title: 'Asociación exitosa',
    msg: 'Los deducibles fueron asociados correctamente',
    status: STATES.success,
  };

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public toastMessage: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('');
    
  }

  get deductibleControls(): FormArray {
    return this.formDeductibles;
  }

  openToAdd(): void {
    
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']}
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: {
        code: 'deductibleDataControls',
        list: this.formDeductibles.value,
        columns: columns
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.addDeductible(res);
    });
  }

  addDeductible(deductibles: ElementTableSearch[]) {
    if (deductibles) {
      for (let deductible of deductibles) {
        this.formDeductibles.push(this.fb.group({ ...deductible }));
      }
      this.dataSource = new MatTableDataSource<ElementTableSearch>(
        this.deductibleControls.value
      );
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.dataToast,
      });
    }
  }

  removeDeductible(element: any) {
    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar el deducible seleccionado?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.formDeductibles.removeAt(
          this.formDeductibles.value.indexOf(element)
        );
        this.dataSource = new MatTableDataSource<ElementTableSearch>(
          this.formDeductibles.value
        );
      }
    });
  }
}
