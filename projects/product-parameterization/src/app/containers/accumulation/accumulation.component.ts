import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { ModalConfirmDeleteComponent } from '../../shared/modal-confirm-delete/modal-confirm-delete.component';
import { DataToast, STATES, ToastMessageComponent } from '../../shared/toast-message/toast-message.component';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { InitialParametersService } from '../initial-parameters/services/initial-parameters.service';
import { ModalSearchSmallComponent } from '../../shared/modal-search-small/modal-search-small.component';

@Component({
  selector: 'app-accumulation',
  templateUrl: './accumulation.component.html',
  styleUrls: ['./accumulation.component.scss']
})
/**
 * Render the accumulation view
 */
export class AccumulationComponent implements OnInit {

  

  accumulationTypeList:any= [];
  displayedColumns: string[] = ['name','productName','actions'];
  dataSource= new MatTableDataSource<any>();
  @ViewChild('paginator', {static: true}) paginator!: MatPaginator;

  constructor(private initialParametersService:InitialParametersService,
              public productService:ProductService,
              public dialog: MatDialog,
              private fb:FormBuilder,
              public toastMessage: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    await this.getAccumulationsType().then();
    this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);
    this.dataSource.paginator = this.paginator;
  }

   get CoveragesControls(): FormArray {
     return (<FormArray> this.productService.accumulation?.get('accumulationCoverages'));
   }

  getAccumulationsType = async (id:string='0/0')=>{
    try {
      let res = await lastValueFrom(this.initialParametersService.getDataInitialParameters('accumulationType', id));
      if (res.dataHeader.hasErrors === false) {
        this.accumulationTypeList = res.body;
      }
    } catch (error) {
      console.log('ocurrio un error:',error);
    }
  };

  
  openDialogCoverages(code: string): void {

    let data = [];
    let sendData  = [];

    sendData = this.CoveragesControls.value;

    if(this.productService && this.productService.coverages )
       data = this.productService.coverages.value;
    
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'] },
      { name: 'productName', header: 'Producto', displayValue: [this.productService.initialParameters.get('productName')?.value ?? ''] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'CommertialPlanCoverages',
      data: {
        code: code,
        columns:columns,
        list: sendData,
        data: data,
      },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.addItemCoverage(result);
    });
  }

  addItemCoverage(selected: ElementTableSearch[]) {
    if (selected) {
      let element: any;
      for (let object of selected) {
        element = this.fb.group( {
          id: object.id,
          name: object.name,
          description: object.description,
          productName:  object.productName
        });
        this.CoveragesControls.push(element);
      }
      this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);
      this.dataSource.paginator = this.paginator;
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: this.getSuccessStatus(
          'Asociaci\u00f3n exitosa',
          'Las coberturas del producto fueron asociadas correctamente.'
        ),
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCoverage(element: any) {

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message: '¿Está seguro de querer desasociar la cobertura seleccionada?',
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.CoveragesControls.removeAt(this.CoveragesControls.value.indexOf(element));
        this.dataSource = new MatTableDataSource<any>(this.CoveragesControls.value);   
        this.dataSource.paginator = this.paginator
      }
     
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
  
    changeRequired(){
      if(this.productService.accumulation.get('accumulationType')?.value!=null){
          this.productService.accumulation.get('accumulationTop')?.addValidators(Validators.required);
          this.productService.accumulation.get('accumulationCoverages')?.addValidators(Validators.required);
          this.productService.accumulation.controls['accumulationTop'].updateValueAndValidity();
          this.productService.accumulation.controls['accumulationCoverages'].updateValueAndValidity();

      }else{
          this.productService.accumulation.get('accumulationTop')?.clearValidators();
          this.productService.accumulation.get('accumulationCoverages')?.clearValidators();
          this.productService.accumulation.controls['accumulationTop'].updateValueAndValidity();
          this.productService.accumulation.controls['accumulationCoverages'].updateValueAndValidity();

      }
    }
}
