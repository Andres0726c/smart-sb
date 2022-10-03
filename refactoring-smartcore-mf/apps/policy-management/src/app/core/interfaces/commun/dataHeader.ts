export interface DataHeader {
  code: number;
  status: string;
  errorList: [] | Error[];
  hasErrors: boolean;
}

export interface DataHeaderError extends DataHeader {}

export interface DataHeaderOK extends DataHeader {
  currentPage: number;
  totalPage: number;
  totalRecords: number;
}
