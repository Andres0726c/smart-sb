export interface FilterPolicy {
  idCompany: number;
  pageNumber: number;
  pageSize: number;
  notElements: string;
  sortColumn: string;
  sortDirection: string;
  holderdocumentType?: string;
  holderdocumentNumber?: string;
  holderName?: string;
  insuredDocumentType?: string;
  insuredDocumentNumber?: string;
  insuredName?: string;
  policyNumber?: string;
  idProduct?: string;
  startDate?: string;
}
