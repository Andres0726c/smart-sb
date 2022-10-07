import { DataHeaderOK, DataHeaderError } from './dataHeader';

export interface ResponseDTO<T> {
  body: T;
  dataHeader: DataHeaderOK;
}

export interface ResponseErrorDTO {
  dataHeader: DataHeaderError;
}
