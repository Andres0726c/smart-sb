export interface ComplementaryData {
  id: number;
  name: string;
  code: string;
  fields: Field[];
}

export interface Field {
  id: number;
  code: string;
  businessCode: string;
  name: string;
  label: string;
  dataTypeGui: string;
  dataType: string;
  dataTypeName: string;
  initializeRule: [];
  validateRule: [];
  dependency: number;
  required: boolean;
  visible: boolean;
  domainList: string;
  editable: boolean;
}
