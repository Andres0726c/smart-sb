import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseDTO } from 'projects/policy-management/src/app/core/interfaces/commun/response';
import { Product } from 'projects/policy-management/src/app/core/interfaces/product/product';
import { ProductService } from 'projects/policy-management/src/app/core/services/product/product.service';

@Component({
  selector: 'refactoring-smartcore-mf-policy-renewal',
  templateUrl: './policy-renewal.component.html',
  styleUrls: ['./policy-renewal.component.scss']
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

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public productService: ProductService
  ) {
    this.formPolicy = this.fb.group({
      policyData: this.fb.array([]),
      riskData: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getPolicy();
    });
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

  getFieldsControls(group: any) {
    return group.get('fields') as FormArray;
  }

  getPolicy() {
    this.isLoading = true;
    console.log('id', this.id);
    this.productService.findByIdPolicy(this.id).subscribe((res: any) => {
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
        this.formPolicy.setControl('policyData', this.fillGroupData(this.product.nmContent?.policyData, this.policyData));
        this.formPolicy.setControl('riskData', this.fillRiskData(this.product.nmContent?.riskTypes));
        /*this.formPolicy.removeControl('policyData');
        this.formPolicy.removeControl('riskData');
        this.formPolicy.addControl('policyData', this.fillGroupData(this.product.nmContent?.policyData, this.policyData));
        this.formPolicy.addControl('riskData', this.fillRiskData(this.product.nmContent?.riskTypes));*/
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
          let fieldFG = this.fb.group({
            businessCode : field.code.businessCode,
            code: field.code,
            dataTypeGui: field.dataTypeGui,
            dataTypeName: field.dataTypeName,
            dependency: field.dependency,
            editable: field.editable,
            id: field.id,
            initializeRule: field.initializeRule,
            label: field.label,
            name: field.name,
            required: field.required,
            validateRule: field.validateRule,
            visible: field.visible,
            value: valueObj.value
          });

          (<FormArray>groupFG.get('fields')).push(fieldFG);
        }
      }
      (<FormArray>formArrayData).push(groupFG);
    }

    return formArrayData;
  }

}
