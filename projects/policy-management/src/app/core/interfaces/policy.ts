export interface PolicyBrief {
  idProduct: number;
  productName: string;
  company: string;
  idPolicy: number;
  policyNumber: string;
  requestNumber: string;
  insuranceLine: string;
  inceptionDate: string;
  expirationDate: string;
  policyStatus: string;
  holderDocument: string;
  holderTypeDocument: string;
  holderName: string;
  insuredDocument: string;
  insuredTypeDocument: string;
  insuredName: string;
}

export interface Policy {
  productName: string;
  idPolicy: number;
  policyNumber: string;
  externalPolicyNumber: string;
  inceptionDate: string;
  effectiveStartDatePolicy: string;
  expirationDate: string;
  premiumValue: number;
  agent: string;
  policyEmail: string;
  complementaryData: ComplementaryDataPet;
  payment: Payment;
  servicePlan: ServicePlan;
  productFactory?: any;
  propertiesPolicyData?: any
}

export interface ComplementaryDataPet {
  petType: string,
  petName: string,
  petAge: string,
  petBrand: string
}

export interface Payment {
  method: string,
  type: string,
  account: string,
}

export interface ServicePlan {
  name: string;
  description: string;
  value: number
}

