import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  id: any = '';
  policy: any;
  policyData: any;
  riskData: any;
  product: Product = {
    id: 0,
    nmName: '',
    dsDescription: '',
    nmHashCode: 0,
    nmContent: undefined,
  };

  formPolicy: FormGroup;
  isLoading: boolean = false;
  errorFlag: boolean = false;

  defaultTypeGui = 'Text box';
  readOnly = true;
  isSaving = false;

  causes: any[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    public router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    public modalAPService: ModalPolicyActionsService,
    public fb: FormBuilder,
    public messageService: MessageService,
    public productService: ProductService,
  ) {
    this.formPolicy = this.fb.group({
      policyData: this.fb.array([]),
      riskData: this.fb.array([]),
      causeType: this.fb.control({ value: '', disabled: true }),
      observation: this.fb.control('', [Validators.maxLength(200)]),
    });
  }

  ngOnInit(): void {
    this.getCauses(this.config.data.process);
    this.getPolicy();
  }

  get policyDataControls() {
    return this.formPolicy.get('policyData') as FormArray;
  }

  get riskDataControls() {
    return this.formPolicy.get('riskData') as FormArray;
  }

  getGroupsControls(risk: any) {
    return risk.get('complementaryData') as FormArray;
  }

  getCauses(applicationProcess: string){
    this.modalAPService.getCauses(applicationProcess)
    .subscribe( causes => {
      this.causes = causes.body;
      this.formPolicy.get('causeType')?.setValue(136)
      });
    }


  getPolicy() {
    this.policy = this.config.data.policy.policyData;
    this.policyData = this.mapData(this.policy.plcy.plcyDtGrp);
    this.riskData = this.mapData(this.policy.plcy.rsk['1'].rskDtGrp);
    this.getProduct(this.policy.prdct);
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
    this.productService.getProductByCode(code).subscribe((res: ResponseDTO<Product>) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.product = res.body;
        this.formPolicy.setControl('policyData', this.fillGroupData(this.product.nmContent?.policyData, this.policyData));
        this.formPolicy.setControl('riskData', this.fillRiskData(this.product.nmContent?.riskTypes));
        console.log('policyData: ', this.policyDataControls);
        console.log('riskData: ', this.riskDataControls);
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
          (<FormArray>groupFG.get('fields')).push(this.getFieldControls(field, valueObj));
        }
      }
      (<FormArray>formArrayData).push(groupFG);
    }

    return formArrayData;
  }

  getFieldControls(field: any, value: any) {
    let fieldFG = this.fb.group({});

    Object.keys(field).forEach(key => {
      fieldFG.addControl(key, this.fb.control(field[key]));
    });

    //fieldFG.addControl('value', this.fb.control({ value: field.dataType.name === 'date' ? new Date(value.value) : value.value, disabled: !field.editable }));
    fieldFG.addControl('value', this.fb.control({ value: field.dataType.name === 'date' ? new Date(value.value) : value.value, disabled: this.readOnly ?? !field.editable }));

    if (field.dataType.guiComponent === 'List box') {
      let options = [{ id: value.value, name: value.value }]
      fieldFG.addControl('options', this.fb.control(options));
    }

    return fieldFG;
  }

  getControlValue(dataControlsValue: any, businessCode: string) {
    let value = null;

    for(let group of dataControlsValue) {
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
        groupData[objKey][key] = this.getControlValue(dataControls.getRawValue(), key);
      }
    }
  }

  transformData() {
    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);

    for(let risk of this.riskDataControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
    }

    this.savePolicyRenewal();

  }

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
          this.ref.close(true)
          this.showSuccess('success', 'Renovación exitosa', 'La póliza ha sido renovada');
        } else  {
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

  showSuccess(status: string, title: string, msg: string) {
    this.messageService.add({
      severity: status,
      summary: title,
      detail: msg
    });
  }

  confirmSave() {
    this.confirmationService.confirm({
        message: `
          <div class="flex justify-center pt-5 pb-3">
              <img src="smartcore-commons/assets/styles/material-theme/icons/picto-alert.svg" alt="icon-warning">
          </div>
          <div class="flex flex-col justify-center items-center mt-5 mb-3 text-2xl">
            <p class="w-full text-center">
              Está seguro de realizar esta renovación?
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
