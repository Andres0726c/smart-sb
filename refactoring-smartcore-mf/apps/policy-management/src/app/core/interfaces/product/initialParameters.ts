import { Generict, GenerictId } from '../generic';

export interface InitialParameters {
  productName: string;
  commercialName: string;
  businessCode: string;
  company: Company;
  insuranceLine: GenerictId<BusinessCode>;
  policyType: GenerictId<BusinessCode>;
  periodValidity: GenerictId<BusinessCode>;
  dayRetroactivity: number;
  dayMaxAdvance: number;
  dayLack: number;
  policyValidityPeriod: number;
  policyValidityPeriodModify: boolean;
  policyValidityTimeModify: boolean;
  typeCurrency: Generict<IsoCode>;
  objectiveGroup: Generict<BusinessCode>;
  salesChannel: Generict<BusinessCode>;
  billingPeriod: BillingPeriod;
  estateProduct: string;
  coinsurance: boolean;
  idProduct: number;
}

export interface Company {
  id: number;
  code: undefined;
  name: string;
}

export interface BusinessCode {
  businessCode: string | number;
}

export interface IsoCode {
  isoCode: string;
}

export interface BillingPeriod extends Generict<BusinessCode> {
  percentage: number;
}
