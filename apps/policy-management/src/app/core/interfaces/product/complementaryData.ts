export interface ComplementaryData {
  id: number;
  name: string;
  code: string;
  fields: Field[];
}

interface Field {
  id: number;
  code: string;
  name: string;
  label: string;
  dataTypeGui: string;
  dataTypeName: string;
  initializeRule: [];
  validateRule: [];
  dependency: number;
  required: boolean;
  visible: boolean;
}
