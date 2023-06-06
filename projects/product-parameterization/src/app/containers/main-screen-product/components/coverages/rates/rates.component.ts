import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'projects/product-parameterization/src/app/services/product.service';
import { RulesWizardComponent } from 'projects/product-parameterization/src/app/shared/rules-wizard/rules-wizard.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'refactoring-smartcore-mf-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
})
/**
 * Component to handle coverages rates
 */
export class RatesComponent implements OnInit, OnChanges {
  @Input() coverageRates: any = new FormArray([]);
  selectedField: any = new FormGroup({
    calculationRule: new FormControl([]),
  });
  applicationLevel: string = 'Cobertura';
  contextData: any = [];
  flagServiceError = false;

  /**
   * constructor to initialize coverage rates array 
   * @param productService 
   * @param dialogService 
   * @param fb 
   */
  constructor(
    public productService: ProductService,
    public dialogService: DialogService,
    public fb: FormBuilder
  ) {
    this.coverageRates = fb.array([]);
  }

  /**
   * method to give a structure to the array if change are detected
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    
    if(changes) {
      if (this.coverageRates.controls.length === 0) {
        this.coverageRates.push(this.fb.group({calculationRule: this.fb.array([])}));
      }
    }
    this.selectedField = new FormGroup({
      calculationRule: new FormControl(
        this.coverageRates.controls[0]?.get('calculationRule')!.value
      ),
    });
  }

  /**
   * method to give a structure to the "selectedField" array that is used for the view in html
   */
  async ngOnInit() {
    
    await this.loadContextData().then();
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
      this.flagServiceError = true;
    }
  }

  /**
   * method that opens the rules modal
   */
  openModalCalculationRule() {
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
        code: 'ruleCalculationControls',
        list: this.selectedField.get('calculationRule')?.value,
        columns: columns,
        paramValues: this.getParamValuesList(),
      },
      showHeader: false,
      width: '600px',
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.addChip('ruleCalculationControls', res);
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
    this.selectedField.get('calculationRule')?.setValue(arr);
    (<FormArray>(
      this.coverageRates.controls[0]?.get('calculationRule')
    ))?.removeAt(0);
    (<FormArray>this.coverageRates.controls[0]?.get('calculationRule'))?.push(
      this.fb.control(element)
    );
    console.log('coberturas', this.productService);
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

  /**
   * method that removes rule of the product structure
   */
  removeRule() {
    (<FormArray>this.coverageRates.controls[0]?.get('calculationRule'))?.removeAt(0);
  }
}
