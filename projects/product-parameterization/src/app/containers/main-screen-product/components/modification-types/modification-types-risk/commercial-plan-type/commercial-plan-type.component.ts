import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import {
  DataToast,
  STATES,
  ToastMessageComponent,
} from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';
import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';

interface options {
  id: number;
  value: [];
}

interface Coverages {
  description: string;
  id: number;
  name: string;
  cvrgDtGrp: any;
  athrzdOprtn: any;
}

@Component({
  selector: 'refactoring-smartcore-mf-commercial-plan-type',
  templateUrl: './commercial-plan-type.component.html',
  styleUrls: ['./commercial-plan-type.component.scss'],
})
export class CommercialPlanTypeComponent implements OnInit, OnChanges {
  @Input() titleBussinesPlan: string = '';
  @Input() data: string = '';
  @Input() riskDataCode: string = '';

  coverageflag: boolean = false;
  complementaryFlag:boolean=false;

  items = [
    { label: 'Mascotas' },
    { label: 'Planes comerciales' },
    { label: this.titleBussinesPlan },
  ];
  tableDataService: any[] = [];
  tableData: Coverages[] = [];
  disabled: boolean = true;
  titleCurrent:string='';
  idCoverage: number = 0;
  athrzdOprtnCoverages: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
    { name: 'Modificar', key: 'MDF' },
  ];
  athrzdOprtnService: any[] = [
    { name: 'Remover', key: 'RMV' },
    { name: 'Añadir', key: 'ADD' },
  ];
  prueba:any=new FormArray([]);
  dataAthrzdOprtn: any = [];

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    this.items = [
      { label: 'Mascotas' },
      { label: 'Planes comerciales' },
      { label: this.titleBussinesPlan },
    ];
    this.tableData = [];
    this.tableDataService = [];
    this.addDataTable();
  }
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  getAllFields() {
    let res: any[] = [];
    for (const group of this.getComplementaryData(
      this.idCoverage
    ).getRawValue()) {
      res = res.concat(group.fields);
    }
   
 
    return res;
  }

  sortParameterBy(property:any, complementaryData:any) {  
    return complementaryData.sort((a:any, b:any) => {
      return a[property] >= b[property]
        ? 1
        : -1
    })
  }
  
  getAll() {
    let res: any[] = [];
    if (this.idCoverage != 0) {
      for (const group of this.getcover(
        this.idCoverage
      ).getRawValue()) {
        res = res.concat(group.fields);
      }
    }
    return this.sortParameterBy('name',res);
  }

  getcmmrclPln(id: number) {
    return  (<FormArray>(
      this.policyDataControls.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('cmmrclPln') )) as FormArray;
  
  }
  getcoveragesPln(code: string) {
    return (<FormArray>this.getcmmrclPln(2)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('cvrg')) as FormArray;
  }

  getAthrzdOprtnCoveragePln(id:number){
    return   (<FormArray>(this.getcoveragesPln(this.data)
    .controls.find((x: { value: { id: number } }) => x.value.id === id)
    ?.get('athrzdOprtn') )) as FormArray;
}
  
  
  
  getSrvcPln(code: string) {
    
    return (<FormArray>this.getcmmrclPln(2)
      .controls.find((x: { value: { code: string } }) => x.value.code === code)
      ?.get('srvcPln')) as FormArray;
  }

  getAthrzdOprtnSrvcPln(id:number){
    return   (<FormArray>(this.getSrvcPln(this.data)
    .controls.find((x: { value: { id: number } }) => x.value.id === id)
    ?.get('athrzdOprtn') )) as FormArray;
}
  

  getComplementaryData(id: number) {

    return (<FormArray>(
      this.productService.coverages.controls
        .find((x: { value: { id: number } }) => x.value.id === id)
        ?.get('complementaryData')
    )) as FormArray;
  }
  getcoverages(id: number) {
    return (<FormArray>(
      this.getcoveragesPln(this.data).controls.find(
        (x: { value: { id: number } }) => x.value.id === id
      )
    )) as FormArray;
  }
  getcover(id: number) {
    return (<FormArray>(
      this.getcoveragesPln(this.data).controls.find(
        (x: { value: { id: number } }) => x.value.id === id
      )?.get('cvrgDtGrp')
    )) as FormArray;
  }


  get policyDataControls(): FormArray {
    return (<FormArray>(
      this.productService.mdfctnPrcss?.get('mdfcblDt')?.get('rskTyp')
    )) as FormArray;
  }



  getGroupArray(id: number) {
    return <FormArray>this.getcover(this.idCoverage).controls.find(
        (x: { value: { id: number } }) => x.value.id === id
      )
      ?.get('fields');
  }

 

  addDataTable() {
    this.tableData = [];
    this.tableDataService = [];
    this.tableData.push(...this.getcoveragesPln(this.data).getRawValue());
    this.tableDataService.push(...this.getSrvcPln(this.data).getRawValue());
  }

  changeCheck(id: number, event: any) {
    if (event.checked.length!==0){
      this.addEvent(id,event.checked,'coverage');
      }else {
        this.getAthrzdOprtnCoveragePln(id).clear();
        this.getcover(id).clear();
      }
  }

  changeCheckServices(id: any, event: any) {
    
    if (event.checked.length!==0){
      this.addEvent(id,event.checked,'service');
      }else {
        this.getAthrzdOprtnSrvcPln(id).clear();
      }

    
  }

  addEvent(id:any, checked:any,level:any){
    let flag:boolean=true;
    if(level==='service'){
    this.getAthrzdOprtnSrvcPln(id).clear();
    for(let eventA of  checked){
      this.getAthrzdOprtnSrvcPln(id).push(this.fb.control(eventA));
    }
  }else{
    this.getAthrzdOprtnCoveragePln(id).clear();

    for(let eventA of  checked){
      
      this.getAthrzdOprtnCoveragePln(id).push(this.fb.control(eventA));
    }
    this.getAthrzdOprtnCoveragePln(id).value.find((x:any)=>x==="MDF")?(flag=false):(flag=true);

    if(flag){
      console.log("entro");
      this.getcover(id).clear();
    }

  }
  }
  activeButton(data: any) {
    let btn: boolean; 
      data.athrzdOprtn.find((d:any)=>d=='MDF') ? (btn = false) : (btn = true);
    return btn;
  }

  openToAdd() {
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['label'] },
      {
        name: 'description',
        header: 'Descripción',
        displayValue: ['description'],
      },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: 'emissionData',
        title:'Seleccionar datos complementarios',
        subtitle:'Seleccione los datos del tipo de riesgo que desea asociar',
        columns: columns,
        list: this.getAll(),
        data: this.getAllFields(),
      },
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }
  addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      this.showMessageGroup(showMessage);
      let nameGruop: any;

      for (let object of obj) {
        nameGruop = this.getNameGroup(object.element.businessCode);
        this.add(nameGruop)
        this.addGroupArray(object, nameGruop);
      }
    }
  };
