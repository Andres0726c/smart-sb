import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipList } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DataToast, STATES, ToastMessageComponent } from '../../../shared/toast-message/toast-message.component';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ProductService } from '../../../services/product.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';

@Component({
  selector: 'app-coverages-rates',
  templateUrl: './coverages-rates.component.html',
  styleUrls: ['./coverages-rates.component.scss']
})
export class CoveragesRatesComponent implements OnInit {

  @Input() coverageRates:any = new FormArray([]);

  @ViewChild('chipListRates') chipListRates!: MatChipList;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialog: MatDialog,
              private toastMessage: MatSnackBar,
              private service: ProductService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('');
  }

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * @param parameter parametro opcional para enviar al servicio
   * Funcion para realizar la apertura de la modal de consulta y seleccion
   */
  openDialog(code: string, list: ElementTableSearch[], parameter: string = ''): Observable<any> {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'] },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'] }
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: { code: code, list: list, columns: columns, parameter: parameter, multiSelect: false },
    });
    let res: ElementTableSearch[] = [];
    return dialogRef.afterClosed();
  }

  openDialogCoverageRates(): void {
    let parameter!: string;
    
    
    this.openDialog('coverageRatesControls', this.coverageRatesControls?.value, parameter).subscribe((res) =>
      {
        this.addChip(res);
      }
    );
  }

  /**
   * funcion tipo get para obtener los datos de tarifas
   */
  get coverageRatesControls(): FormArray {
    return this.coverageRates;
  }
  
  /**
Funcion para agregar chip en el input de opciones múltiples pero de única selección
   */
  addChip = (obj: ElementTableSearch[]) => {
    if(obj){

      let data: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: '',
      };
      for (let object of obj) {
        console.log(object);
        
        this.coverageRatesControls.removeAt(0);
        this.coverageRatesControls.push(this.fb.control(object));
      }
      this.chipListRates.errorState = false;
      data.msg ='La tarifa fue asociada correctamente.'

      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  };

/**
 *
 * @param value valor a eliminar de la selección de la caja de chips
 * Funcion para eliminar chips
 */
  remove = (value: string): void => {

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
      data: {
        img: 'picto-delete',
        message:'¿Está seguro de querer desasociar la tarifa seleccionada?'
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if(res){
      let index = -1;
  
          index = this.coverageRatesControls.value.indexOf(value);
  
          if (index >= 0) {
            this.coverageRatesControls.removeAt(index);
  
      }}
    })
  };

  reset(){
    this.coverageRates = new FormArray([]);
  }

}
