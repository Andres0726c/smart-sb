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
    this.clearGroup();
   
  }

  get policyPreviewControls(): FormArray {
    return (<FormArray>(
      this.productService.prvwDt?.get('plcyDtGrp')
    )) as FormArray;
  }

  clearGroup() {
  
    for (let field of this.policyPreviewControls.value) {

      if(field.fields.length ===0) {

        let index = this.policyPreviewControls.controls.findIndex(x => x.value.id ===field.id);

          this.policyPreviewControls.removeAt(index);
      }

    }
   
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

      if (!nameGruop) {
       
        nameGruop = {
              id: 0,
              code: 'datos_contexto',
              name: 'Datos de contexto',
              fields: this.fb.array([], Validators.required),
              isEditing: false,
            };
      }
        
        if ( this.policyPreviewControls.value.findIndex(
              (x: { id: any }) => x.id === nameGruop.id
            ) === -1
          ) {
            this.policyPreviewControls.push(
              new FormGroup({
                id: this.fb.control(nameGruop.id),
                code: this.fb.control(nameGruop.code),
                name: this.fb.control(nameGruop.name),
                fields: this.fb.array([], Validators.required),
                isEditing: this.fb.control(nameGruop.isEditing),
              })
            );

          //  this.addCanonic()
          }
          console.log(this.policyPreviewControls);
          this.addGroupArrayById(object,nameGruop);
      }

      console.log(this.policyPreviewControls,"pliza");
    }
  };

getNameGroup(name: any) {

  let objGruop;
  for (let groups of this.productService.policyData.value) {
    console.log(groups,"grupos");
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
      // else {
      //   objGruop = {
      //     id: 'datos_contexto',
      //     code: 'datos_contexto',
      //     name: 'Datos de contexto',
      //     fields: this.fb.array([], Validators.required),
      //     isEditing: false,
      //   };

      // }
    }
  }
  return objGruop;
}

getGroupArrayById(id: any) {
  return <FormArray>(
    this.policyPreviewControls.controls
      .find((x: { value: { id: any } }) => x.value.id === id)
      ?.get('fields')
  );
  
}

addGroupArrayById(object:any,nameGruop:any){

  const index = this.policyPreviewControls.value.findIndex(
    (x: { id: any }) => x.id === nameGruop.id
  );

  console.log(object,"obj");
  console.log( this.getGroupArrayById(nameGruop.id),"group");

  this.getGroupArrayById(nameGruop.id).push(
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
     
      fieldGroup: this.fb.control(nameGruop.id, []),
      shouldDelete: this.fb.control(object.shouldDelete, [
        Validators.required,
      ]),
      businessCode: this.fb.control(object.element.businessCode),
     
    })
  );
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
