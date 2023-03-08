import { Component, OnInit } from '@angular/core';
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
  applicationLevel = 'Renovación';
  causes = [
    {
      id: 'RNV_CRE_1',
      name: 'Solicitud del tomador'
    },
    {
      id: 'RNV_CRE_2',
      name: 'Solicitud del test'
    },
    {
      id: 'RNV_CRE_3',
      name: 'Solicitud del test 3'
    }
  ];

  constructor(
    public productService: ProductService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadContextData();
  }

  loadContextData() {
    this.productService.getApiData(`domainList/DATOS_CONTEXTO`).subscribe({
      next: (res: any) => {
        console.log('rdatos_contexto', res);
        this.contextData = res.body.nmValueList;
        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData =  this.contextData.filter( (data:any) => data.applctnLvl.includes(this.applicationLevel) || data.applctnLvl.includes("*") );
      },
      error: (error) => {
        this.flagError = true;
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
    const columns = [
      { field: 'name', header: 'Nombre', displayValue: ['nmName'], dbColumnName:['nmname']  },
      { field: 'description', header: 'Descripción', displayValue: ['dsDescription'], dbColumnName:['dsdescription']  },
      { field: 'cdRuleType', displayValue: ['cdRuleType'], dbColumnName:['cdRuleType']  },
      { field: 'endPoint', displayValue: ['endPoint'] },
      { field: 'nmParameterList', displayValue: ['nmParameterList'] },
      { field: 'cdBusinessCode', displayValue: ['cdBusinessCode'] },
      { field: 'urlBs', displayValue: ['urlBs'] }
    ];

    const parameter =
      this.productService.initialParameters?.get('insuranceLine')?.value !== null
        ? this.productService.initialParameters?.get('insuranceLine')?.value + ''
        : '0';

        /*this.openDialogWizard(
          'ruleInitializeControls',
          field?.value,
          columns,
          false,
          this.complementaryData,
          this.contextData
        )*/

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: { 
        code: code,
        list: this.productService.rnwlPrcss.get(field)?.value, 
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
        //console.log(this.selectedField);
        //let arr: any[] = [];
        //arr.push(res);
        //this.selectedField.get(field)?.setValue(arr);
        this.addRule(field, res);
      }
      //this.addItem(res, 1, true);
    });
  }

  addRule(field: string, objRule: any) {
    let arr: any[] = [];
    let element: any = {
      id: objRule.rule.id,
      name: objRule.rule.name,
      cdBusinessCode: objRule.rule.cdBusinessCode,
      description: objRule.rule.description,
      cdRuleType: objRule.rule.cdRuleType,
      endPoint: objRule.rule.endPoint,
      rlEngnCd: objRule.rule.rlEngnCd,
      argmntLst: objRule.parameters
    };
    
    arr.push(element);
    this.productService.rnwlPrcss.get(field)?.setValue(arr);
  }

  getAllFields() {
    let res: any[] = [];
    for(const group of this.productService.policyData.getRawValue()) {
      res = res.concat(group.fields);
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

}
