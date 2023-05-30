import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';
import { ModalPolicyActionsService } from 'projects/policy-management/src/app/shared/components/modal-policy-actions/services/modal-policy-actions.service';

@Component({
  selector: 'refactoring-smartcore-mf-policy-renewal',
  templateUrl: './policy-renewal.component.html',
  styleUrls: ['./policy-renewal.component.scss'],
  providers: [ConfirmationService]
})
export class PolicyRenewalComponent implements OnInit {
  id: number = 0;
  externalNumber: number = 0;
  policy: any;
  policyData: any;
  riskData: any;
  product: any

  productDeps: any = [];
  renewalProcess: any;

  formPolicy: FormGroup;
  isLoading: boolean = false;
  errorFlag: boolean = false;
  errorMsg: string = '';

  readOnly = true;
  isSaving = false;

  causes: any[] = [];

  types: any = [];

  constructor(
    private confirmationService: ConfirmationService,
    public router: Router,
    public modalAPService: ModalPolicyActionsService,
    private activatedroute: ActivatedRoute,
    public fb: FormBuilder,
    public messageService: MessageService,
    public productService: ProductService,
  ) {
    this.formPolicy = this.fb.group({
      policyData: this.fb.array([]),
      riskData: this.fb.array([]),
      causeType: this.fb.control('', [Validators.required]),
      observation: this.fb.control('', [Validators.maxLength(200)]),
    });
  }

  /**
   * Method to initalize component
   */
  ngOnInit(): void {
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'));
    this.getCauses('Renovación');
    this.getPolicy(this.id);
  }

  /**
   * Method that returns controls from policyData array
   */
  get policyDataControls() {
    return this.formPolicy.get('policyData') as FormArray;
  }

  /**
   * Method that returns controls from riskData array
   */
  get riskDataControls() {
    return this.formPolicy.get('riskData') as FormArray;
  }

  /**
   * Method that returns complementary data controls for a risk
   * @param risk risk to search data
   * @returns complementary data controls for a risk
   */
  getGroupsControls(risk: any) {
    return risk.get('complementaryData') as FormArray;
  }

  /**
   * Method that returns causes by process from a microservice
   * @param applicationProcess application process name
   */
  getCauses(applicationProcess: string) {
    this.modalAPService.getCauses(applicationProcess).subscribe({
      next: causes => {
        this.causes = causes.body;
      },
      error: () => {
        console.error('Error interno');
      }
    });
  }

  showInternalError() {
    this.isLoading = false; 
    this.errorFlag = true;
    this.errorMsg = 'Error interno, por favor intente nuevamente';
  }

  /**
   * Method that returns policy data for active endorsement
   * @param policyNumber policy number
   */
  getPolicy(policyNumber: number) {
    this.isLoading = true;
    this.productService.findPolicyDataById(policyNumber, 17).subscribe({
      next: (res: any) => {
        if (res.dataHeader.code && res.dataHeader.code == 200) {
          this.policy = res.body;
          const expirationDate = this.policy.plcy.plcyDtGrp.datos_basicos['FEC_FIN_VIG_POL'];
          this.externalNumber = this.policy.extrnlTrnsctnPlcy.plcyNmbr;
          if (this.policy.plcy.stts === 'POL_ACT') {
            this.getPolicyLastEndorsement(policyNumber, expirationDate);
          } else {
            this.errorFlag = true;
            this.errorMsg = 'La póliza se encuentra inactiva';
          }
        } else {
          this.showInternalError();
        }
        this.isLoading = false;
      },
      error: () => {
        this.showInternalError();
      }
    });
  }

  /**
   * Method that returns policy data for last endorsement
   * @param policyNumber policy number
   * @param expirationDate policy expiration date for active endorsement
   */
  getPolicyLastEndorsement(policyNumber: number, expirationDate: string) {
    this.productService.findPolicyDataById(policyNumber, 0).subscribe({
      next: (res: any) => {
        if (res.dataHeader.code && res.dataHeader.code == 200) {
          const policy = res.body;
          if (new Date(policy.plcy.plcyDtGrp.datos_basicos['FEC_FIN_VIG_POL']) > new Date(expirationDate)) {
            this.errorFlag = true;
            this.errorMsg = 'La póliza tiene un endoso pendiente de aplicación'
          } else {
            this.policyData = this.mapData(policy.plcy.plcyDtGrp);
            this.riskData = this.mapData(policy.plcy.rsk['1'].rskDtGrp);
            this.getProduct(policy.prdct);
          }
        } else {
          this.showInternalError();
        }
        this.isLoading = false;
      },
      error: () => {
        this.showInternalError();
      }
    });
  }

