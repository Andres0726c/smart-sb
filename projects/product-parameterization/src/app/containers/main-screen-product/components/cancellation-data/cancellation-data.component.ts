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

  causes: any = [];

  constructor(
    public productService: ProductService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadContextData();
    this.getCauses();
  }

  async loadContextData() {
    try {
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
    } catch (error) {
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
    ];

    const parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !==
      null
        ? this.productService.initialParameters?.get('insuranceLine')?.value +
          ''
        : '0';

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: {
        code: code,
        list: this.productService.cnclltnPrcss?.get(field)?.value,
        columns: columns,
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
    let arr: any[] = [];

    let element: any = {
      rlCd: objRule.rule.cdBusinessCode,
      argmntLst: objRule.parameters,
    };

    let elementDp: any = {
      // id: objRule.rule.id,
      // name: objRule.rule.name,
      // cdBusinessCode: objRule.rule.cdBusinessCode,
      // description: objRule.rule.description,
      // cdRuleType: objRule.rule.cdRuleType,
      // endPoint: objRule.rule.endPoint,
      // rlEngnCd: objRule.rule.rlEngnCd,
      // argmntLst: objRule.parameters,
      cd: objRule.rule.cdBusinessCode,
      nm: objRule.rule.name,
      vrsn: '',//Falta
      dscrptn: objRule.rule.description,
      prmtrLst: objRule.parameters, //Validar
      rtrnLst:  objRule.rule.nmParameterList,//Validar
      rlTypItm: objRule.rule.cdRuleType,//validar
      aplctnLvlItm: '',//Falta
      endPnt: objRule.rule.endPoint, //Validar
      sttsCd: '',//Falta
      insrncLnCd: '',//Falta
    };

    this.productService.setProductDependency('rl', elementDp);
    arr.push(element);
    this.productService.cnclltnPrcss?.get(field)?.setValue(arr);

    console.log('cnclltnPrcss', this.productService.cnclltnPrcss);
    console.log('prdctDpndncy', this.productService.prdctDpndncy);
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
      let res: any;
      res = await lastValueFrom(
        this.productService.getApiData(
          `claimCause/findByCompanyAndInsuranceLine/${this.productService.companyId}/${parameters}/${search}/${pageNumber}/${pageSize}/${notElements}/${this.applicationLevel}`
        )
      );

      this.causes = res.body;
    } catch (error) {
      this.flagError = true;
      console.error('Ha ocurrido un error al obtener los datos de las causas');
    }
  }

  setCsDependency(event: any) {
    
    const value = event.value;
    
    for (let cs of value) {
      const cause: any = this.causes.find((x: any) => x.businessCode === cs);
      const obj = {
        cd: cause.businessCode,
        nm: cause.name,
        dscrptn: cause.description,
        sttCd: cause.statusCode,
        aplctnPrcssItm: cause.aplicationProcess, //validar
        aplctnSbprcssCd: cause.aplicationSubProcess, //validar
        insrncLnCd: '', //Faltan
      };

      this.productService.setProductDependency('cs', obj);
    }
    
    console.log('cnclltnPrcss', this.productService.cnclltnPrcss);
    console.log('prdctDpndncy', this.productService.prdctDpndncy);
  }
}
