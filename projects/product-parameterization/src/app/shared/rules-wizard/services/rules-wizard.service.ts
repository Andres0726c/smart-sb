import { Injectable } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { RulesWizardComponent } from '../rules-wizard.component';
import { ElementTableSearch } from '../../../core/model/ElementTableSearch.model';

@Injectable({
  providedIn: 'root'
})
export class RulesWizardService {
  contextData: any = [];

  constructor(
    public productService: ProductService,
    public dialogService: DialogService
  ) { }

  async loadContextData(applicationLevel: string) {
    try {
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(`domainList/DATOS_CONTEXTO`)
      );

      if (res.body) {
        this.contextData = res.body.nmValueList;

        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData = this.contextData.filter(
          (data: any) =>
            data.applctnLvl.includes(applicationLevel) ||
            data.applctnLvl.includes('*')
        );
      }

      return this.contextData;
    } catch (error) {
      console.error('Ha ocurrido un error al obtener los datos necesarios');
    }
  }

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * Funcion para realizar la apertura de la modal de consulta y seleccion multiple
   */
  openRuleWizard(code: string, field: string, rulePrevValue: any, ruleAttr: string) {
    const columns = [
      {
        field: 'name',
        header: 'Nombre',
        displayValue: ['nmName'],
        dbColumnName: ['nmname'],
      },
      {
        field: 'description',
        header: 'Descripción',
        displayValue: ['dsDescription'],
        dbColumnName: ['dsdescription'],
      },
      {
        field: 'cdRuleType',
        displayValue: ['cdRuleType'],
        dbColumnName: ['cdRuleType'],
      },
      { field: 'endPoint', displayValue: ['endPoint'] },
      { field: 'nmParameterList', displayValue: ['nmParameterList'] },
      { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
      { field: 'urlBs', displayValue: ['urlBs'] },
      { field: 'rlEngnCd', displayValue: ['rlEngnCd'] },
      { field: 'aplctnLvlItm', displayValue: ['applicationLevel']},
      { field: 'vrsn', displayValue: ['nmVersion']},
      { field: 'rtrnLst', displayValue: ['nmReturnList']},
    ];

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: {
        code: code,
        list: this.getRulesDp(),
        columns: columns,
        paramValues: this.getParamValuesList(),
      },
      showHeader: false,
      width: '600px',
    });
    let res: ElementTableSearch[] = [];

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.addRule(field, res, rulePrevValue, ruleAttr);
      }
    });
  }

  addRule(field: string, objRule: any, rulePrevValue: any, ruleAttr: string) {
    if (rulePrevValue.length > 0) {
      // vamos a eliminar la regla anterior
      this.productService.deleteDependencyRef('rl', rulePrevValue.rlCd, ruleAttr/*'rhClcltnRl'*/);
    }
    let arr: any[] = [];
  
    let elementDp: any = {
      id: objRule.rule.id,
      cd: objRule.rule.cdBusinessCode,
      nm: objRule.rule.name,
      vrsn: objRule.rule.vrsn,
      dscrptn: objRule.rule.description,
      prmtrLst: objRule.rule.nmParameterList,
      rtrnLst: objRule.rule.rtrnLst,
      rlTypItm: objRule.rule.cdRuleType,
      aplctnLvlItm: objRule.rule.aplctnLvlItm,
      endPnt: {
        url: objRule.rule.endPoint,
        rlEngnCd: objRule.rule.rlEngnCd
      },
      sttsCd: 'ACT',
      insrncLnCd: [null]
    };

    let objRlArgs = this.mapRuleArgs(objRule.parameters);

    let element: any = {
      rlCd: objRule.rule.cdBusinessCode, 
      argmntLst: objRlArgs
    };

    this.productService.setProductDependency('rl', elementDp);
    this.productService.setDependencyRef('rl', elementDp.cd, ruleAttr);
    arr.push(element);
    this.productService.rnsttmntPrcss.get(field)?.setValue(arr);
    rulePrevValue = element;
  }

  mapRuleArgs(args: any) {
    let obj: any = {};
    for (let item of args) {
      obj[item.name] = item.value;
    }
    return obj;
  }

  getRulesDp() {
    let res: any[] = [];
    let aux = this.productService.rnsttmntPrcss?.get('clcltnRl')?.value;
    for(const rule of aux) {
      res.push(this.productService.getProductDependency('rl', rule.rlCd));
    }
    return res;
  }

  getParamValuesList() {
    let list: any = [];

    for (let field of this.getAllFields()) {
      const objField = {
        id: field.businessCode,
        name: field.name,
      };
      list.push(objField);
    }

    for (let field of this.contextData) {
      const objContext = {
        id: field.code,
        name: field.description,
      };
      list.push(objContext);
    }

    list = list.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));

    return list;
  }

  getAllFields() {
    let res: any[] = [];
    for (const group of this.productService.policyData.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }
}
