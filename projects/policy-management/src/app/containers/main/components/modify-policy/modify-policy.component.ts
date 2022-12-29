import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseDTO, ResponseErrorDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { ComplementaryData } from 'projects/policy-management/src/app/core/interfaces/product/complementaryData';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { ModalResponseRulesComponent } from 'projects/policy-management/src/app/shared/components/modal-response-rules/modal-response-rules.component';
import { lastValueFrom } from 'rxjs';
import { resourceLimits } from 'worker_threads';
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
  styleUrls: ['./modify-policy.component.scss'],
  providers: [ConfirmationService, DynamicDialogRef, DialogService, MessageService]
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
  list: any[] = [];
  listAux: any = [];
  documentsType: Identification[] = [];
  policyData3: ComplementaryData[] | undefined;
  policyDataForm: any = new FormArray([]);
  dataRiskValue: any = [];

  isLoading: boolean = false;
  errorFlag: boolean = false;

  policy: any;
  policyAux: any;
  policyData: any;
  policyDataPreview: any;
  riskData: any;
  riskDataPreview: any;
  isNextDisabled = true;
  result: any=true;
  validRule: boolean = true;
  isSaving = false;
  state: any = [];
  url: any = "";
  types: any = [];
  optionsAux: any = [];
  constructor(
    private confirmationService: ConfirmationService,
    public productService: ProductService,
    public ref: DynamicDialogRef,
    public consultPolicyService: ConsultPolicyService,
    private activatedroute: ActivatedRoute,
    public dialogService: DialogService,
    public messageService: MessageService,
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
      policyDataPreview: this.fb.array([]),
      policyData: this.fb.array([]),
      riskData: this.fb.array([]),
      riskDataPreview: this.fb.array([]),
    });

    this.productService.findPolicyDataById(this.policyData.policyNumber, 17).subscribe((res: any) => {
      this.policyAux = res.body;
    });
  }

  ngOnInit(): void {

    this.getPolicy();
    this.formPolicy.valueChanges.subscribe((v) => {
      this.result = this.validateSaveButton(this.policyData, this.policyDataControls, this.riskData, this.riskTypesControls);
      if(!this.result && this.riskTypesControls.status == 'VALID' && this.policyDataControls.status == 'VALID' )
      { this.isNextDisabled = false }else{this.isNextDisabled = true} ;
    });


  }


  validateSaveButton(policyData: any, policyDataControls: any, riskData: any, riskTypesControls: any) {
    let flag:any=true;
    for (let i = 0; i < policyDataControls.value.length; i++) {
      flag= this.activeButtonPol(policyData,policyDataControls,i);
      if (!flag) { return flag; }
    }
    flag? flag = this.validateSaveButtonRisk(riskData, riskTypesControls) : flag = false;
    return flag;
  }
  activeButtonPol(policyData: any, policyDataControls: any, i:any){
    let flag:any=true;
    for (let data of policyData) {
      for (let policy of policyDataControls.value[i].fields) {
        if (policy.businessCode == data.name) {
          flag = this.validateGui(policy.dataType.guiComponent, policy, data);
          if (!flag) { return flag; }
        }
      }
    }
    return flag;
  }
  activeButtonRisk(riskData1: any,riskTypesControls:any, j:any, i:any){
    let flag:any=true;
    for (let riskData of riskData1) {
      for (let risk of riskTypesControls.value[j].rskTypDtGrp[i].fields) {
        if (risk.businessCode == riskData.name) {
          flag = this.validateGui(risk.dataType.guiComponent, risk, riskData)
          if (!flag) { return flag; }
        }
      }
    }
    return flag;
  }
  validateSaveButtonRisk(riskData1: any, riskTypesControls: any) {
    let flag:any=true;
    for (let j = 0; j < riskTypesControls.value.length; j++) {
      for (let i = 0; i < riskTypesControls.value[j].rskTypDtGrp.length; i++) {
        flag= this.activeButtonRisk(riskData1,riskTypesControls,j,i);
        if (!flag) { return flag; }
      }
    }
    return flag;
  }
  validateGui(guiComponent: any, policy: any, data: any) {
    let flag:any=false;
    if (guiComponent == 'List box' && policy.value.id != undefined) {
      if (policy.value.id === data.value ) { flag=true; }
    }
    if (guiComponent == 'List box' && policy.value.id == undefined) {
      if ( policy.value=== data.value ) { flag=true; }
    }
    if (guiComponent == 'Calendar') {
      let dateObject = new Date(data.value);
      if (policy.value.toString().slice(0, -46) === dateObject.toString().slice(0, -46) ) { flag=true; }
    }
    if (guiComponent == 'Text box') {
      if ( policy.value=== data.value ) { flag=true; }
    }
    return flag;
  }


  get policyDataControls(): FormArray {
    return this.formPolicy?.get('policyData') as FormArray;
  }

  get policyDataPreviewControls(): FormArray {
    return this.formPolicy?.get('policyDataPreview') as FormArray;
  }

  get riskTypesPreviewControls(): FormArray {
    return this.formPolicy?.get('riskDataPreview') as FormArray;
  }

  get riskTypesControls(): FormArray {
    return this.formPolicy?.get('riskData') as FormArray;
  }



  getPolicy() {
    this.isLoading = true;

    this.productService.findPolicyDataById(this.policyData.policyNumber, 17).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.policy = res.body;
        this.policyDataPreview = this.mapData(this.policy?.plcy.plcyDtGrp);
        this.policyData = this.mapData(this.policy?.plcy.plcyDtGrp);
        this.riskData = this.mapData(this.policy?.plcy.rsk['1'].rskDtGrp);
        this.riskDataPreview = this.mapData(this.policy?.plcy.rsk['1'].rskDtGrp);

        this.getProduct(this.policy.prdct);
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

  getProduct(code: string) {
    this.productService.getProductByCode(code).subscribe(async (res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;


        this.formPolicy.setControl('policyDataPreview', await this.fillGroupData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.plcyDtGrp, this.policyDataPreview));

        this.formPolicy.setControl('riskDataPreview', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.rskTyp, false));

        this.formPolicy.setControl('policyData',
          await this.fillGroupData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.plcyDtGrp, this.policyData));
        this.formPolicy.setControl('riskData', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.rskTyp, true));//this.product.nmContent?.riskTypes


        this.isLoading = false;

      }
    });
  }

  async fillRiskData(riskTypes: any, flag: boolean) {
    let risksArrayData: any = this.fb.array([]);


    if (!flag) {

      let groupRisk = this.fb.group({
        id: riskTypes.code,
        name: riskTypes.name,
        description: riskTypes.description,
        code: riskTypes.code,
        rskTypDtGrp: await this.fillGroupData(riskTypes.rskTypDtGrp, this.riskDataPreview)
      });

      (<FormArray>risksArrayData).push(groupRisk);

    } else {

      for (let risk of riskTypes) {
        let groupRisk = this.fb.group({
          id: risk.code,
          name: risk.name,
          description: risk.description,
          code: risk.code,
          rskTypDtGrp: await this.fillGroupData(risk.rskTypDtGrp, this.riskData)
        });

        (<FormArray>risksArrayData).push(groupRisk);
      }
    }
    return risksArrayData;
  }

  async fillGroupData(groupsArray: any, arrayData: any) {
    let formArrayData: any = this.fb.array([]);
    for (let group of groupsArray) {
      let groupFG = this.fb.group({
        id: group.code,
        code: group.code,
        name: group.name,
        fields: this.fb.array([])
      });

      for (let field of group.fields) {
        let valueObj: any;
        valueObj = arrayData.find((x: any) => x.name === field.code.businessCode);

        if (valueObj) {
          (<FormArray>groupFG.get('fields')).push(this.addValue(field, valueObj));
        }
      }
      (<FormArray>formArrayData).push(groupFG);
    }

    return formArrayData;
  }
  addValue(field:any,valueObj:any ){

    let fieldFG = this.fb.group({});


    Object.keys(field).forEach(key => {
      fieldFG.addControl(key, this.fb.control(field[key]));

    });

    fieldFG.addControl('value', this.fb.control(field.dataType.guiComponent === 'Calendar' ? new Date(valueObj.value) : valueObj.value, [Validators.required]));

    if (field.dataType.guiComponent === 'List box') {
      let options: any = [], domainList = field.domainList.valueList;
      field.domainList ? options = this.showDomainList(domainList, valueObj) : options = [{ id: valueObj.value, name: valueObj.value }];
      fieldFG.addControl('options', this.fb.control(options));
    }
    return fieldFG;
  }
  showDomainList(domainList: any[], valueObj: any) {
    let list: any = [], options = [];
    if (domainList[0].url) {
      let url = domainList[0].url.slice(11), type = url.slice(0, url.slice(0, -1).search('/'));
      this.types.push(type);
      list = localStorage.getItem(type);
      list = JSON.parse(list);
      options = this.validateList(list, valueObj);
    } else {
      options = this.orderData(domainList);
      options = this.validateList(options, valueObj);
    }
    return options;
  }

  validateList(list: any, valueObj: any) {
    let listAux: any = [], x = list.find((result: { id: any; }) => result.id == valueObj.value);
    listAux = list;
    listAux.splice(listAux.indexOf(x), 1);
    listAux.splice(0, 0, x);
    return listAux;
  }
  orderData(domainList: any, dataList?: any) {
    let options: any = [];
    domainList.forEach((element: any) => {
      let obj: any = { id: element.code, name: element.description }
      if (obj.id != '' || obj != undefined) {
        options.push(obj);
      }
    });

    return options;
  }


  getGroupsControls(risk: any) {
    return risk.get('rskTypDtGrp') as FormArray;
  }

  getFieldsControls(group: any) {
    group.disable();
    return group.get('fields') as FormArray;
  }


  addControls(value: FormArray) {
    return value.setValidators([Validators.required]);

  }

  getControlValue(dataControlsValue: any, businessCode: string, level: string) {
    let value = null;

    for (let group of dataControlsValue) {


      const valueField = group.fields.find((x: any) => x.code.businessCode === businessCode);

      if (valueField) {
        value = !this.isObject(valueField.value) ? valueField.value : valueField.value.id;
        break;
      } else if (!valueField || valueField === undefined) {

        try {
          value = level === 'policy' ?
            this.policyAux.plcy.plcyDtGrp![group.code]![businessCode] : this.policyAux.plcy.rsk['1'].rskDtGrp[group.code][businessCode];

        } catch {

        }

      }
    }

    return value;

  }



  reverseMap(dataControls: any, groupData: any, level: string) {

    for (let objKey of Object.keys(groupData)) {

      for (let key of Object.keys(groupData[objKey])) {
        groupData[objKey][key] = this.getControlValue(dataControls.value, key, level);
      }
    }
  }

  transformData(flag: any) {

    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp, "policy");
    for (let risk of this.riskTypesControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp, "risk");
    }
    if (flag)

      this.savePolicyModify();

  }

  saveModification() {

    this.confirmationService.confirm({
      message: `
        <div class="flex justify-center pt-5 pb-3">
            <img src="smartcore-commons/assets/styles/material-theme/icons/picto-alert.svg" alt="icon-warning">
        </div>
        <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl">
          <p class="w-full text-center">
            Está seguro de realizar esta la modificación?
          </p>
        </div>
      `,
      header: 'Confirmación',
      accept: () => {
        this.transformData(true);
      }
    });


  }

  savePolicyModify() {
    this.isSaving = true

    this.productService.saveModify(this.policy)
      .subscribe((resp: any) => {

        if (resp.dataHeader.code != 500) {
          this.showSuccess('success', 'Modificación exitosa', 'La póliza ha sido modificada');
        } else {
          this.showSuccess('error', 'Error al renovar', resp.dataHeader.status);
        }
        this.isSaving = false;
      }
      );


  }


  cancelModification() {
    this.router.navigate(
      [`/polizas/consulta`],
    );
    for (let type of this.types) {
      localStorage.removeItem(type)
    }

  }

  public isObject(obj: any) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }

  validRules(flag: boolean) {
    this.validRule = flag ? true : false;
  }

  showSuccess(status: string, title: string, msg: string) {

    this.messageService.add({
      severity: status,
      summary: title,
      detail: msg
    });
  }


}
