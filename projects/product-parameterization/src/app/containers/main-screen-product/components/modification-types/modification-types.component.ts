import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TreeNode } from 'primeng/api';
import { ElementReturn } from 'projects/product-parameterization/src/app/core/model/SearchModal.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { MenuItem } from 'primeng/api';

import { ModalSearchSmallComponent } from 'projects/product-parameterization/src/app/shared/modal-search-small/modal-search-small.component';
import { NoDataScreenComponent } from 'projects/product-parameterization/src/app/shared/no-data-screen/no-data-screen.component';
import { NoDataScreenModule } from 'projects/product-parameterization/src/app/shared/no-data-screen/no-data-screen.module';
import { DataToast, STATES } from 'projects/product-parameterization/src/app/shared/toast-message/toast-message.component';
interface OptionsCommercialP {
  name: string;
  key: string;
}

interface Coverages {
  id: number;
  required: boolean;
}
interface BussinesPlans {
  code: string;
  coverages: Coverages[];
  description: string;
  name: string;
  servicePlans: Coverages[];
  athrzdOprtn?: OptionsCommercialP[];
}

@Component({
  selector: 'refactoring-smartcore-mf-modification-types',
  templateUrl: './modification-types.component.html',
  styleUrls: ['./modification-types.component.scss']
})
export class ModificationTypesComponent implements OnInit {
  items1: MenuItem[] = [];
  titleBussinesPlan: string = '';
  indexServicePlan: number = 0;
  indexRiskType: number = 0;
  bussinesPlans: boolean = false;
  coverages: boolean = false;
  showBranch:BussinesPlans[]=[];
  showCommercialPlans: boolean = false;
  showCommercialPlansTypes: boolean = false;
  nameBrach: string = '';
  
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public toastMessage: MatSnackBar,
    public productService: ProductService,) { this.calledMenu();}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // changeViewCommercial() {
  //   this.showCommercialPlans = !this.showCommercialPlans;
  //   if(this.showCommercialPlansTypes)
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  // }
  // changeViewCommercialTypes() {
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  //   if(this.showCommercialPlans)
  //   this.showCommercialPlans = !this.showCommercialPlans;

  // }


  // nodeSelect(event:any) {
  //   console.log(event);
  // }

  // nodeUnselect(event:any) {
  //   console.log(event);
  // }

  

  // selectGroup() {
  //   let newGroupName = 'Nuevo grupo';
   
  //   const Group = this.fb.group({
  //     id: "this.getMax(this.complementaryDataControls.value, 'id') + 1,",
  //     name: newGroupName,
  //     code: null,
  //     fields: this.fb.array([], Validators.required),
  //     isEditing: this.fb.control(false)
  //   });

    
   
   // this.startGroupEdit(this.complementaryData.controls[this.complementaryData.length - 1]);
  // }

  // getNameGroup(name:any){

  //   let objGruop;
    
  //     for (let groups  of this.productService.policyData.value) {

  //           for (let key of groups.fields ) {
  //               if (key.businessCode === name) {
                  
  //                 objGruop = {
  //                   id: groups.id,
  //                   code : groups.code,
  //                   name : groups.name,
  //                   fields: this.fb.array([], Validators.required),
  //                   isEditing: groups.isEditing
  //               }
  //                 break;
  //           }
  //     }  
  //   }

  //     return objGruop;

  // }
  

  // changeViewCommercial() {
  //   this.showCommercialPlans = !this.showCommercialPlans;
  //   if(this.showCommercialPlansTypes)
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  // }
  // changeViewCommercialTypes() {
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  //   if(this.showCommercialPlans)
  //   this.showCommercialPlans = !this.showCommercialPlans;

  // }
  getGroupArrayById(id: number) {
    return (<FormArray>this.complementaryDataControls.controls.find((x: { value: { id: number; }; }) => x.value.id === id)?.get('fields'));
  //productService.modificationProcess.mdfcblDt.plcyDtGrp.controls
  }

  openToAdd(): void {


    let sendData = [];
    sendData = this.productService.policyData?.value[0].fields;

    const columns = [
      { name: 'name', header: 'Nombre', displayValue: ['label'] },
      { name: 'description', header: 'Descripción', displayValue: ['description'] },
      { name: 'shouldDelete', displayValue: [true] },
      { name: 'element', displayValue: ['element'] },
    ];

    const dialogRef = this.dialog.open(ModalSearchSmallComponent, {
      id: 'emissionData',
      data: {
        code: "emissionData",
        columns: columns,
        list: this.getAll(),
        data: this.getAllFields()
      }
    });
    dialogRef.afterClosed().subscribe((res: ElementReturn[]) => {
      this.addItem(res, 1, true);
    });
  }


  getAllFields() {
    let res: any[] = [];
    for(const group of this.productService.policyData?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getAll() {
    let res: any[] = [];
    for(const group of this.complementaryDataControls?.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  get complementaryDataControls(): FormArray {
    return (<FormArray> this.productService.modificationProcess?.get('mdfcblDt')?.get('plcyDtGrp')) as FormArray;
  }

   addItem = (obj: ElementReturn[], group: number, showMessage: boolean) => {
    if (obj) {
      let data: DataToast = {
        status: STATES.success,
        title: 'Asociación exitosa',
        msg: "this.successAddItemMsg,"
      };

      let nameGruop:any;

      for (let object of obj) {

        nameGruop = this.getNameGroup(object.element.businessCode);


      if (this.complementaryDataControls.value.findIndex((x: { id: any; }) => x.id === nameGruop.id) === -1) {

          this.complementaryDataControls.push(new FormGroup({

            id: this.fb.control(nameGruop.id),
            code:this.fb.control(nameGruop.code),
            name : this.fb.control(nameGruop.name),
            fields: this.fb.array([], Validators.required),
            isEditing:this.fb.control( nameGruop.isEditing)

          }));
        }

        

        const index = this.complementaryDataControls.value.findIndex((x: { id: any; }) => x.id === nameGruop.id) 
       // const index2 = this.getAll().findIndex((x: { id: number; }) => x.id === object.id);

         //   if (index2 === -1) {

          this.getGroupArrayById(index+1).push(new FormGroup({
            id: this.fb.control(object.id, [Validators.required]),
            name: this.fb.control(object.name, [Validators.required]),
            label: this.fb.control(object.element.nmLabel ? object.element.nmLabel : object.element.label, [Validators.required]),
            dataType: this.fb.control(object.element.dataType),
            initializeRule: this.fb.array([], []),
            validateRule: this.fb.array([], []),
            dependency: this.fb.control(null, []),
            requiredEssential: this.fb.control(object.element.flIsMandatory === "S" ? true : false, [Validators.required]),
            required: this.fb.control(object.element.flIsMandatory === "S" ? true : false, [Validators.required]),
            editable: this.fb.control(true, [Validators.required]),
            visible: this.fb.control(true, [Validators.required]),
            fieldGroup: this.fb.control(1, []),
            shouldDelete: this.fb.control(object.shouldDelete, [Validators.required]),
            businessCode:this.fb.control(object.element.businessCode),
            domainList:this.fb.control(object.element.domainList)
           }));
          
        }

     // }


      console.log(this.complementaryDataControls,"test");


      
       //  const index = -1;//this.getAllFields().findIndex((x: { id: number; }) => x.id === object.id);


          // if (index === -1) {
          //   this.getGroupArrayById(group).push(new FormGroup({
          //     id: this.fb.control(object.id, [Validators.required]),
          //     name: this.fb.control(object.name, [Validators.required]),
          //     label: this.fb.control(object.element.nmLabel ? object.element.nmLabel : object.element.label, [Validators.required]),
          //     dataType: this.fb.control(object.element.dataType),
          //     shouldDelete: this.fb.control(object.shouldDelete, [Validators.required]),
          //     businessCode:this.fb.control(object.element.businessCode),
          //     domainList:this.fb.control(object.element.domainList)
          //   }));

          //   // if (this.getGroupArrayById(1).length > 0 && this.getGroupArrayById(1).controls.length === 1) {
          //   //   this.selectComplementaryData(<FormGroup>this.getGroupArrayById(1).controls[0])
          //   // }
          // }

         // console.log(this.productService);
        
         
      }
    }

  nodeSelect(event:any) {
    console.log(event);
  }

  nodeUnselect(event:any) {
    console.log(event);
  }

  

  selectGroup() {
    let newGroupName = 'Nuevo grupo';
   
    const Group = this.fb.group({
      id: "this.getMax(this.complementaryDataControls.value, 'id') + 1,",
      name: newGroupName,
      code: null,
      fields: this.fb.array([], Validators.required),
      isEditing: this.fb.control(false)
    });

    
   
   // this.startGroupEdit(this.complementaryData.controls[this.complementaryData.length - 1]);
  }

  getNameGroup(name:any){

    let objGruop;
    
      for (let groups  of this.productService.policyData.value) {

            for (let key of groups.fields ) {
                if (key.businessCode === name) {
                  
                  objGruop = {
                    id: groups.id,
                    code : groups.code,
                    name : groups.name,
                    fields: this.fb.array([], Validators.required),
                    isEditing: groups.isEditing
                }
                  break;
            }
      }  
    }

      return objGruop;

  }
  

  // changeViewCommercial() {
  //   this.showCommercialPlans = !this.showCommercialPlans;
  //   if(this.showCommercialPlansTypes)
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  // }
  // changeViewCommercialTypes() {
  //   this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  //   if(this.showCommercialPlans)
  //   this.showCommercialPlans = !this.showCommercialPlans;

  // }


  addBranch(items: any, showMenu?:BussinesPlans[]): MenuItem[] {
    let list: MenuItem[] = [];
    for (let itempush of items) {
      let label1 = itempush.name,
        label: MenuItem = {
          id: itempush.id,
          label: label1,
          icon: 'pi pi-fw',
          expanded: true,
          items: [
            {
              label: 'Planes comerciales',
              icon: 'pi pi-fw',
              items: this.addBussinesPlan(itempush.businessPlans,showMenu),
              disabled: false,
              expanded:true,
              command: (event: any) => {
                this.showCommercialPlans = true;
                if (this.showCommercialPlansTypes)
                  this.showCommercialPlansTypes = false;
              },
            },
          ],
        };
      list.push(label);
      this.indexRiskType += 1;
    }
    return list;
  }

  addBussinesPlan(bussinesPlan?: any,showMenu?:BussinesPlans[]) {
    let list: MenuItem[] = [];
    if(!showMenu){showMenu=[];}
    for (let itempush of bussinesPlan) {
      let label1 = itempush.name,
      label: MenuItem;
      label = {
        id: itempush.code,
        label: label1,
        icon: 'pi pi-fw',
        disabled: this.addBranchCoverage(showMenu,itempush), //cambiar
        expanded: false,
        items: [
          {
            id: '1',
            label: 'coberturas',
            disabled: false,
            command: (event: any) => {
              this.showCommercialPlansTypes = true;
              if (this.showCommercialPlans || this.bussinesPlans)
                this.showCommercialPlans = false;
            }
          },
          {
            id: '2',
            label: 'Planes de servicio',
            icon: 'pi pi-fw',
            command: (event: any) => {
              this.showCommercialPlansTypes = true;
              if (this.showCommercialPlans || this.coverages)
                this.showCommercialPlans = false;
            }
          },
        ],
      };
      list.push(label);
    }
    return list;
  }


  changeViewCommercial() {
    this.showCommercialPlans = !this.showCommercialPlans;
    if (this.showCommercialPlansTypes)
      this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
  }
  changeViewCommercialTypes() {
    this.showCommercialPlansTypes = !this.showCommercialPlansTypes;
    if (this.showCommercialPlans)
      this.showCommercialPlans = !this.showCommercialPlans;
  }

  onAddBranch(showMenu: BussinesPlans[]) {
    let plans: BussinesPlans[]=[];
    let x=showMenu.find(({athrzdOprtn})=>athrzdOprtn);
    if(x!=undefined) {plans.push(x);   this.calledMenu(plans); }
  
  }


  calledMenu(showMenu?: BussinesPlans[]){
    this.items1 = [
      {
        label: 'Datos de la póliza',
        icon: 'pi pi-fw',
        expanded: true,
      },
      {
        label: 'Tipos de riesgo',
        icon: 'pi pi-fw',
        expanded: true,
        disabled: true,
        items: [
          ...this.addBranch(this.productService.getProductObject().riskTypes,showMenu),
        ],
      },
    ];
  }
  addBranchCoverage(showMenu:BussinesPlans[], itempush:any) {
    console.log(itempush.code);
    console.log(showMenu);

    let validate;

    for(let bussines of showMenu){
      validate = (bussines.code===itempush.code);
      const result= bussines.athrzdOprtn?.find(({key})=>key==="MDF");
      const exist= this.showBranch.find(({name})=>name===bussines.name);
      if(result && !exist){
        this.showBranch.push(bussines);
      }
      if(!result && exist){
        const i= this.showBranch.findIndex(({name})=>name===bussines.name);
        this.showBranch.splice(i,1);
      }
    }  
    console.log("Branch: ",this.showBranch, validate, itempush.code );
    if(validate && this.showBranch.length>0 ){ return false;} else { return true;}



}
}