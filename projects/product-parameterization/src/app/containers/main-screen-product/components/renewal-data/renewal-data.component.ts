import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { RulesWizardComponent } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.component';

@Component({
  selector: 'refactoring-smartcore-mf-renewal-data',
  templateUrl: './renewal-data.component.html',
  styleUrls: ['./renewal-data.component.scss']
})
export class RenewalDataComponent implements OnInit {
  contextData: any = [];
  isLoading = false;
  flagError = false;
  flagCsProcess = false;
  applicationLevel = 'Renovación';
  causes: any = [];
  causesPrevValue: any = [];
  rulePrevValue: any = null;

  constructor(
    public productService: ProductService,
    public dialogService: DialogService,
    private messageService: MessageService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCauses();
    this.loadContextData();

    /*this.productService.rnwlPrcss = this.fb.group({
      enabled: this.fb.control(false),
      rnwlCsCd: this.fb.control([]),
      clcltnRl: this.fb.control([]),
      isNwIssPlcy: this.fb.control(false)
    });
    this.productService.prdctDpndncy = this.fb.group({
      cs: this.fb.array([]),
      rl: this.fb.array([])
    });
    this.productService.references = this.fb.array([]);*/

    /*this.productService.rnwlPrcss.reset();
    this.productService.prdctDpndncy.reset();
    this.productService.references.reset();*/
  }

  loadCauses() {
    this.isLoading = true;
    const company = this.productService.companyId;
    const insuranceLine = this.productService.initialParameters.get('insuranceLine')?.value;
    this.productService.getApiData(`claimCause/findByCompanyAndInsuranceLine/${company}/${insuranceLine}/0/0/0/0/${this.applicationLevel}`).subscribe({
      next: (res: any) => {
        console.log('causas', res);
        this.causes = res.body;
        this.isLoading = false;
      },
      error: (error) => {
        this.flagError = true;
        this.isLoading = false;
        console.error('Ha ocurrido un error al obtener los datos necesarios');
      }
    });
  }

