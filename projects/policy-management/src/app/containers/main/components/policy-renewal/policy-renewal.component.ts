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
export class PolicyRenewalComponent  {
  // id: any = '';
  // policy: any;
  // policyData: any;
  // riskData: any;
  // product: Product = {
  //   id: 0,
  //   nmName: '',
  //   dsDescription: '',
  //   nmHashCode: 0,
  //   nmContent: undefined,
  // };

  // formPolicy: FormGroup;
  // isLoading: boolean = false;
  // errorFlag: boolean = false;

  // defaultTypeGui = 'Text box';

  constructor(
    // private _ActivatedRoute: ActivatedRoute,
    // public fb: FormBuilder,
    // public productService: ProductService
  ) {
    // this.formPolicy = this.fb.group({
    //   policyData: this.fb.array([]),
    //   riskData: this.fb.array([])
    // });

  }

  // ngOnInit(): void {
  //   this._ActivatedRoute.paramMap.subscribe(params => {
  //     this.id = params.get('id');
  //     this.getPolicy();
  //   });
  // }

  // get policyDataControls() {
  //   return this.formPolicy.get('policyData') as FormArray;
  // }

  // get riskDataControls() {
  //   return this.formPolicy.get('riskData') as FormArray;
  // }

  // getGroupsControls(risk: any) {
  //   return risk.get('complementaryData') as FormArray;
  // }

  // getPolicy() {
  //   this.isLoading = true;
  //   this.errorFlag = false;
  //   console.log('id', this.id);
  //   this.productService.findPolicyDataById(this.id).subscribe((res: any) => {
  //     if (res.dataHeader.code && res.dataHeader.code == 200) {
  //       this.policy = res.body;
  //       this.policyData = this.mapData(this.policy.plcy.plcyDtGrp);
  //       this.riskData = this.mapData(this.policy.plcy.rsk['1'].rskDtGrp);
  //       this.getProduct(this.policy.prdct);
  //     } else {
  //       this.errorFlag = true;
  //     }
  //     this.isLoading = false;
  //   });
  // }

  // mapData(groupData: any) {
  //   let arrayData: any[] = [];

  //   for (let objKey of Object.keys(groupData)) {
  //     for (let key of Object.keys(groupData[objKey])) {
  //       let obj = {
  //         name: key,
  //         value: groupData[objKey][key]
  //       };
  //       arrayData.push(obj);
  //     }
  //   }

  //   return arrayData;
  // }

  // getProduct(code: string) {
  //   this.productService.getProductByCode(code).subscribe((res: ResponseDTO<Product>) => {
  //     if (res.dataHeader.code && res.dataHeader.code == 200) {
  //       this.product = res.body;
  //       this.formPolicy.setControl('policyData', this.fillGroupData(this.product.nmContent?.policyData, this.policyData));
  //       this.formPolicy.setControl('riskData', this.fillRiskData(this.product.nmContent?.riskTypes));
  //       console.log('policyData: ', this.policyDataControls);
  //       console.log('riskData: ', this.riskDataControls);
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // fillRiskData(riskTypes: any) {
  //   let risksArrayData: any = this.fb.array([]);

  //   for (let risk of riskTypes) {
  //     let groupRisk = this.fb.group({
  //       id: risk.id,
  //       name: risk.name,
  //       description: risk.description,
  //       code: risk.code,
  //       complementaryData: this.fillGroupData(risk.complementaryData, this.riskData)
  //     });

  //     (<FormArray>risksArrayData).push(groupRisk);
  //   }

  //   return risksArrayData;
  // }

  // fillGroupData(groupsArray: any, arrayData: any) {
  //   let formArrayData: any = this.fb.array([]);

  //   for (let group of groupsArray) {
  //     let groupFG = this.fb.group({
  //       id: group.id,
  //       code: group.code,
  //       name: group.name,
  //       fields: this.fb.array([])
  //     });

  //     for (let field of group.fields) {
  //       let valueObj = arrayData.find((x: any) => x.name === field.code.businessCode);

  //       if (valueObj) {
  //         (<FormArray>groupFG.get('fields')).push(this.getFieldControls(field, valueObj));
  //       }
  //     }
  //     (<FormArray>formArrayData).push(groupFG);
  //   }

  //   return formArrayData;
  // }

  // getFieldControls(field: any, value: any) {
  //   let fieldFG = this.fb.group({});

  //   Object.keys(field).forEach(key => {
  //     fieldFG.addControl(key, this.fb.control(field[key]));
  //   });

  //   fieldFG.addControl('value', this.fb.control({ value: field.dataTypeName === 'date' ? new Date(value.value) : value.value, disabled: !field.editable }));

  //   if (field.dataTypeGui === 'List box') {
  //     let options = [{ id: value.value, name: value.value }]
  //     fieldFG.addControl('options', this.fb.control(options));
  //   }

  //   return fieldFG;
  // }

  // getControlValue(dataControlsValue: any, businessCode: string) {
  //   let value = null;

  //   for(let group of dataControlsValue) {
  //     const valueField = group.fields.find((x: any) => x.code.businessCode === businessCode);
  //     if (valueField) {
  //       value = valueField.value;
  //       break;
  //     }
  //   }

  //   return value;
  // }

  // reverseMap(dataControls: any, groupData: any) {
  //   for (let objKey of Object.keys(groupData)) {
  //     for (let key of Object.keys(groupData[objKey])) {
  //       groupData[objKey][key] = this.getControlValue(dataControls.value, key);
  //     }
  //   }
  // }

  // transformData() {
  //   this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);

  //   for(let risk of this.riskDataControls.controls) {
  //     this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
  //   }

  //   console.log('result', this.policy);
    
  // }

}
