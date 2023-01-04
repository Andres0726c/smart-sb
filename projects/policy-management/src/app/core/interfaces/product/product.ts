import { ComplementaryData } from './complementaryData';
import { InitialParameters } from './initialParameters';
import { RiskType } from './riskType';

export interface Product{
    id: number,
    nmName: string,
    dsDescription: string,
    nmHashCode: number,
    nmContent?: ContentProduct
}

export interface ContentProduct{
    initialParameters: InitialParameters,
    policyData: ComplementaryData[],
    riskTypes: RiskType[],
    mdfctnPrcss:any
}

