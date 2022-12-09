import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO, ResponseErrorDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { ComplementaryData } from 'projects/policy-management/src/app/core/interfaces/product/complementaryData';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { lastValueFrom } from 'rxjs';
import { Identification } from '../consult-policy/interfaces/identification';
import { ConsultPolicyService } from '../consult-policy/services/consult-policy.service';

export interface PolicyData {
  holderDocument: string;
  holderName: string;
  holderTypeDocument: string;
  idPolicy: number;
  idProduct: number;
  inceptionDate: string;
  policyNumber: string;
  policyStatus: string;
  productName: string;
}
export interface HolderPolicy {
  name: string;
  label: string;
  dataTypeGui: string;
  dataTypeName: string;
}
export interface DomainList {
  code: string;
  description: string;
}
@Component({
  selector: 'app-modify-policy',
  templateUrl: './modify-policy.component.html',
  styleUrls: ['./modify-policy.component.scss']
})
export class ModifyPolicyComponent {

  formPolicy: FormGroup;
  policyId?: number;
  dataPolicy?: any = [];
  ListForm: any = new FormArray([]);
  product: Product = {
    id: 0,
    nmName: '',
    dsDescription: '',
    nmHashCode: 0,
    nmContent: undefined,
  };
  policyIds = Number(this.activatedroute.snapshot.paramMap.get('id'));
  List: any[] = [];
  options: any = [];
  documentsType: Identification[] = [];
  policyData3: ComplementaryData[] | undefined;

  // policyData: PolicyData = {
  //   holderDocument: "string",
  //   holderName: "string",
  //   holderTypeDocument:" string;",
  //   idPolicy:1,
  //   idProduct:1,
  //   inceptionDate: "string;",
  //   policyNumber: "string;",
  //   policyStatus:" string;",
  //   productName: "string;"
  // }
  policyDataForm: any = new FormArray([]);
  dataRiskValue: any = [];
  isLoading: boolean = false;
  policy: any;
  policyData: any;
  riskData: any;

