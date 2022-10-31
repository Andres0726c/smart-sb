import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DataToast, STATES, ToastMessageComponent } from '../../../shared/toast-message/toast-message.component';
import { ModalSearchSmallComponent } from '../../../shared/modal-search-small/modal-search-small.component';
import { ModalConfirmDeleteComponent } from '../../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-coverages-rules',
  templateUrl: './coverages-rules.component.html',
  styleUrls: ['./coverages-rules.component.scss']
})
export class CoveragesRulesComponent implements OnInit {

    @Input() coverageRules!:any;
    selectedSelection!: any;
    selectedInitialize!: any;
    selectedValidate!: any;
  
    @ViewChild('chipListSelection') chipListSelection!: MatChipList;
    @ViewChild('chipListInitialize') chipListInitialize!: MatChipList;
    @ViewChild('chipListValidate') chipListValidate!: MatChipList;
  
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(public dialog: MatDialog,
              private toastMessage: MatSnackBar,
              private service: ProductService,
              public fb: FormBuilder) { 
                this.coverageRules = fb.group({
                  selectionRule: fb.array([], []),
                  initializeRule: fb.array([], []),
                  validateRule: fb.array([], []),
                })

               }

  ngOnInit(): void {
    console.log('');
  }

    /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * Funcion para realizar la apertura de la modal de consulta y seleccion
   */
     openDialog(code: string, list: ElementTableSearch[], parameter: string = ''): Observable<any> {
      const columns = [
        { name: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname'] },
        { name: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription'] },
        { name: 'cdRuleType', displayValue: ['cdRuleType'] },
        { name: 'endPoint', displayValue: ['endPoint'] }
        ];

      const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
        data: { code: code, list: list, columns: columns, parameter: parameter, multiSelect: false },
        panelClass: 'custom-dialog-container',
      });
      let res: ElementTableSearch[] = [];
      return dialogRef.afterClosed();
    }
  
    openDialogCoverageRules(code: string): void {
      let sendData: ElementTableSearch[] = [];
      let parameter!: string;
      
      switch (code) {
        case 'ruleSelectionControls':
          sendData = this.coverageRules.get('selectionRule')!.value; 
          break;

        case 'ruleInitializeControls':
          sendData = this.coverageRules.get('initializeRule')!.value;
          break;

        case 'ruleValidationControls':
          sendData = this.coverageRules.get('validateRule')!.value;
          break;
      
        default:
          break;
      }
      
      
      this.openDialog(code, sendData, parameter).subscribe((res) =>
        {
          this.addChip(code, res);
        }
      );
    }
    
 /**
 * funcion tipo get para obtener los datos de selectionRule
 */
    get ruleSelectionControls(): FormArray {
      return this.coverageRules.controls['selectionRule'] as FormArray;
    }

 /**
 * funcion tipo get para obtener los datos de initializeRule
 */
    get ruleInitializeControls(): FormArray {
      return this.coverageRules.controls['initializeRule'] as FormArray;
    }

 /**
 * funcion tipo get para obtener los datos de validateRule
 */
    get ruleValidationControls(): FormArray {
      return this.coverageRules.controls['validateRule'] as FormArray;
    }

  /**
   *
   * @param ctl parametro para identificar el control del formulario a agregar nuestro chip
   * Funcion para agregar chip en cada una de los inputs de opciones multiples y selección única como reglas de selección etc...
   */  
    addChip = (ctl: string, obj: ElementTableSearch[]) => {
      if(obj){
  
        let data: DataToast = {
          status: STATES.success,
          title: 'Asociación exitosa',
          msg: '',
        };
        switch (ctl) {
          
          case 'ruleSelectionControls':
            for (let object of obj) {
              
              this.selectedSelection = object;
              this.ruleSelectionControls.clear();
              this.ruleSelectionControls.push(this.fb.control(object));
            }
            this.chipListSelection.errorState = false;
            data.msg ='La regla de selección fue asociada correctamente.'
            break;

          case 'ruleInitializeControls':
            for (let object of obj) {
              
              this.selectedInitialize = object;
              this.ruleInitializeControls.clear();
              this.ruleInitializeControls.push(this.fb.control(object));
            }
            this.chipListSelection.errorState = false;
            data.msg ='La regla de inicialización fue asociada correctamente.'
            break;

            case 'ruleValidationControls':
              for (let object of obj) {
                
                this.selectedValidate = object;
                this.ruleValidationControls.clear();
                this.ruleValidationControls.push(this.fb.control(object));
              }
              this.chipListValidate.errorState = false;
              data.msg ='La regla de validación fue asociada correctamente.'
              break;
            
        default:
          break;
      }
  
        this.toastMessage.openFromComponent(ToastMessageComponent, {
          data: data,
        });
      }
    };
  
    /**
     * 
     * @param res valor del campo del cual se esta eliminando los chips
     * @param index valor para eliminar dato del array que contiene las opciones elegidas en los chips
     * @param value valor a eliminar de las opciones multiples de la caja de chips
     */
    deleteSelectionControls(res:any,index:number,value: string){
      if(res){
        index = this.ruleSelectionControls.value.indexOf(value);
        if(index >= 0) {
          this.ruleSelectionControls.removeAt(index);
        }
      }
    }

    deleteInitialsControls(res:any,index:number,value: string){
      if(res){
        index = this.ruleInitializeControls.value.indexOf(value);
        if(index >= 0) {
          this.ruleInitializeControls.removeAt(index);
        }
      }
    }
    
    deleteValidationControls(res:any,index:number,value: string){
      if(res){
        index = this.ruleValidationControls.value.indexOf(value);
      
      
        if(index >= 0) {
          this.ruleValidationControls.removeAt(index);
        }
      }
    }

   /**
   *
   * @param value valor a eliminar de las opciones multiples de la caja de chips
   * @param field valor del campo del cual se esta eliminando los chips
   * @param index valor para eliminar dato del array que contiene las opciones elegidas en los chips
   * Funcion para eliminar chips de los campos q tenga
   */
    remove = (value: string, field: string): void => {
      let index = -1;
      const dialogRef = this.dialog.open(ModalConfirmDeleteComponent,{
        data: {
          img: 'picto-delete',
          message: '¿Está seguro de querer desasociar la regla seleccionada?'
        }
      });
      switch (field) {
        case 'selectionRule':
          dialogRef.afterClosed().subscribe((res) => {
            this.deleteSelectionControls(res,index,value)
          });
          break;
        case 'initializeRule':
          dialogRef.afterClosed().subscribe((res) => {
            this.deleteInitialsControls(res,index,value)
          });
          break;
        case 'validateRule':
          dialogRef.afterClosed().subscribe((res) => {
           this.deleteValidationControls(res,index,value);
          });
          break;
          default:
            break;
    }
    console.log("")
  }
}