  loadContextData() {
    this.isLoading = true;
    this.productService.getApiData(`domainList/DATOS_CONTEXTO`).subscribe({
      next: (res: any) => {
        console.log('datos contexto', res);
        this.contextData = res.body.nmValueList;
        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData =  this.contextData.filter( (data:any) => data.applctnLvl.includes(this.applicationLevel) || data.applctnLvl.includes("*") );
        this.isLoading = false;
      },
      error: (error) => {
        this.flagError = true;
        this.isLoading = false;
        console.error('Ha ocurrido un error al obtener los datos necesarios');
      }
    });
  }

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * Funcion para realizar la apertura de la modal de consulta y seleccion multiple
   */
  openRuleWizard(code: string, field: string) {
    console.log('form', this.productService.rnwlPrcss);
    const columns = [
      { field: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      { field: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']  },
      { field: 'cdRuleType', displayValue: ['cdRuleType'], dbColumnName:['cdRuleType']  },
      { field: 'endPoint', displayValue: ['endPoint'] },
      { field: 'nmVersion', displayValue: ['nmVersion'] },
      { field: 'nmParameterList', displayValue: ['nmParameterList'] },
      { field: 'nmReturnList', displayValue: ['nmReturnList'] },
      { field: 'applicationLevel', displayValue: ['applicationLevel'] },
      { field: 'rlEngnCd', displayValue: ['rlEngnCd'] },
      { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
      { field: 'urlBs', displayValue: ['urlBs'] },
      { field: 'id', displayValue: ['id'] }
    ];

    const parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
        ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
        : '0';
        
    const itemSelected = this.productService.getProductDependency('rl', this.productService.rnwlPrcss.get(field)?.value.cd);

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: { 
        code: code,
        list: this.getRulesDp(), 
        columns: columns,
        paramValues: this.getParamValuesList()
      },
      showHeader: false,
      width: '600px'
    });
    let res: ElementTableSearch[] = [];

    dialogRef.onClose.subscribe((res) => {
      console.log('cerro', res);
      if (res) {
        this.addRule(field, res);
      }
    });
  }

  addRule(field: string, objRule: any) {
    if (this.rulePrevValue) {
      // vamos a eliminar la regla anterior
      console.log('vamos a eliminar la regla anterior');
      console.log('regla anterior', this.rulePrevValue);
      this.productService.deleteDependencyRef('rl', this.rulePrevValue.rlCd, 'rnClcltnRl');
    }
    console.log('rule', objRule);
    let arr: any[] = [];
    let parametersList: any = {};

    try {
      parametersList = JSON.parse(objRule.rule.nmParameterList);
    } catch (error) {
      parametersList = {};
    }

    let elementDp: any = {
      id: objRule.rule.id,
      cd: objRule.rule.cdBusinessCode,
      nm: objRule.rule.name,
      vrsn: objRule.rule.nmVersion,
      dscrptn: objRule.rule.description,
      prmtrLst: parametersList,
      rtrnLst: objRule.rule.nmReturnList,
      rlTypItm: objRule.rule.cdRuleType,
      aplctnLvlItm: objRule.rule.applicationLevel,
      endPnt: {
        url: objRule.rule.endPoint,
        rlEngnCd: objRule.rule.rlEngnCd
      },
      sttsCd: 'ACT',
      insrncLnCd: [this.productService.prdctDpndncy.get('insrncLn')?.value[0].cd]
    };

    let objRlArgs = this.mapRuleArgs(objRule.parameters);

    let element: any = {
      rlCd: objRule.rule.cdBusinessCode, 
      argmntLst: objRlArgs
    };
    
    this.productService.setProductDependency('rl', elementDp);
    this.productService.setDependencyRef('rl', elementDp.cd, 'rnClcltnRl')
    arr.push(element);
    this.productService.rnwlPrcss.get(field)?.setValue(arr);
    this.rulePrevValue = element;

    console.log('prdctDpndncy', this.productService.prdctDpndncy);
    console.log('field', this.productService.rnwlPrcss);
    console.log('references', this.productService.references);
  }

  mapRuleArgs(args: any) {
    let obj: any = {};
    for (let item of args) {
      obj[item.name] = item.value;
    }
    return obj;
  }

  getAllFields() {
    let res: any[] = [];
    for(const group of this.productService.policyData.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }

  getRulesDp() {
    let res: any[] = [];
    for(const rule of this.productService.rnwlPrcss.get('clcltnRl')?.value) {
      res.push(this.productService.getProductDependency('rl', rule.rlCd));
    }
    return res;
  }

  getParamValuesList() {
    let list: any = [];

    for (let field of this.getAllFields()) {
      const objField = {
        id: field.businessCode,
        name: field.name
      };
      list.push(objField);
    }

    for (let field of this.contextData) {
      const objContext = {
        id: field.code,
        name: field.description
      };
      list.push(objContext);
    }

    list = list.sort((a: any, b: any) => (a.name < b.name ? -1 : 1));
    console.log('valores: ', list);

    return list;
  }

  verifyCsProcess(value: any) {
    if (!this.flagCsProcess && this.causesPrevValue.length === 0) {
      this.causesPrevValue = value;
      this.flagCsProcess = true;
    }
    if (this.causesPrevValue.length > value.length) {
      // vamos a eliminar causas
      console.log('vamos a eliminar causas');
      const diff = this.causesPrevValue.filter((x: any) => !value.includes(x));
      for (let cause of diff) {
        this.productService.deleteDependencyRef('cs', cause, 'rnwlCsCd');
      }
      console.log('prdctDpndncy', this.productService.prdctDpndncy);
      console.log('field', this.productService.rnwlPrcss);
      console.log('references', this.productService.references);
    } else {
      // vamos a agregar causas
      this.setCsDependency(value);
    }
    this.causesPrevValue = value;
  }

  setCsDependency(value: any) {
    for (let cs of value) {
      const cause: any = this.causes.find((x: any) => x.businessCode === cs);
      const obj = {
        id: cause.id,
        cd: cause.businessCode,
        nm: cause.name,
        dscrptn: cause.description,
        aplctnPrcssItm: cause.aplicationProcess,
        aplctnSbprcssCd: cause.aplicationSubProcess,
        sttCd: cause.statusCode,
        insrncLnCd: [this.productService.prdctDpndncy.get('insrncLn')?.value[0].cd]
      };

      this.productService.setProductDependency('cs', obj);
      this.productService.setDependencyRef('cs', obj.cd, 'rnwlCsCd')
    }
    console.log('prdctDpndncy', this.productService.prdctDpndncy);
    console.log('field', this.productService.rnwlPrcss);
    console.log('references', this.productService.references);
  }

  removeRule(value: any) {
    this.productService.deleteDependencyRef('rl', value.rlCd, 'rnClcltnRl');
    this.rulePrevValue = [];
    console.log('prdctDpndncy', this.productService.prdctDpndncy);
    console.log('field', this.productService.rnwlPrcss);
    console.log('references', this.productService.references);
  }

  removeCsProcess(value: any) {
    this.productService.deleteDependencyRef('cs', value, 'rnwlCsCd');
  }

}
