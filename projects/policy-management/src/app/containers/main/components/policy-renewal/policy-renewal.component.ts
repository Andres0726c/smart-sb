import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { group } from 'console';
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
  errorFlag: boolean = false;

  defaultTypeGui = 'Text box';

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public productService: ProductService
  ) {
    this.policy = {
      "prdct": "mascotas_automatizacion",
      "insrncLn": "23",
      "cmpny": {
          "idntfctnTyp": "7",
          "idntfctnNmbr": "860002180"
      },
      "dstrbtnChnnl": "104",
      "vldtyPrd": "5",
      "cntry": "CO",
      "plcy": {
          "rqstNmbr": "1221",
          "plcyNmbr": "121221",
          "mnPlcyNmbr": "0",
          "mnEndrsmntNmbr": 0,
          "plcyDtGrp": {
              "datos_basicos": {
                  "FECHA_EMISION": "2022-11-01T12:53:00-05:00",
                  "FEC_INI_VIG_POL": "2022-11-01T12:53:00-05:00",
                  "FEC_FIN_VIG_POL": "2023-01-31T12:53:00-05:00",
                  "MONEDA": "COP",
                  "PERIODO_FACT": "1",
                  "OBSERVACIONES": "Esto es una observacion",
                  "TIPO_DOC_TOMADOR": "CC",
                  "NRO_ID_TOMADOR": "123458676",
                  "NOMBRE_DEL_TOMADOR": "Jorge Bermudez",
                  "COD_AGENTE": "ABC123",
                  "NOMBRE_DEL_AGENTE": "José Gallego"
              },
              "gd002_datosdedebito": {
                  "METODO_PAGO": "MPG_EFT",
                  "MEDIO_PAGO": "ABC",
                  "NRO_CUENTA": "1234567",
                  "CORREO_PERSO_CONTAC": "jose@bolivar.com"
              }
          },
          "rsk": {
              "1": {
                  "rskTyp": "2",
                  "rskDtGrp": {
                      "datos_basicos": {
                          "RAZA": "A",
                          "TIPO_MASCOTA": "1",
                          "NOMBRE_MASCOTA": "Luna",
                          "EDAD_MASCOTA": "10"
                      },
                      "gd002_datosasegurado": {
                          "TIPO_DOC_ASEGURADO": "CC",
                          "NRO_ID_ASEGURADO": "55551121",
                          "NOM_ASEG": "Pablo Andrés",
                          "APE_ASEG": "Echeverry",
                          "CPOS_RIES": "05030",
                          "DIR_COM_ASEG": "ABC"
                      }
                  },
                  "cmmrclPln": {
                      "pc001_opcion1alternativa1": {
                          "cvrg": {
                              "COB8": {
                                  "ddctbl": "",
                                  "insuredVl": 1000331.23,
                                  "prmm": {
                                      "prmmTyp": "calculada",
                                      "prmmVl": 200331.23
                                  },
                                  "cvrgDtGrp": {
                                      "datos_basicos": {}
                                  },
                                  "itmRskCtlgDtGrp": {
                                      "datos_basicos": {}
                                  }
                              },
                              "COB5": {
                                  "ddctbl": "",
                                  "insuredVl": 1000331.23,
                                  "prmm": {
                                      "prmmTyp": "calculada",
                                      "prmmVl": 200331.23
                                  },
                                  "cvrgDtGrp": {
                                      "datos_basicos": {}
                                  },
                                  "itmRskCtlgDtGrp": {
                                      "datos_basicos": {}
                                  }
                              },
                              "COB7": {
                                  "ddctbl": null,
                                  "insuredVl": 1000331.23,
                                  "prmm": {
                                      "prmmTyp": "calculada",
                                      "prmmVl": 200331.23
                                  },
                                  "cvrgDtGrp": {
                                      "datos_basicos": {}
                                  },
                                  "itmRskCtlgDtGrp": {
                                      "datos_basicos": {}
                                  }
                              }
                          },
                          "srvcPln": {
                              "1004": {
                                  "prcVl": 1000021.21
                              }
                          }
                      }
                  }
              }
          }
      }
    };

    this.formPolicy = this.fb.group({
      policyData: this.fb.array([
        fb.group({
          id: 1,
          code: 'datos_basicos',
          name: 'Datos básicos',
          fields: fb.array([
            fb.group({
              label: 'Campo 1',
              dataTypeGui: 'Text box',
              value: 'Valor campo 1'
            }),
            fb.group({
              label: 'Campo 2',
              dataTypeGui: 'Text box',
              value: 'Valor campo 2'
            }),
            fb.group({
              label: 'Campo 3',
              dataTypeGui: 'List box',
              value: { id: 2, name: 'Opcion 2' },
              options: fb.control([
                { id: 1, name: 'Opcion 1' },
                { id: 2, name: 'Opcion 2' },
                { id: 3, name: 'Opcion 3' }
              ])
            })
          ])
        }),
        fb.group({
          id: 2,
          code: 'datos_complementarios',
          name: 'Datos complementarios',
          fields: fb.array([
            fb.group({
              label: 'Campo 4',
              dataTypeGui: 'Text box',
              value: 'Valor campo 4'
            }),
            fb.group({
              label: 'Campo 5',
              dataTypeGui: 'Text box',
              value: 'Valor campo 5'
            }),
            fb.group({
              label: 'Campo 6',
              dataTypeGui: 'Text box',
              value: 'Valor campo 6'
            })
          ])
        })
      ]),
      riskData: this.fb.array([
        fb.group({
          id: 1,
          code: 'riesgo_1',
          name: 'Riesgo 1',
          complementaryData: this.fb.array([
            fb.group({
              id: 1,
              code: 'datos_basicos',
              name: 'Datos básicos',
              fields: fb.array([
                fb.group({
                  label: 'Campo 1',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 1'
                }),
                fb.group({
                  label: 'Campo 2',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 2'
                }),
                fb.group({
                  label: 'Campo 3',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 1'
                })
              ])
            }),
            fb.group({
              id: 2,
              code: 'datos_complementarios',
              name: 'Datos complementarios',
              fields: fb.array([
                fb.group({
                  label: 'Campo 4',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 4'
                }),
                fb.group({
                  label: 'Campo 5',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 5'
                }),
                fb.group({
                  label: 'Campo 6',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 6'
                })
              ])
            })
          ])
        }),
        fb.group({
          id: 2,
          code: 'riesgo_2',
          name: 'Riesgo 2',
          complementaryData: this.fb.array([
            fb.group({
              id: 1,
              code: 'datos_basicos',
              name: 'Datos básicos riesgo 2',
              fields: fb.array([
                fb.group({
                  label: 'Campo 1',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 1'
                }),
                fb.group({
                  label: 'Campo 2',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 2'
                }),
                fb.group({
                  label: 'Campo 3',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 1'
                })
              ])
            }),
            fb.group({
              id: 2,
              code: 'datos_complementarios',
              name: 'Datos complementarios riesgo 2',
              fields: fb.array([
                fb.group({
                  label: 'Campo 4',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 4'
                }),
                fb.group({
                  label: 'Campo 5',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 5'
                }),
                fb.group({
                  label: 'Campo 6',
                  dataTypeGui: 'Text box',
                  value: 'Valor campo 6'
                })
              ])
            })
          ])
        })
      ])
    });

    this.formPolicy = this.fb.group({
      policyData: this.fb.array([]),
      riskData: this.fb.array([])
    });

  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      //this.getPolicy();

      //console.log(this.policy.rsk);

      this.policyData = this.mapData(this.policy.plcy.plcyDtGrp);
      this.riskData = this.mapData(this.policy.plcy.rsk['1'].rskDtGrp);
      this.getProduct(58);
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

  getPolicy() {
    this.isLoading = true;
    this.errorFlag = false;
    console.log('id', this.id);
    this.productService.findByIdPolicy(this.id).subscribe((res: any) => {
      if (res.dataHeader.code && res.dataHeader.code == 200) {
        this.policy = res.body; 
        this.policyData = this.mapData(this.policy.propertiesPolicyData);
        this.riskData = this.mapData(this.policy.riskPropertiesPolicyData[0].policyriskdata);
        this.getProduct(this.policy.idProduct);
      } else {
        this.errorFlag = true;
      }
      this.isLoading = false;
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

    fieldFG.addControl('value', this.fb.control({ value: field.dataTypeName === 'date' ? new Date(value.value) : value.value, disabled: !field.editable }));

    if (field.dataTypeGui === 'List box') {
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
        groupData[objKey][key] = this.getControlValue(dataControls.value, key);
      }
    }
  }

  transformData() {
    this.reverseMap(this.policyDataControls, this.policy.plcy.plcyDtGrp);

    for(let risk of this.riskDataControls.controls) {
      this.reverseMap(this.getGroupsControls(risk), this.policy.plcy.rsk['1'].rskDtGrp);
    }

    console.log('result', this.policy);
    
  }

}