  /**
   * Method for convert group data to ({name: , value:}) type
   * @param groupData group from policy data
   * @returns converted object
   */
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

  /**
   * Method for get product by business code
   * @param code product business code
   */
  getProduct(code: string) {
    this.productService.getProductByCode(code).subscribe((res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;
        this.productDeps = this.product.nmDefinition.prdctDpndncy;
        this.formPolicy.setControl('policyData', this.fillGroupData(this.product.nmDefinition?.prdct.issPrcss.plcyDtGrp, this.policyData));
        this.formPolicy.setControl('riskData', this.fillRiskData(this.product.nmDefinition?.prdct.issPrcss.rskTyp));
        this.renewalProcess = this.product.nmDefinition?.prdct.rnwlPrcss;
        /* Filtramos las causas con respecto a la parametrización del producto */
        this.causes = this.renewalProcess?.rnwlCsCd.length > 0 ? this.causes.filter((cause: any) => this.renewalProcess.rnwlCsCd.every((csCd: string) => csCd === cause.businessCode)) : [];
        /* Fin del filtro de causas */
        this.isLoading = false;
      }
    });
  }

  /**
   * Method that returns a formArray with risk data to draw in the screen
   * @param riskTypes risk types from policy data
   * @returns risk data formArray
   */
  fillRiskData(riskTypes: any) {
    let risksArrayData: any = this.fb.array([]);

    for (let risk of riskTypes) {
      const riskDep = this.productService.findDependencyByKeyCode(this.productDeps, 'rskTyp', risk.rskTypCd);

      let groupRisk = this.fb.group({
        nm: riskDep.nm,
        dscrptn: riskDep.dscrptn,
        cd: riskDep.cd,
        complementaryData: this.fillGroupData(risk.rskTypDtGrp, this.riskData)
      });

      (<FormArray>risksArrayData).push(groupRisk);
    }

    return risksArrayData;
  }

  /**
   * Method that returns a formArray with group data to draw in the screen
   * @param groupsArray groups from policy data
   * @param arrayData array with the values for each field
   * @returns group data array
   */
  fillGroupData(groupsArray: any, arrayData: any) {
    let formArrayData: any = this.fb.array([]);

    for (let group of groupsArray) {
      let groupFG = this.fb.group({
        code: group.dtGrpCd,
        name: group.dtGrpNm,
        fields: this.fb.array([])
      });

      for (let field of group.fld) {
        let valueObj = arrayData.find((x: any) => x.name === field.dtCd);

        if (valueObj) {
          (<FormArray>groupFG.get('fields')).push(this.getFieldControls(field, valueObj));
        }
      }
      (<FormArray>formArrayData).push(groupFG);
    }

    return formArrayData;
  }

  /**
   * Method that returns a field data formGroup with all required properties to draw in screen
   * @param field field data
   * @param value value for field
   * @returns field data formGroup
   */
  getFieldControls(field: any, value: any) {
    let fieldFG = this.fb.group({});

    /* buscamos la dependencia del campo */
    field.dt = this.productService.findDependencyByKeyCode(this.productDeps, 'dt', field.dtCd);
    
    /* */

    /* buscamos la dependencia de datatype y la insertamos en el campo */
    field.dt.dtTyp = this.productService.findDependencyByKeyCode(this.productDeps, 'dtTyp', field.dt.dtTypCd);
    /* */

    /* buscamos la dependencia de domainList y la insertamos en el campo */
    field.dt.dmnLst = this.productService.findDependencyByKeyCode(this.productDeps, 'dmnLst', field.dt.dmnLstCd);
    /* */

    if (field.dtCd === 'PERIODO_FACT') {
      field.dt.dmnLst = {
        "cd": "LDM_PF",
        "nm": "Periodos de facturación",
        "dscrptn": "Periodos de facturación",
        "vlLst": "[{\"url\": \"/emisor/v1/turnoverperiod/findAll\", \"rlEngnCd\": \"MTR_SMT\"}]"
      };
    }

    Object.keys(field).forEach(key => {
      let keyValue: any = field[key];
      fieldFG.addControl(key, this.fb.control(keyValue));
    });

    fieldFG.addControl('value', this.fb.control({ value: field.dt.dtTyp.guiCmpnntItm === 'Calendar' ? new Date(value.value) : value.value, disabled: this.readOnly ?? !field.editable }));

    if (field.dt.dtTyp.guiCmpnntItm === 'List box') {
      let options: any = [], domainList = field.dt.dmnLst?.vlLst;
      try {
        domainList = JSON.parse(domainList);
      } catch (error) {
        // Se captura error en la conversión
      }
      options = field.dt.dmnLst ? this.showDomainList(domainList, value) : [{ id: value.value, name: value.value }];
      fieldFG.addControl('options', this.fb.control(options));
    }

    return fieldFG;
  }

  /**
   * Method that returns options for a list box type field
   * @param domainList domain list data
   * @param valueObj value for field
   * @returns options for a list box type field
   */
  showDomainList(domainList: any[], valueObj: any) {
    let list: any = [], options: any[] = [];
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

  /**
   * Method that returns a normalize list based on options
   * @param list list of options
   * @param valueObj value for field
   * @returns list of options
   */
  validateList(list: any, valueObj: any) {
    let listAux: any = [], x = list.find((result: { id: any; }) => result.id == valueObj.value);
    listAux = list;
    listAux.splice(listAux.indexOf(x), 1);
    listAux.splice(0, 0, x);
    return listAux;
  }

  /**
   * Method that returns a list of ordered items list
   * @param domainList explicit options list
   * @param dataList data list
   * @returns ordered items list
   */
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

  /**
   * Method that returns field value based on its form control
   * @param dataControlsValue list of field values
   * @param businessCode field business code
   * @returns field value
   */
  getControlValue(dataControlsValue: any, businessCode: string) {
    let value = null;

    for(let group of dataControlsValue) {
      const valueField = group.fields.find((x: any) => x.dtCd === businessCode);
      if (valueField) {
        value = valueField.value;
        break;
      }
    }

    return value;
  }

  /**
   * Method for convert form control structure to (key: value) type
   * @param dataControls group data controls
   * @param groupData group data values
   */
  reverseMap(dataControls: any, groupData: any) {
    for (let objKey of Object.keys(groupData)) {
      for (let key of Object.keys(groupData[objKey])) {
        groupData[objKey][key] = this.getControlValue(dataControls.getRawValue(), key);
      }
    }
  }

  /**
   * Method that converts form controls structure to (key: value) type before form submit
   */
  transformData() {
    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);

    for(let risk of this.riskDataControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
    }

    this.savePolicyRenewal();

  }

  /**
   * Method for delay redirection after success
   */
  async delayAndNavigate() {   
    await new Promise((resolve) => setTimeout(resolve, 2000));   
    await this.router.navigate([`/polizas/consulta`]); 
  }

  /**
   * Method for save renewal process
   */
  savePolicyRenewal() {
    this.isSaving = true;
    const processData = {
      idCause: this.formPolicy.get('causeType')?.value,
      idChangeActivityType: 15, // tipo para renovación en línea
      observation: this.formPolicy.get('observation')?.value
    };
    
    this.modalAPService.savePolicyRenewal(processData, this.policy)
      .subscribe((resp: any) => {
        if(resp.dataHeader.code != 500){
          //this.ref.close(true)
          this.showSuccess('success', 'Renovación exitosa', 'La póliza ha sido renovada');
          this.delayAndNavigate().then(() => {}).catch((error) => { console.error(error); });
        } else  {
          this.showSuccess('error', 'Error al renovar', resp.dataHeader.status);
        }
        this.isSaving = false;
      }
    );
  }

  /**
   * Method for show toast message
   * @param status message severity
   * @param title message title
   * @param msg message content
   */
  showSuccess(status: string, title: string, msg: string) {
    this.messageService.add({
      severity: status,
      summary: title,
      detail: msg
    });
  }

  /**
   * Method for show confirmation dialog for process
   */
  confirmSave() {
    this.confirmationService.confirm({
        message: `
          <div class="flex justify-center pt-5 pb-3">
              <img src="smartcore-commons/assets/styles/material-theme/icons/picto-alert.svg" alt="icon-warning">
          </div>
          <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl">
            <p class="w-full text-center">
              ¿Está seguro de realizar esta renovación?
            </p>
          </div>
        `,
        header: 'Confirmación',
        accept: () => {
          this.transformData();
        }
    });
  }

}
