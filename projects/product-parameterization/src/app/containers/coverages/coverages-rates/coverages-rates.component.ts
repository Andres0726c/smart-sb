import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatChipList } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DataToast, STATES, ToastMessageComponent } from '../../../shared/toast-message/toast-message.component';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ProductService } from '../../../services/product.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import {RulesWizardComponent} from "../../../shared/complementary-data/rules-wizard/rules-wizard";

@Component({
  selector: 'app-coverages-rates',
  templateUrl: './coverages-rates.component.html',
  styleUrls: ['./coverages-rates.component.scss']
})
export class CoveragesRatesComponent implements OnInit {

  @Input() coverageRates:any = new FormArray([]);
  @Input() complementaryData: any = new FormArray([], [Validators.required]);

  @ViewChild('chipListRates') chipListRates!: MatChipList;

  addOnBlur = true;
  contextData: any = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  selectedField: any = new FormGroup({
    calculationRule: new FormArray([])
  });

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

  openDialogWizard(
    code: string,
    list: ElementTableSearch[],
    columns: any[],
    multiSelect: boolean,
    complementaryData: any,
    contextData: any
  ) {
    const dialogRef = this.dialog.open(RulesWizardComponent, {
      data: {
        code,
        columns: columns,
        list, multiSelect: multiSelect,
        complementaryData: complementaryData,
        contextData: contextData
      },
      panelClass: 'custom-dialog-container',
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  openModalCalculationRule() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']  },
      { name: 'cdRuleType', displayValue: ['cdRuleType'], dbColumnName:['cdRuleType']  },
      { name: 'endPoint', displayValue: ['endPoint'] },
      { name: 'nmParameterList', displayValue: ['nmParameterList'] },
      { name: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
      { name: 'urlBs', displayValue: ['urlBs'] }
    ];

    this.openDialogWizard(
      'ruleCalculationControls',
      this.selectedField.get('calculationRule')?.value,
      columns,
      false,
      this.complementaryData,
      this.contextData
    ).subscribe((response: any) => {
      if (response) {
        let element: any = {
          id: response.RulesForm.rule.id,
          name: response.RulesForm.rule.name,
          cdBusinessCode: response.RulesForm.rule.cdBusinessCode,
          description: response.RulesForm.rule.description,
          cdRuleType: response.RulesForm.rule.cdRuleType,
          endPoint: response.RulesForm.rule.endPoint,
          urlBs: response.RulesForm.rule.urlBs,
          argmntLst: response.RulesForm.parameters
        };
        (<FormArray>this.selectedField?.get('calculationRule')).removeAt(0);
        (<FormArray>this.selectedField?.get('calculationRule')).push(this.fb.control(element));
        this.toastMessage.openFromComponent(ToastMessageComponent, { data: this.getSuccessStatus('Asociaci\u00f3n exitosa', 'La regla de inicializaci\u00f3n fue asociada correctamente.') });
      }
    });
  }

  removeCalculationRule = (): void => {
    (<FormArray>this.selectedField?.get('calculationRule')).removeAt(0);
  };

  getSuccessStatus = (title: string, message: string): DataToast => {
    return {
      status: STATES.success,
      title: title,
      msg: message,
    }
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
