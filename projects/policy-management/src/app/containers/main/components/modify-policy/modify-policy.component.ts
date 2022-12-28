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
  result: any;
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
  }

  ngOnInit(): void {

    this.getPolicy();
    this.formPolicy.valueChanges.subscribe((v) => {
      this.result = this.validateSaveButton(this.policyData, this.policyDataControls, this.riskData, this.riskTypesControls);
      if (this.result == false && this.riskTypesControls.status == 'VALID' && this.policyDataControls.status == 'VALID') {
        this.isNextDisabled = false;
      } else {
        this.isNextDisabled = true;
      }
    });


  }


  validateSaveButton(policyData: any, policyDataControls: any, riskData: any, riskTypesControls: any) {
    let flag;
    for (let i = 0; i < policyDataControls.value.length; i++) {
      for (let data of policyData) {
        for (let policy of policyDataControls.value[i].fields) {
          if (policy.businessCode == data.name) {
            flag = this.validateGui(policy.dataType.guiComponent, policy, data);
            if (flag == false) { return flag; }
          }
        }
      }
    }
    flag == true ? flag = this.validateSaveButtonRisk(riskData, riskTypesControls) : flag = false;
    return flag;
  }
  validateSaveButtonRisk(riskData1: any, riskTypesControls: any) {
    let flag;
    for (let j = 0; j < riskTypesControls.value.length; j++) {
      for (let i = 0; i < riskTypesControls.value[j].rskTypDtGrp.length; i++) {
        for (let riskData of riskData1) {
          for (let risk of riskTypesControls.value[j].rskTypDtGrp[i].fields) {
            if (risk.businessCode == riskData.name) {
              flag = this.validateGui(risk.dataType.guiComponent, risk, riskData)
              if (flag == false) { return flag; }
            }
          }
        }
      }
    }
    return flag;
  }
  validateGui(guiComponent: any, policy: any, data: any) {
    let flag;
    if (guiComponent == 'List box' && policy.value.id != undefined) {
      policy.value.id === data.value ? flag = true : flag = false;
    }
    if (guiComponent == 'List box' && policy.value.id == undefined) {
      policy.value === data.value ? flag = true : flag = false;
    }
    if (guiComponent == 'Calendar') {
      let dateObject = new Date(data.value);
      policy.value.toString().slice(0, -46) === dateObject.toString().slice(0, -46) ? flag = true : flag = false;
    }
    if (guiComponent == 'Text box') {
      policy.value === data.value ? flag = true : flag = false;
    }
    if (flag === false) {
      return flag;
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
        this.policyAux = res.body;

        console.log(this.policyAux, "antes");
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
    //console.log(arrayData);
    return arrayData;
  }

  getProduct(code: string) {
    this.productService.getProductByCode(code).subscribe(async (res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;
        //  this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.plcyDtGrp[0].fields.push(
        //   {
        //   businessCode: "PERIODO_FACT",
        //   code: {version: 1, businessCode: 'PERIODO_FACT'},
        //   dataType: {code: 'TDL1', name: 'Text box',guiComponent: "Text box"},
        //   dependency: null,
        //   domainList: null,
        //   id: 69,
        //   label: "PERIODO_FACT",
        //   name: "PERIODO_FACT",
        //   required: false,
        //   validateRule: []
        // } );
        console.log(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.plcyDtGrp);
        this.formPolicy.setControl('policyDataPreview', await this.fillGroupData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.plcyDtGrp, this.policyDataPreview, false));
        console.log(this.formPolicy.get('policyDataPreview'));
        // this.formPolicy.setControl('riskData', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.rskTyp,true));
        this.formPolicy.setControl('riskDataPreview', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.rskTyp, false));
        console.log(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt);
        //this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.plcyDtGrp
        this.formPolicy.setControl('policyDataPreview', await this.fillGroupData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.plcyDtGrp, this.policyDataPreview, false));
        // this.formPolicy.setControl('riskData', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.rskTyp,true));
        this.formPolicy.setControl('riskDataPreview', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].prvwDt.rskTyp, false));
        this.formPolicy.setControl('policyData',
          await this.fillGroupData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.plcyDtGrp//this.product.nmContent?.policyData
            , this.policyData, true));
        this.formPolicy.setControl('riskData', await this.fillRiskData(this.product.nmContent?.mdfctnPrcss.chngActvtyTyp[0].mdfcblDt.rskTyp, true));//this.product.nmContent?.riskTypes

        // console.log('riskData: ', this.riskTypesControls);
        // console.log('policy: ', this.policyDataControls);
        this.isLoading = false;

      }
    });
  }

  async fillRiskData(riskTypes: any, flag: boolean) {
    let risksArrayData: any = this.fb.array([]);


    if (!flag) {
      console.log('risk', riskTypes.rskTypDtGrp);
      console.log('riskDataPreview', this.riskDataPreview);
      let groupRisk = this.fb.group({
        id: riskTypes.code,
        name: riskTypes.name,
        description: riskTypes.description,
        code: riskTypes.code,
        rskTypDtGrp: await this.fillGroupData(riskTypes.rskTypDtGrp, this.riskDataPreview, true)
      });

      (<FormArray>risksArrayData).push(groupRisk);

    } else {

      for (let risk of riskTypes) {
        let groupRisk = this.fb.group({
          id: risk.code,
          name: risk.name,
          description: risk.description,
          code: risk.code,
          rskTypDtGrp: await this.fillGroupData(risk.rskTypDtGrp, this.riskData, flag)
        });

        (<FormArray>risksArrayData).push(groupRisk);
      }
    }
    console.log(risksArrayData)

    return risksArrayData;
  }

  async fillGroupData(groupsArray: any, arrayData: any, flag: boolean) {
    let formArrayData: any = this.fb.array([]);
    console.log(groupsArray)


    for (let group of groupsArray) {
      let groupFG = this.fb.group({
        id: group.code,
        code: group.code,
        name: group.name,
        fields: this.fb.array([])
      });


      console.log(group)

      for (let field of group.fields) {
        let valueObj: any;

        valueObj = arrayData.find((x: any) => x.name === field.code.businessCode);

        if (valueObj) {
          let fieldFG = this.fb.group({});

          Object.keys(field).forEach(key => {
            fieldFG.addControl(key, this.fb.control(field[key]));

          });

          fieldFG.addControl('value', this.fb.control(field.dataType.guiComponent === 'Calendar' ? new Date(valueObj.value) : valueObj.value, [Validators.required]));

          if (field.dataType.guiComponent === 'List box') {

            if (field.domainList && flag) {
              let list: any = [], options: any = [], domainList = field.domainList.valueList;//JSON.parse(field.domainList.valueList);

              if (domainList[0].url) {
                let url = domainList[0].url.slice(11), type = url.slice(0, url.slice(0, -1).search('/'));
                this.types.push(type);
                console.log(type);
                list = localStorage.getItem(type);
                list = JSON.parse(list);
                options = this.validateList(list, valueObj);
                type == 'state' ? this.state = options.find((result: { id: any; }) => result.id == valueObj.value) : options;
                fieldFG.addControl('options', this.fb.control(options));
              } else {
                options = this.orderData(domainList);
                options = this.validateList(options, valueObj);
                console.log("options: ", options);
                fieldFG.addControl('options', this.fb.control(options));
              }
            } else {
              let options = [{ id: valueObj.value, name: valueObj.value }]
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

  // validateStateList(parameter: string, type: any, listPet?: any) {

  //   let list: any = [], listAux: any = [], options: any = [], optionsAux: any = [];
  //   if (type == "city") {

  //     list = localStorage.getItem(type);
  //     list = JSON.parse(list);

  //     for (let list1 of list) {
  //       listAux.push(list1.id);
  //     }
  //     console.log("state: ", parameter, "list: ", list);

  //     for (let list1 of listAux) {
  //       if (list1.slice(0, 2) == parameter) {
  //         options.push(list1);
  //       }
  //     }

  //     for (let list1 of list) {
  //       for (let list2 of options) {
  //         if (list2 == list1.id) {
  //           optionsAux.push(list1);
  //         }
  //       }
  //     }
  //   }

  //   if (type = "pets" && listPet != undefined) {
  //     for (let list1 of listPet) {
  //       listAux.push(list1.id);
  //     }
  //   }
  //   return optionsAux;
  // }
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
    console.log(options);
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

  getControlValue(dataControlsValue: any, businessCode: string) {
    let value = null;

    console.log(this.policyAux, "policyAux");

    for (let group of dataControlsValue) {

      const valueField = group.fields.find((x: any) => x.code.businessCode === businessCode);
      if (valueField) {
        value = !this.isObject(valueField.value) ? valueField.value : valueField.value.id;
        break;
      } else {

        // value = "Prueba";
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

  transformData(flag: any) {

    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);
    for (let risk of this.riskTypesControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
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
          // this.ref.close(true)
          this.showSuccess('success', 'Modificación exitosa', 'La póliza ha sido modificada');
        } else {
          this.showSuccess('error', 'Error al renovar', resp.dataHeader.status);
        }
        this.isSaving = false;
      },
        // (error) => {
        //   this.messageError = true;
        //   this.showSuccess('error', 'Error al cancelar', error.error.dataHeader.status);
        // }


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

    // this.router.navigate(
    //   [`/polizas/consulta`],
    // );
    // for (let type of this.types) {
    //   localStorage.removeItem(type)
    // }
  }


}
