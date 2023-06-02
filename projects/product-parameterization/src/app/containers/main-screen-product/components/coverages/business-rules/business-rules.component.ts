import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ElementTableSearch } from 'projects/product-parameterization/src/app/core/model/ElementTableSearch.model';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { RulesWizardComponent } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.component';

@Component({
  selector: 'refactoring-smartcore-mf-business-rules',
  templateUrl: './business-rules.component.html',
  styleUrls: ['./business-rules.component.scss'],
  providers: [DialogService],
})
/**
 * Component to handle business rules in coverages
 */
export class BusinessRulesComponent implements OnInit {
  @Input() coverageRules: any = new FormGroup({});
  contextData: any = [];
  flagError = false;
  selectedSelection!: any;
  selectedInitialize!: any;
  selectedValidate!: any;
  
  /**
   * construct method to initialize coverage Rules array
   * @param productService 
   * @param dialogService 
   * @param fb 
   */
  constructor(
    public productService: ProductService,
    public dialogService: DialogService,
    public fb: FormBuilder
  ) {
    this.coverageRules = fb.group({
      selectionRule: fb.control([], []),
      initializeRule: fb.control([], []),
      validateRule: fb.control([], []),
    });
  }

  /**
   * method to call the request load context data
   */
  ngOnInit(): void {
    this.loadContextData();
  }

  /**
   * method for get the policy data in array format
   */
  get complementaryDataControls(): FormArray {
    return this.productService.policyData as FormArray;
  }

  /**
   * method that requests and gets the context data and that are filtered by application level 
   */
  loadContextData() {
    let applicationLevel = 'Cobertura';
    this.productService.getApiData(`domainList/DATOS_CONTEXTO`).subscribe({
      next: (res: any) => {
        console.log('rdatos_contexto', res);
        this.contextData = res.body.nmValueList;
        //se filtra los datos de contexto dependiendo del nivel de aplicación
        this.contextData = this.contextData.filter(
          (data: any) =>
            data.applctnLvl.includes(applicationLevel) ||
            data.applctnLvl.includes('*')
        );
      },
      error: (error) => {
        this.flagError = true;
        console.error('Ha ocurrido un error al obtener los datos necesarios');
      },
    });
  }

  /**
   * according to the rule code, a list of values is established to open the modal
   * @param code 
   */
  openDialogCoverageRules(code: string) {
    let sendData: ElementTableSearch[] = [];
    switch (code) {
      case 'ruleSelectionControls':
        sendData = this.coverageRules.get('selectionRule')!.value;
        break;

      case 'ruleInitializeControls':
        sendData = this.coverageRules.get('initializeRule')!.value;
        break;

      case 'ruleValidationControls':
        sendData = this.coverageRules.get('validateRule')!.value;
        break;

      default:
        break;
    }

    this.openDialog(code, sendData);
  }

  /**
   * method that opens the rules modal
   */
  openDialog(code: string, list: ElementTableSearch[]) {
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

    const dialogRef = this.dialogService.open(RulesWizardComponent, {
      data: {
        code: code,
        list: list,
        columns: columns,
        paramValues: this.getParamValuesList(),
      },
      showHeader: false,
      width: '600px',
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.addChip(code, res);
      }
    });
  }

  /**
   * method that according to the response of the modal adds chips to element and to product structure
   * @param code rule code
   * @param objRule rule structure
   */
  addChip(code: string, objRule: any) {
  
    let arr: any[] = [];
    let element: any = {
      id: objRule.rule.id,
      name: objRule.rule.name,
      cdBusinessCode: objRule.rule.cdBusinessCode,
      description: objRule.rule.description,
      cdRuleType: objRule.rule.cdRuleType,
      endPoint: objRule.rule.endPoint,
      rlEngnCd: objRule.rule.rlEngnCd || null,
      argmntLst: objRule.parameters,
    };

    arr.push(element);

    switch (code) {
      case 'ruleSelectionControls':
        this.selectedSelection = objRule;
        this.coverageRules.controls['selectionRule']?.setValue(arr);

        break;

      case 'ruleInitializeControls':
        this.selectedInitialize = objRule;
        this.coverageRules.controls['initializeRule']?.setValue(arr);
        
        break;

      case 'ruleValidationControls':
        this.selectedValidate = objRule;
        this.coverageRules.controls['validateRule']?.setValue(arr);
        
        break;

      default:
        break;
    }
  }

  /**
   * method that gets param list
   * @returns 
   */
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
    console.log('valores: ', list);

    return list;
  }

  /**
   * method that gets all fields
   * @returns 
   */
  getAllFields() {
    let res: any[] = [];
    for (const group of this.complementaryDataControls.getRawValue()) {
      res = res.concat(group.fields);
    }
    return res;
  }
}