add(nameGroup:any){

    if(this.getcover(this.idCoverage).value.findIndex(
      (x: { id: any }) => x.id === nameGroup.id) === -1)
      this.getcover(this.idCoverage).push(
        new FormGroup({
          id: this.fb.control(nameGroup.id),
          code: this.fb.control(nameGroup.code),
          name: this.fb.control(nameGroup.name),
          fields: this.fb.array([], Validators.required),
          isEditing: this.fb.control(nameGroup.isEditing),
        })
      )
  

}
  addGroupArray(object: any, nameGruop: any) {

    const index = this.getcover(this.idCoverage).value.findIndex((x: { id: any }) => x.id === nameGruop.id);
    this.getGroupArray(nameGruop.id).push(
      new FormGroup({
        id: this.fb.control(object.id, [Validators.required]),
        name: this.fb.control(object.name, [Validators.required]),
        label: this.fb.control(
          object.element.nmLabel
            ? object.element.nmLabel
            : object.element.label,
          [Validators.required]
        ),
        dataType: this.fb.control(object.element.dataType),
        initializeRule: this.fb.array([], []),
        validateRule: this.fb.array([], []),
        dependency: this.fb.control(null, []),
        requiredEssential: this.fb.control(
          object.element.flIsMandatory === 'S' ? true : false,
          [Validators.required]
        ),
        required: this.fb.control(
          object.element.flIsMandatory === 'S' ? true : false,
          [Validators.required]
        ),
        editable: this.fb.control(true, [Validators.required]),
        visible: this.fb.control(true, [Validators.required]),
        fieldGroup: this.fb.control(index + 1, []),
        shouldDelete: this.fb.control(object.shouldDelete, [
          Validators.required,
        ]),
        businessCode: this.fb.control(object.element.businessCode),
        domainList: this.fb.control(object.element.domainList),
      })
    );
  }
  showMessageGroup(showMessage: boolean) {
    let data: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg: 'Los datos complementarios de la cobertura fueron asociados correctamente.',
    };
    if (showMessage) {
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  }

  getNameGroup(name: any) {
    let objGruop;
    for (let groups of this.getComplementaryData(this.idCoverage).value) {
      for (let key of groups.fields) {
        if (key.businessCode === name) {
          objGruop = {
            id: groups.id,
            code: groups.code,
            name: groups.name,
            fields: this.fb.array([], Validators.required),
            isEditing: groups.isEditing,
          };
          break;
        }
      }
    }
    return objGruop;
  }



  editData(data: any) {
    if (data) {
      
      this.idCoverage = data.id;
      this.getAll();
      this.getAllFields();
      this.titleCurrent=data.name;
      this.coverageflag = true;
    } else {
      this.coverageflag = false;
    }

  }

  sendDataCoverage() {
    if( this.getAll().length>0){
      this.getAll();
      this.getAllFields();
    }

     return this.getcover(this.idCoverage);
  }
}
