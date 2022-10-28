import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { lastValueFrom, Observable } from 'rxjs';
import { ModalSearchSmallComponent } from '../modal-search-small/modal-search-small.component';
import { InitialParametersService } from '../../containers/initial-parameters/services/initial-parameters.service';
import { ModalConfirmDeleteComponent } from '../modal-confirm-delete/modal-confirm-delete.component';
import { DataToast, STATES, ToastMessageComponent } from '../toast-message/toast-message.component';
import { Clauses } from '../../core/model/Clauses.model';
import { ElementTableSearch } from '../../core/model/ElementTableSearch.model';
import { ProductService } from '../../services/product.service';
import { ElementReturn } from '../../core/model/SearchModal.model';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.scss']
})
export class ClausesComponent implements OnInit, AfterViewInit {

  @Input() formClauses:any = new FormArray ([]) ;
  @Input() layoutType: string = 'child';
  @Input() title:string = '';
  @Input() subtitle:string = '';
  @Input() emptyText:string = '';
  @Input() emptySubText:string = '';
  @Input() messageText:string = '';

  @ViewChild('clausesTable') clausesTable!: MatTable<ElementTableSearch> ;
  @ViewChild('deleteModal', { static: true }) deleteModal!: TemplateRef<any> ;
 
  displayedColumns: string[] = ['name', 'description', 'ramo','actions'];
  dataSource=new MatTableDataSource<Clauses>(this.formClauses.value);
  @ViewChild('paginatorClauses') paginatorClauses!: MatPaginator ;
  nameInuranceLine: any =[];
  //ramo:string ="";

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public toastMessage: MatSnackBar,
    public productService:ProductService,
    public initialParametersService: InitialParametersService,
  ) {
    
   }

   ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Clauses>(this.clauseControls.value);
    this.dataSource.paginator = this.paginatorClauses;
    
  }

  ngOnChanges() {
    this.dataSource= new MatTableDataSource<Clauses>(this.clauseControls.value);
    this.dataSource.paginator = this.paginatorClauses;
  }

  ngOnInit(): void {
    if (!this.productService.ramo){
    this.getDataInsuranceLine();
  }
  }


  /**
   *
   * @param code parametro para identificar el control del formulario a agregar nuestro item
   * @param list variable de tipo array con los elementos que ya están seleccionados
   * @param parameter parametro opcional para enviar al servicio
   * Funcion para abrir el modal de seleccion
   */
  /*istanbul ignore next*/
  openDialog(
    code: string,
    list: ElementTableSearch[],
    columns: any[],
    multiSelect: boolean,
    parameter?: string,
    title?: string,
    subtitle?: string
  ): Observable<ElementReturn[]> {
    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      data: { code: code, columns: columns, list: list, parameter: parameter, title: title, subtitle: subtitle, multiSelect: multiSelect },
      panelClass: 'custom-dialog-container'
    });
    return dialogRef.afterClosed();
  }

  

  get clauseControls(): FormArray {
    return this.formClauses;
  }

   /**
   * Retorna la instancia de asociaci\u00f3n exitosa.
   * @returns instancia DataToast
   */
    getSuccessStatus = (title:string,message:string) : DataToast =>
    {
      return {
       status: STATES.success,
       title : title,
       msg   : message,
     }
    }

  openModalC(){
    let parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
      ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
      : '0';

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'], dbColumnName:['name'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'], dbColumnName:['description'] },
      { name: 'details', displayValue: ['legalText'] }
    ];

    this.openDialog(
      'clausesControls', 
      this.clauseControls?.value, 
      columns,
      true,
      parameter
    ).subscribe((response: ElementReturn[]) => {
      if (response) {
        let element: ElementTableSearch ;

          for (let object of response){
            element = {
              id : object.id,
              name : object.name,
              description : object.description,
              details : this.prepararDatos(object.details)
            };
            this.clauseControls.push(this.fb.control(element));
          }
          this.dataSource = new MatTableDataSource<Clauses>(this.clauseControls.value);
          this.dataSource.paginator = this.paginatorClauses;
          this.clausesTable?.renderRows();
        this.toastMessage.openFromComponent(ToastMessageComponent, {data: this.getSuccessStatus('Asociaci\u00f3n exitosa','Las cláusulas '+this.messageText+' fueron asociadas correctamente.')});
      }
    });
  }

  deleteClause( element : any) {

    const dialogRef = this.dialog.open(ModalConfirmDeleteComponent, {
      data: {
        img: 'picto-delete',
        message:'¿Está seguro de querer desasociar la cláusula seleccionada?'
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
          this.formClauses.removeAt(this.formClauses.value.indexOf(element));
          this.dataSource = new MatTableDataSource<Clauses>(this.clauseControls.value);
           this.dataSource.paginator = this.paginatorClauses;
          
          this.clausesTable?.renderRows();
     
      }
    });
  }

  openModal(obj: Clauses):void {
    this.dialog.open(this.deleteModal, {
      width: '614px',
      height:'493px',
      data: {obj: obj}
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  prepararDatos(obj:any) {
    obj = obj.replace(/\\n/g,"<br />")
    obj = obj.replace(/\\t/g,"&nbsp;")
    return obj;
  }

  reset() {
    this.formClauses = new FormArray ([]);
    this.dataSource = new MatTableDataSource<Clauses>(this.formClauses.value);
  }

  onNoClick(): void 
  {
    this.dialog.closeAll();
  }

  getDataInsuranceLine = async (id:string='3', serviceData:string='')=>{
    try {
      let res = await lastValueFrom(this.initialParametersService.getDataInitialParameters('insuranceLine/findByCompany',id));
      if (res.dataHeader.hasErrors === false) {
        this.nameInuranceLine = res.body;
        this.nameInuranceLine = this.nameInuranceLine.filter((x: { id: any; }) => x.id == this.productService.initialParameters?.get('insuranceLine')?.value);
        this.productService.ramo =  this.nameInuranceLine[0].nmName;
        
      }
    } catch (error) {
      console.log('ocurrio un error:', error);
    }
  };


}