  constructor(
    public productService: ProductService,
    public consultPolicyService: ConsultPolicyService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {

    this.policyData = this.router?.getCurrentNavigation()?.extras?.state?.['policy'] ? Object?.assign(
      this.router?.getCurrentNavigation()?.extras?.state?.['policy']) : ""


    this.formPolicy = this.fb.group({
      basicData: this.fb.group({
        productField: this.fb.control(this.policyData?.productName, [
          Validators.required,
          Validators.pattern(/^[A-zÀ-ú\s]*$/),
        ]),
        policyNumber: this.fb.control(this.policyData?.policyNumber),
        startDate: this.fb.control('', Validators.required),
        idProduct: this.fb.control('', Validators.required),
        payValue: this.fb.control('', Validators.required),
      }),
      policyData: this.fb.array([]),
      riskData: this.fb.array([]),
    });

    consultPolicyService.getDocumentType().subscribe((data) => {
      this.documentsType = data;
    });
  }

  ngOnInit(): void {
    // this.getPolicy(this.policyData.idPolicy);
    // this.getPolicyRisk(this.policyData.idPolicy);
    this.getPolicy();
  }

  get policyDataControls(): FormArray {
    return this.formPolicy?.get('policyData') as FormArray;
  }

  get riskTypesControls(): FormArray {
    return this.formPolicy?.get('riskData') as FormArray;
  }



  getPolicy() {
    this.isLoading = true;

    this.productService.findByIdPolicy(this.policyData.idPolicy).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.policy = res.body;
        this.policyData = this.mapData(this.policy.propertiesPolicyData);
        this.riskData = this.mapData(this.policy.riskPropertiesPolicyData[0].policyriskdata);
        this.getProduct(this.policy.idProduct);
      }
    });
  }

  mapData(groupData: any) {
    let arrayData: any[] = [];

    for (let objKey of Object.keys(groupData)) {
      for (let key of Object.keys(groupData[objKey])) {
        let obj = {
          name: key,
          value: groupData[objKey][key]
        };
        arrayData.push(obj);
      }
    }
    return arrayData;
  }

  getProduct(idProduct: number) {
    this.productService.getProductById(idProduct).subscribe((res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;
        console.log(this.product);
        this.formPolicy.setControl('policyData', this.fillGroupData(this.product.nmContent?.policyData, this.policyData));
        this.formPolicy.setControl('riskData', this.fillRiskData(this.product.nmContent?.riskTypes));

        console.log('riskData: ', this.riskTypesControls);
        console.log('policy: ', this.policyDataControls);
        this.isLoading = false;
      }
    });
  }

  fillRiskData(riskTypes: any) {
    let risksArrayData: any = this.fb.array([]);

    for (let risk of riskTypes) {
      let groupRisk = this.fb.group({
        id: risk.id,
        name: risk.name,
        description: risk.description,
        code: risk.code,
        complementaryData: this.fillGroupData(risk.complementaryData, this.riskData)
      });

      (<FormArray>risksArrayData).push(groupRisk);
    }

    return risksArrayData;
  }

  fillGroupData(groupsArray: any, arrayData: any) {
    let formArrayData: any = this.fb.array([]);

    for (let group of groupsArray) {
      let groupFG = this.fb.group({
        id: group.id,
        code: group.code,
        name: group.name,
        fields: this.fb.array([])
      });



      for (let field of group.fields) {
        let valueObj = arrayData.find((x: any) => x.name === field.code.businessCode);

        if (valueObj) {
          let fieldFG = this.fb.group({});

          Object.keys(field).forEach(key => {

            fieldFG.addControl(key, this.fb.control(field[key]));

          });

          fieldFG.addControl('value', this.fb.control(field.dataType.guiComponent === 'Calendar' ? new Date(valueObj.value) : valueObj.value, [Validators.required]));

          if (field.dataType.guiComponent === 'List box') {
            if (field.domainList) {
              let domainList = JSON.parse(field.domainList.valueList);
              if (domainList[0].url) {
                const url = domainList[0].url.slice(11)
                this.loadData(url, domainList[0].rlEngnCd);
                //this.options.push();
                fieldFG.addControl('options', this.fb.control(this.options));
                //console.log("if: ",this.List);
                //let findTest=options.find(element => element.id === valueObj.value);
                console.log(this.options);
                // console.log(findTest);
              }else{
              let options = [{ id: valueObj.value, name: valueObj.value }]
              console.log("else: ", options)
              fieldFG.addControl('options', this.fb.control(options));
              }
            } else {
              let options = [{ id: valueObj.value, name: valueObj.value }]
              console.log("else: ", options)
              fieldFG.addControl('options', this.fb.control(options));
            }
          }
          (<FormArray>groupFG.get('fields')).push(fieldFG);

        }
      }
      (<FormArray>formArrayData).push(groupFG);
    }

    return formArrayData;
  }


  loadData(url: string, rlEngnCd: string, parameters?: string) {
    try {
      let res: any;


      if (url.slice(-1) != '/') {
        res = lastValueFrom(this.productService.getApiData(url, rlEngnCd));

      } else {
        res = lastValueFrom(this.productService.getApiData(url, rlEngnCd, parameters));
      }

      if (res.body) {
        this.setData(res);
      }

    } catch (error) {

      console.log('Hubo un error:', error);
    }
  }
  setData(res: any) {
    if (Array.isArray(res.body)) {
      this.addToElementData(res.body);
    } else {
      this.addToElementData([res.body]);
    }
  }

  addToElementData(res: any[]) {

    res.forEach((element: any) => {
      let obj: any = { id: element.code, name: element.code };
      if (obj.id != '' && obj.id != undefined) {
        this.options.push(obj);
      }
    });
    console.log("forEach: ", this.options)
  }

  // selectRow(row: ElementTableSearch) {
  //   this.aditionalData = [];
  //   this.fields.clear();
  //   (<FormArray>this.ParametersForm.get('parameters')).clear();
  //   this.ruleSelection.select(this.getDatasourceRow(row));
  //   this.ParametersForm.get('rule')?.setValue(this.ruleSelection.selected[0]);

  //   let map = this.ParametersForm.get('rule')?.value.nmParameterList;
  //   let Jsonmap: any;
  //   try {
  //     if (map){
  //        Jsonmap = JSON.parse(map);
  //        this.stepParameters = this.returnObj(Jsonmap);
  //        this.EmptyData=false;
  //     }
  //     else{
  //     this.EmptyData=true;
  //     this.stepParameters=[];

  //   }
  //   } catch {
  //     this.stepParameters = this.returnObj({});
  //   }

  //   for(let x = 0; x < this.data.complementaryData.length; x++){
  //     this.aditionalData.push(this.data.complementaryData.value[x].fields);
  //   }

  //   for ( let rule of this.stepParameters) {
  //      let ObjForm = this.fb.group({
  //        name: this.fb.control(rule.name),
  //        value: this.fb.control('')
  //      });

  //      (<FormArray>this.ParametersForm.get('parameters'))?.push(ObjForm);
  //    }
  // }


  getGroupsControls(risk: any) {
    return risk.get('complementaryData') as FormArray;
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }


  addControls(value: FormArray) {
    return value.setValidators([Validators.required]);

  }

  getControlValue(dataControlsValue: any, businessCode: string) {
    let value = null;

    for (let group of dataControlsValue) {
      const valueField = group.fields.find((x: any) => x.code.businessCode === businessCode);
      if (valueField) {
        value = valueField.value;
        break;
      }
    }

    return value;
  }

  reverseMap(dataControls: any, groupData: any) {
    for (let objKey of Object.keys(groupData)) {
      for (let key of Object.keys(groupData[objKey])) {
        groupData[objKey][key] = this.getControlValue(dataControls.value, key);
      }
    }
  }

  transformData() {
    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);

    for (let risk of this.riskTypesControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
    }

    console.log('result', this.policy);

  }



  // initializeData() {
  //   this.policyId = Number(this.activatedroute.snapshot.paramMap.get('id'));
  //   this.productService.getProductById(this.policyId).subscribe((res: ResponseDTO<Product>) => {
  //     if (res.dataHeader.code && res.dataHeader.code == 200) {
  //       this.product = res.body;

  //       let policyDt: any = res.body.nmContent?.policyData;
  //       //console.log(res.body.nmContent?.policyData);


  //       for (let group of policyDt) {
  //         let groupFG = this.fb.group({
  //           id: group.id,
  //           code: group.code,
  //           name: group.name,
  //           fields: this.fb.array([])
  //         });

  //         for (let fields of group.fields) {
  //           for(let valuePoliz of this.dataPolicy) {
  //             if (fields.code.businessCode === valuePoliz.name) {
  //               let field = this.fb.group({
  //                 businessCode : fields.code.businessCode,
  //                 code: fields.code,
  //                 dataTypeGui: fields.dataTypeGui,
  //                 dataTypeName: fields.dataTypeName,
  //                 dependency: fields.dependency,
  //                 editable: fields.editable,
  //                 id: fields.id,
  //                 initializeRule: fields.initializeRule,
  //                 label: fields.label,
  //                 name: fields.name,
  //                 required: fields.required,
  //                 validateRule: fields.validateRule,
  //                 visible: fields.visible,
  //                 value: fields.dataTypeName === 'date' ? new Date(valuePoliz.value) : valuePoliz.value,
  //                 options:fields.dataTypeGui === 'List box' ? [{ id: valuePoliz.value, name: valuePoliz.value }]:[]
  //               });
  //               // if (fields.dataTypeGui === 'List box') {
  //               //   let options = [{ id: valuePoliz.value, name: valuePoliz.value }]
  //               //   field.addControl('options', this.fb.control(options));
  //               // }
  //               (<FormArray>groupFG.get('fields')).push(field)
  //             }
  //           }
  //         }
  //         this.policyDataControls.push(groupFG);
  //       }

  //       //console.log(res.body.nmContent?.riskTypes);
  //       // if(res.body.nmContent?.riskTypes){
  //       //   for (let risk of res.body.nmContent?.riskTypes ){
  //       //     this.riskTypesControls.push(this.fb.control(risk));
  //       //   }
  //       // }

  //       this.riskTypes(res);

  //     } else {
  //       this.product = {
  //         id: 0,
  //         nmName: '',
  //         dsDescription: '',
  //         nmHashCode: 0,
  //         nmContent: undefined,
  //       };
  //       console.log('else');
  //     }
  //   });
  // }

  // riskTypes(data:any){

  //   for(let risk of data.body.nmContent?.riskTypes) {

  //     let groupRisk = this.fb.group({
  //       id: risk.id,
  //       name:risk.name,
  //       description:risk.description,
  //       code:risk.code,
  //       complementaryData: this.fb.array([])

  //     })

  //       for (let dataRisk of risk.complementaryData){

  //       let group = this.fb.group({
  //         id:dataRisk.id,
  //         code: dataRisk.code,
  //         name:dataRisk.name,
  //         fields:this.fb.array([])
  //       });
  //           for(let fields of dataRisk.fields){
  //               for(let valueRisk of this.dataRiskValue){

  //                   if (fields.code.businessCode === valueRisk.name){
  //                       let field = this.fb.group({
  //                         businessCode : fields.code.businessCode,
  //                         code: fields.code,
  //                         dataTypeGui:fields.dataTypeGui,
  //                         dataTypeName:fields.dataTypeName,
  //                         dependency:fields.dependency,
  //                         editable:fields.editable,
  //                         id:fields.id,
  //                         initializeRule:fields.initializeRule,
  //                         label:fields.label,
  //                         name:fields.name,
  //                         required:fields.required,
  //                         validateRule:fields.validateRule,
  //                         visible:fields.visible,
  //                         value:fields.dataTypeName === 'date' ? new Date(valueRisk.value) : valueRisk.value,
  //                         options:fields.dataTypeGui === 'List box' ? [{ id: valueRisk.value, name: valueRisk.value }]:[]
  //                       });
  //                       // if (fields.dataTypeGui === 'List box') {
  //                       //   let options = [{ id: valueRisk.value, name: valueRisk.value }]
  //                       //   field.addControl('options', this.fb.control(options));
  //                       // }
  //                     (<FormArray>group.get('fields')).push(field)
  //                  }

  //              }
  //           }

  //       (<FormArray>groupRisk.get('complementaryData')).push(group)
  //     }
  //     this.riskTypesControls.push(groupRisk);

  //   }

  // }



  // getPolicys(idpolicy: number) {
  //   this.dataPolicy = [];
  //   this.productService.findByIdPolicy(idpolicy).subscribe((res) => {
  //     let policy = res.body
  //     for (let objKey of Object.keys(policy.propertiesPolicyData)){
  //       for (let key of Object.keys(policy.propertiesPolicyData[objKey])){
  //        let obj = {
  //         name:key,
  //         value:policy.propertiesPolicyData[objKey][key]
  //        };
  //       this.dataPolicy.push(obj);
  //       }
  //     }
  //     this.initializeData();
  //   });

  // }

  //  /**
  //  *
  //  * @param id: number, id de la poliza para ser consulta

  //  * Función para ejecutar el ms de obtener los datos de la poliza
  //   y se mapea la información para obtener el valor de cada elemento
  //  */

  //   getPolicyRisk(idpolicy:number){
  //     this.productService.findByIdPolicy(idpolicy).subscribe((res) => {

  //       let policy = res.body
  //       for (let objKey of Object.keys(policy.riskPropertiesPolicyData)){
  //         let nameRiks=policy.riskPropertiesPolicyData[objKey];
  //         for (let key of Object.keys(nameRiks)){
  //          if(this.isObject(nameRiks[key])){
  //           for (let risk of Object.keys(nameRiks[key])){
  //             for (let dataRisk of Object.keys(nameRiks[key][risk])){
  //                let obj ={
  //                 name:dataRisk,
  //                 value:nameRiks[key][risk][dataRisk]
  //                 }
  //                 const index = this.dataRiskValue.findIndex((x: { name: any; }) => x.name === obj.name);
  //                 if (index === -1) {
  //                   this.dataRiskValue.push(obj);
  //                 }

  //             }
  //           }
  //         }
  //         }
  //       }

  //      });

  //   }
  //    /**
  //  *
  //  * @param obj, objeto a validar

  //  * Función para ejecutar validar si es objeto
  //  */

  //   public isObject(obj: any) {
  //     return obj !== undefined && obj !== null && obj.constructor == Object;
  //   }

  saveModification() {
    console.log('formPolicy', this.formPolicy);
    // if (this.formPolicy?.valid) {
    //   console.log(this.formPolicy.value);
    // } else {
    //   this.formPolicy?.markAllAsTouched();
    // }
  }

  cancelModification() {
    this.router.navigate(
      [`/polizas/consulta`],
    );
  }

}
