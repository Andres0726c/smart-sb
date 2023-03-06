import { ElementTableSearch } from "./ElementTableSearch.model";

export interface tableColumns {
  name: string,
  header?: string,
  displayValue: string[],
  dbColumnName?:string[];
}

export interface FieldArray {
  id: number,
  name: string,
  label: string
  element: {
    id: number,
    businessCode: string
    nmLabel: string,
    dsDescription: string,
    dataType: DataType,
    flIsMandatory: string
  },
  dataType: DataType,
  initializeRule: ElementTableSearch[],
  validateRule: ElementTableSearch[],
  dependency: number,
  required: boolean,
  editable: boolean,
  visible: boolean
}

export interface ElementReturn {
  id: number,
  name: string,
  description: string,
  details?: string,
  shouldDelete?: boolean,
  cdRuleType?:string,
  element: {
    id: number,
    businessCode: string
    nmLabel?: string,
    label?: string,
    dsDescription: string,
    dataType: DataType,
    flIsMandatory: string,
    domainList:DomainList
  }
}

export interface DataType {
  code: string;
  name: string;
  description: string;
  bdFieldType: string;
  guiComponent: string;
  lenght?: number;
  precision?: number;
  scale?: number;
}

export interface DomainList {
  code: string;
  name: string;
  description: string;
  valueList:String;
}
export interface SearchModal {
  code: string;
  title: string;
  subtitle: string;
  columns?: tableColumns[];
  data?: ElementTableSearch[];
  service: string;
  multiSelect?: boolean;
  remotePaginator: boolean;
  search?: boolean;
  sortField?:string;
  sortDirectionField?:string;
}

export const search: SearchModal[] = [
  {
    code: 'billingPeriodControls',
    title: 'Periodos de facturación',
    subtitle: 'Seleccione los periodos de facturación que desea asociar',
    service: 'turnoverPeriod',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: false
  },
  {
    code: 'typeCurrencyControls',
    title: 'Tipos de moneda',
    subtitle: 'Seleccione los tipos de moneda que desea asociar',
    service: 'currency',
    remotePaginator: false
  },
  {
    code: 'objectiveGroupControls',
    title: 'Grupos objetivos',
    subtitle: 'Seleccione los grupos objetivos que desea asociar',
    service: 'clientSegment',
    remotePaginator: false
  },
  {
    code: 'salesChannelControls',
    title: 'Canales de venta',
    subtitle: 'Seleccione los canales de venta que desea asociar',
    service: 'distributionChannel',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: false
  },
  {
    code: 'complementaryDataControls',
    title: 'Seleccionar nuevos datos complementarios',
    subtitle: 'Seleccione los datos complementarios que desea asociar',
    service: 'complementaryData/findByInsuranceLine',
    sortField:'nmLabel',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'ruleValidationControls',
    title: 'Reglas de validación',
    subtitle: 'Seleccione la regla de validación que desea asociar',
    service: 'rule/findAllByCdRuleType/Validación',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'ruleCalculationControls',
    title: 'Reglas de Cálculo',
    subtitle: 'Seleccione la regla de cálculo que desea asociar',
    service: 'rule/findAllByCdRuleType/Cálculo',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'clausesControls',
    title: 'Cláusulas',
    subtitle: 'Seleccione las cláusulas que desea asociar',
    service: 'clause/findByInsuranceLine',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'coverageRatesControls',
    title: 'Tarifas',
    subtitle: 'Seleccione la tarifa que desea asociar a la cobertura',
    service: 'premiumRate',
    remotePaginator: false
  },
  {
    code: 'coverageDataControls',
    title: 'Coberturas',
    subtitle: 'Seleccione las coberturas que desea asociar',
    service: 'coverage/findByInsuranceLine',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'deductibleDataControls',
    title: 'Deducibles',
    subtitle: 'Seleccione los deducibles que desea asociar',
    service: 'deductible',
    remotePaginator: true
  },
  {
    code: 'ruleInitializeControls',
    title: 'Reglas de inicialización',
    subtitle: 'Seleccione la regla de inicialización que desea asociar',
    service: 'rule/findAllByCdRuleType/Inicialización',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'ruleSelectionControls',
    title: 'Reglas de selección',
    subtitle: 'Seleccione la regla de selección que desea asociar',
    service: 'rule/findAllByCdRuleType/Selección',
    remotePaginator: true
  },
  {
    code: 'ruleCalculationControls',
    title: 'Reglas de cálculo',
    subtitle: 'Seleccione la regla de cálculo que desea asociar',
    service: 'rule/findAllByCdRuleType/Cálculo',
    remotePaginator: true
  },
  {
    code: 'commertialPlanCoverages',
    title: 'Coberturas',
    subtitle: 'Seleccione las coberturas que desea asociar',
    service: 'n/a',
    remotePaginator: false,
  },
  {
    code: 'emissionData',
    title: 'Seleccione datos a previsualizar',
    subtitle: 'Seleccione los datos de Emisión que desea previsualizar',
    service: 'n/a',
    remotePaginator: false,
  },
  {
    code: 'riskTypeDataControls',
    title: 'Tipos de riesgo',
    subtitle: 'Seleccione el tipo de riesgo que desea añadir',
    service: 'risktype/findByInsuranceLine',
    remotePaginator: true,
  },
  {
    code: 'servicePlansControls',
    title: 'Planes de servicio',
    subtitle: 'Seleccione los planes de servicio que desea asociar',
    service: 'servicePlan/0/0',
    remotePaginator: false,
  },
  {
    code: 'servicePlansDataControls',
    title: 'Planes de servicio',
    subtitle: 'Seleccione el plan de servicio que desea asociar',
    service: 'servicePlan/findByInsuranceLine',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true,
  },
  {
    code: 'controlTechnicalControls',
    title: 'Controles técnicos',
    subtitle: 'Seleccione los controles técnicos que desea asociar',
    service: 'technicalcontrol/findByApplicationLevel',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true,
  },
  {
    code: 'taxesCategories',
    title: 'Categoría de impuesto',
    subtitle: 'Seleccione las categorías de impuesto que desea asociar',
    service: 'taxCategory',
    remotePaginator: true,
  },
  {
    code: 'liquidationConcept',
    title: 'Conceptos de liquidación',
    subtitle: 'Seleccione los conceptos de liquidación que desea asociar',
    service: 'liquidationconcept/findByInsuranceLine',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true,
  },
  {
    code: 'reserveConcept',
    title: 'Concepto de reserva',
    subtitle: 'Seleccione el concepto de reclamación',
    service: 'reserveConcept/findByCompanyAndInsuranceLine',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true
  },
  {
    code: 'modificationTypeDataControls',
    title: 'Tipos de modificación',
    subtitle: 'Seleccione el tipo de modificación que desea añadir',
    service: 'activityType/findActiveActivityTypes',
    sortField:'nmname',
    sortDirectionField:'asc',
    remotePaginator: true,
  },
];
