import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { RulesWizardComponent } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'refactoring-smartcore-mf-cancellation-data',
  templateUrl: './cancellation-data.component.html',
  styleUrls: ['./cancellation-data.component.scss'],
})
export class CancellationDataComponent implements OnInit {
  contextData: any = [];
  applicationLevel = 'Cancelación';
  flagError = false;
  flagCsProcess = false;
  causesPrevValue: any[] = [];
  causes: any = [];
  rmsDpndncy: any;
  rm: any;
  rulePrevValue: any = [];
  isLoading = false;

  constructor(
    public productService: ProductService,
    public dialogService: DialogService
  ) {}

  async ngOnInit(): Promise<void> {
    this.findRmsDpndncy();
    await this.loadContextData().then();
    await this.getCauses().then();
  }
  findRmsDpndncy(){
    this.rmsDpndncy = this.productService.prdctDpndncy?.get('insrncLn')?.value;
    this.rm = this.rmsDpndncy?.find(
      (element: any) =>
        element.id ===
        this.productService.initialParameters?.get('insuranceLine')?.value
    );
  }

  async loadContextData() {
    try {
      this.isLoading = true;
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(`domainList/DATOS_CONTEXTO`)
      );

      this.contextData = res.body.nmValueList;

      //se filtra los datos de contexto dependiendo del nivel de aplicación
      this.contextData = this.contextData.filter(
        (data: any) =>
          data.applctnLvl.includes(this.applicationLevel) ||
          data.applctnLvl.includes('*')
      );

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.flagError = true;
      console.error('Ha ocurrido un error al obtener los datos necesarios');
    }
  }

  /**
   *
   * @param code codigo para identificar el tipo de la modal de busqueda que se va a ejecutar
   * @param list variable de tipo array con los elementos que ya contiene los campos
   * Funcion para realizar la apertura de la modal de consulta y seleccion multiple
   */
  openRuleWizard(code: string, field: string) {
    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: {
        code: code,
        list: this.getRulesDp(),
        paramValues: this.getParamValuesList(),
      },
      showHeader: false,
      width: '600px',
    });
    let res: ElementTableSearch[] = [];

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.addRule(field, res);
      }
    });
  }

  addRule(field: string, objRule: any) {
    if (this.rulePrevValue.length > 0) {
      // vamos a eliminar la regla anterior
      this.productService.deleteDependencyRef('rl', this.rulePrevValue.rlCd, 'cnClcltnRl');
    }
    let arr: any[] = [];
    
    let elementDp: any = {
      id: objRule.rule.id,
      cd: objRule.rule.cdBusinessCode,
      nm: objRule.rule.name,
      vrsn: objRule.rule.vrsn || null,
      dscrptn: objRule.rule.description,
      prmtrLst: objRule.rule.nmParameterList,
      rtrnLst: objRule.rule.rtrnLst || null,
      rlTypItm: objRule.rule.cdRuleType,
      aplctnLvlItm: objRule.rule.aplctnLvlItm || null,
      endPnt: {
        url: objRule.rule.endPoint,
        rlEngnCd: objRule.rule.rlEngnCd
      },
      sttsCd: 'ACT',
      insrncLnCd: [this.rm?.cd]
    };

    let objRlArgs = this.mapRuleArgs(objRule.parameters);

    let element: any = {
      rlCd: objRule.rule.cdBusinessCode, 
      argmntLst: objRlArgs
    };

    this.productService.setProductDependency('rl', elementDp);
    this.productService.setDependencyRef('rl', elementDp.cd, 'cnClcltnRl');
    arr.push(element);
    this.productService.cnclltnPrcss.get(field)?.setValue(arr);
    this.rulePrevValue = element;
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
    let aux = this.productService.cnclltnPrcss?.get('clcltnRl')?.value;
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

  async getCauses() {
    let search = 0;
    let pageNumber = 0;
    let pageSize = 0;
    let notElements = 0;

    const parameters =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    try {
      this.isLoading = true;
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(
          `claimCause/findByCompanyAndInsuranceLine/${this.productService.companyId}/${parameters}/${search}/${pageNumber}/${pageSize}/${notElements}/${this.applicationLevel}`
        )
      );

      
      if (res.body !== null) {
        this.causes = res.body;
        this.isLoading = false;
      }else{
        this.causes = [];
        this.flagError = true;
      }
      
    } catch (error) {
      this.isLoading = false;
      this.flagError = true;
      console.error('Ha ocurrido un error al obtener los datos de las causas');
    }
  }

  verifyCsProcess(value: any) {
    if (!this.flagCsProcess && this.causesPrevValue.length === 0) {
      this.causesPrevValue = value;
      this.flagCsProcess = true;
    }
    if (this.causesPrevValue.length > value.length) {
      // vamos a eliminar causas
      const diff = this.causesPrevValue.filter((x: any) => !value.includes(x));

      for (let cause of diff) {
        this.productService.deleteDependencyRef('cs', cause, 'cnclltnCsCd');
      }
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
        sttCd: cause.statusCode,
        aplctnPrcssItm: cause.aplicationProcess,
        aplctnSbprcssCd: cause.aplicationSubProcess,
        insrncLnCd: [this.rm?.cd],
      };

      this.productService.setProductDependency('cs', obj);
      this.productService.setDependencyRef('cs', obj.cd, 'cnclltnCsCd');
    }
  }

  removeCsProcess(value: any) {
    this.productService.deleteDependencyRef('cs', value, 'cnclltnCsCd');
  }

  removeRule(value: any) {
    this.productService.deleteDependencyRef('rl', value.rlCd, 'cnClcltnRl');
    this.rulePrevValue = [];
  }
}
