import { ComplementaryData } from "./complementaryData";

export interface RiskType{
  id: number,
  code: {businessCode: string},
  name: string,
  description: string,
  complementaryData: ComplementaryData,
  businessPlans: any[]
}