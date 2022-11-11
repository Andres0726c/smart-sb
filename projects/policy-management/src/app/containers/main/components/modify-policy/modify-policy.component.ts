import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO, ResponseErrorDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { ComplementaryData } from 'projects/policy-management/src/app/core/interfaces/product/complementaryData';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
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
@Component({
  selector: 'app-modify-policy',
  templateUrl: './modify-policy.component.html',
  styleUrls: ['./modify-policy.component.scss']
})
export class ModifyPolicyComponent {

  formPolicy: FormGroup;
  policyId?: number;
  dataPolicy?: any=[];
  product: Product = {
    id: 0,
    nmName: '',
    dsDescription: '',
    nmHashCode: 0,
    nmContent: undefined,
  };
  policyIds = Number(this.activatedroute.snapshot.paramMap.get('id'));

  documentsType: Identification[] = [];
  policyData3: ComplementaryData[] | undefined;

  policyData: PolicyData = {
    holderDocument: "string",
    holderName: "string",
    holderTypeDocument:" string;",
    idPolicy:1,
    idProduct:1,
    inceptionDate: "string;",
    policyNumber: "string;",
    policyStatus:" string;",
    productName: "string;"
  }
  policyDataForm: any = new FormArray([]);
  dataRiskValue:any=[];
  isLoading: boolean = false;

  constructor(
    public productService: ProductService,
    public consultPolicyService: ConsultPolicyService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
  
   this.policyData = this.router?.getCurrentNavigation()?.extras?.state?.['policy'] ?  Object?.assign(
        this.router?.getCurrentNavigation()?.extras?.state?.['policy'] ) : ""
    

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
    this.getPolicy(this.policyData.idPolicy);
    this.getPolicyRisk(this.policyData.idPolicy);
  }

  get policyDataControls(): FormArray {
    return this.formPolicy?.get('policyData') as FormArray;
  }

  get riskTypesControls(): FormArray {
    return this.formPolicy?.get('riskData') as FormArray;
  }


  initializeData() {
    this.policyId = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.productService.getProductById(this.policyId).subscribe((res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;

        let policyDt: any = res.body.nmContent?.policyData;
        //console.log(res.body.nmContent?.policyData);
        console.log('policyData', policyDt)

        for (let group of policyDt) {
          let groupFG = this.fb.group({
            id: group.id,
            code: group.code,
            name: group.name,
            fields: this.fb.array([])
          });

          for (let fields of group.fields) {
            for(let valuePoliz of this.dataPolicy) {
              if (fields.code.businessCode === valuePoliz.name) {
                let field = this.fb.group({
                  businessCode : fields.code.businessCode,
                  code: fields.code,
                  dataTypeGui: fields.dataTypeGui,
                  dataTypeName: fields.dataTypeName,
                  dependency: fields.dependency,
                  editable: fields.editable,
                  id: fields.id,
                  initializeRule: fields.initializeRule,
                  label: fields.label,
                  name: fields.name,
                  required: fields.required,
                  validateRule: fields.validateRule,
                  visible: fields.visible,
                  value: valuePoliz.value
                });
                (<FormArray>groupFG.get('fields')).push(field)
              }
            }
          }
          this.policyDataControls.push(groupFG);
        }

        //console.log(res.body.nmContent?.riskTypes);
        // if(res.body.nmContent?.riskTypes){
        //   for (let risk of res.body.nmContent?.riskTypes ){
        //     this.riskTypesControls.push(this.fb.control(risk));
        //   }
        // }

        this.riskTypes(res);
         
      } else {
        this.product = {
          id: 0,
          nmName: '',
          dsDescription: '',
          nmHashCode: 0,
          nmContent: undefined,
        };
        console.log('else');
      }
    });
  }

  riskTypes(data:any){

    for(let risk of data.body.nmContent?.riskTypes) {

      let groupRisk = this.fb.group({
        id: risk.id,
        name:risk.name,
        description:risk.description,
        code:risk.code,
        complementaryData: this.fb.array([])

      })

        for (let dataRisk of risk.complementaryData){
        
        let group = this.fb.group({
          id:dataRisk.id,
          code: dataRisk.code,
          name:dataRisk.name,
          fields:this.fb.array([])
        });
            for(let fields of dataRisk.fields){
                for(let valueRisk of this.dataRiskValue){
                
                    if (fields.code.businessCode === valueRisk.name){
                        let field = this.fb.group({
                          businessCode : fields.code.businessCode,
                          code: fields.code,
                          dataTypeGui:fields.dataTypeGui,
                          dataTypeName:fields.dataTypeName,
                          dependency:fields.dependency,
                          editable:fields.editable,
                          id:fields.id,
                          initializeRule:fields.initializeRule,
                          label:fields.label,
                          name:fields.name,
                          required:fields.required,
                          validateRule:fields.validateRule,
                          visible:fields.visible,
                          value:valueRisk.value
                        });
                      (<FormArray>group.get('fields')).push(field)
                   }
          
               }
            }

        (<FormArray>groupRisk.get('complementaryData')).push(group)  
      }
      this.riskTypesControls.push(groupRisk);
      
    }
 
  }

  getGroupsControls(risk: any) {
    return risk.get('complementaryData') as FormArray;
  }

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  getPolicy(idpolicy: number) {
    this.dataPolicy = [];
    this.productService.findByIdPolicy(idpolicy).subscribe((res) => {
      let policy = res.body
      for (let objKey of Object.keys(policy.propertiesPolicyData)){
        for (let key of Object.keys(policy.propertiesPolicyData[objKey])){
         let obj = {
          name:key,
          value:policy.propertiesPolicyData[objKey][key]
         };
        this.dataPolicy.push(obj);
        }
      }
      this.initializeData();
    });
     
  }

   /**
   *
   * @param id: number, id de la poliza para ser consulta
   
   * Función para ejecutar el ms de obtener los datos de la poliza
    y se mapea la información para obtener el valor de cada elemento
   */

    getPolicyRisk(idpolicy:number){
      this.productService.findByIdPolicy(idpolicy).subscribe((res) => {
        
        let policy = res.body
        for (let objKey of Object.keys(policy.riskPropertiesPolicyData)){
          let nameRiks=policy.riskPropertiesPolicyData[objKey];
          for (let key of Object.keys(nameRiks)){
           if(this.isObject(nameRiks[key])){
            for (let risk of Object.keys(nameRiks[key])){
              for (let dataRisk of Object.keys(nameRiks[key][risk])){
                 let obj ={
                  name:dataRisk,
                  value:nameRiks[key][risk][dataRisk]
                  }
                  const index = this.dataRiskValue.findIndex((x: { name: any; }) => x.name === obj.name);
                  if (index === -1) {
                    this.dataRiskValue.push(obj);
                  }
                 
              }
            }
          }
          }
        }
       
       });
       
    }
     /**
   *
   * @param obj, objeto a validar
   
   * Función para ejecutar validar si es objeto
   */

    public isObject(obj: any) {
      return obj !== undefined && obj !== null && obj.constructor == Object;
    }

  saveModification() {
    console.log('formPolicy',this.formPolicy);
    // if (this.formPolicy?.valid) {
    //   console.log(this.formPolicy.value);
    // } else {
    //   this.formPolicy?.markAllAsTouched();
    // }
  }

}
