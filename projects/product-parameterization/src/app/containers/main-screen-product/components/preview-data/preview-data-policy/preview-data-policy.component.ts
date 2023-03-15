import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';
import { DataToast, STATES, ToastMessageComponent } from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';

@Component({
  selector: 'refactoring-smartcore-mf-preview-data-policy',
  templateUrl: './preview-data-policy.component.html',
  styleUrls: ['./preview-data-policy.component.scss']
})
export class PreviewDataPolicyComponent implements OnInit {

  dataPolicy:any=new FormArray([]);
  contextData: any = [];
  isLoading = false;
  flagError = false;
  applicationLevel = 'Póliza';

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadContextData();
  }

  get policyPreviewControls(): FormArray {
    return (<FormArray>(
      this.productService.prvwDt?.get('plcyDtGrp')
    )) as FormArray;
  }

  getParamValuesList() {
    let list: any = [];

    for (let field of this.getAllFields()) {
      const objField = {
        id: field.businessCode,
        name: field.name,
        description:field?.dataType?.description
      };
      list.push(objField);
    }

    for (let field of this.contextData) {
      const objContext = {
        id: field.code,
        name: field.description,
        description: field.description
      };
      list.push(objContext);
    }

    list = list.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));
    
    return list;
  }

  getAllFields() {
    let res: any[] = [];
    for(const group of this.productService.policyData.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

loadContextData() {
    this.isLoading = true;
    this.productService.getApiData(`domainList/DATOS_CONTEXTO`).subscribe({
      next: (res: any) => {
        console.log('datos contexto', res);
        this.contextData = res.body.nmValueList;
        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData =  this.contextData.filter( (data:any) => data.applctnLvl.includes(this.applicationLevel) || data.applctnLvl.includes("*") );
        this.isLoading = false;
      },
      error: (error) => {
        this.flagError = true;
        this.isLoading = false;
        console.error('Ha ocurrido un error al obtener los datos necesarios');
      }
    });
  }

  openToAdd(): void {
    
    let sendData = [];
    sendData = this.productService.policyData?.value[0].fields;
 
    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['name'] },
      {name: 'description', header: 'Descripción',displayValue: ['description']},
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: 'emissionData',
        columns: columns,
        list: [],
        data:this.getParamValuesList() //level==='risk'?this.getAllRisk():this.getAllFields(),
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
      console.log("obj",obj);

      for (let object of obj) {
        nameGruop = this.getNameGroup(object.element.id);
        console.log(nameGruop);
        
        if ( this.dataPolicy.value.findIndex(
              (x: { id: any }) => x.id === nameGruop.id
            ) === -1
          ) {
            this.dataPolicy.push(
              new FormGroup({
                id: this.fb.control(nameGruop.id),
                code: this.fb.control(nameGruop.code),
                name: this.fb.control(nameGruop.name),
                fields: this.fb.array([], Validators.required),
                isEditing: this.fb.control(nameGruop.isEditing),
              })
            );

            this.addCanonic()
          }
          this.addGroupArrayById(object,nameGruop);
      }

      console.log(this.dataPolicy,"pliza");
    }
  };

getNameGroup(name: any) {

  let objGruop;
  for (let groups of this.productService.policyData.value) {
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

getGroupArrayById(id: number) {
  return <FormArray>(
    this.dataPolicy.controls
      .find((x: { value: { id: number } }) => x.value.id === id)
      ?.get('fields')
  );
  
}

addGroupArrayById(object:any,nameGruop:any){
  const index = this.dataPolicy.value.findIndex(
    (x: { id: any }) => x.id === nameGruop.id
  );

  this.getGroupArrayById(index + 1).push(
    new FormGroup({
      id: this.fb.control(object.id, [Validators.required]),
      name: this.fb.control(object.name, [Validators.required]),
      label: this.fb.control(
        object.element.name
          ? object.element.name
          : object.element.name,
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

addCanonic(){
  
}

  showMessageGroup(showMessage:boolean){
    let data: DataToast = {
      status: STATES.success,
      title: 'Asociación exitosa',
      msg: 'Los datos de la póliza fueron asociados correctamente.',
    };
    if (showMessage) {
      this.toastMessage.openFromComponent(ToastMessageComponent, {
        data: data,
      });
    }
  }
} 
